import { Hono } from 'hono'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

type Bindings = {
    DB: D1Database
    STORAGE: R2Bucket
    R2_ACCOUNT_ID: string
    R2_ACCESS_KEY_ID: string
    R2_SECRET_ACCESS_KEY: string
}

const upload = new Hono<{ Bindings: Bindings }>()

// Generate Presigned URL
upload.post('/presigned', async (c) => {
    const { filename, contentType } = await c.req.json()

    if (!filename || !contentType) {
        return c.json({ error: 'Missing filename or contentType' }, 400)
    }

    const accountId = c.env.R2_ACCOUNT_ID
    const accessKeyId = c.env.R2_ACCESS_KEY_ID
    const secretAccessKey = c.env.R2_SECRET_ACCESS_KEY

    if (!accountId || !accessKeyId || !secretAccessKey) {
        return c.json({ error: 'R2 credentials not configured' }, 500)
    }

    const S3 = new S3Client({
        region: 'auto',
        endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
        credentials: {
            accessKeyId,
            secretAccessKey,
        },
    })

    // Use a unique key to prevent collisions
    const key = `${crypto.randomUUID()}-${filename}`

    const command = new PutObjectCommand({
        Bucket: 'open-mool-storage',
        Key: key,
        ContentType: contentType,
    })

    // Expires in 1 hour
    const url = await getSignedUrl(S3, command, { expiresIn: 3600 })

    return c.json({ url, key })
})

// Complete Upload (Save Metadata)
upload.post('/complete', async (c) => {
    const { key, title, description, language, location } = await c.req.json()

    if (!key || !title) {
        return c.json({ error: 'Missing required fields' }, 400)
    }

    try {
        const { success } = await c.env.DB.prepare(
            `INSERT INTO media (key, title, description, language, location_lat, location_lng, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)`
        ).bind(
            key,
            title,
            description,
            language,
            location?.lat || null,
            location?.lng || null,
            new Date().toISOString()
        ).run()

        if (!success) {
            return c.json({ error: 'Failed to save metadata' }, 500)
        }

        return c.json({ success: true })
    } catch (e) {
        console.error(e)
        return c.json({ error: 'Database error' }, 500)
    }
})

export default upload
