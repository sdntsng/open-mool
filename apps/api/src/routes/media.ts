import { Context } from 'hono'

interface Env {
    DB: D1Database
}

export const getMyUploads = async (c: Context<{ Bindings: Env }>) => {
    try {
        // Extract user ID from custom header
        const userId = c.req.header('x-user-id')

        if (!userId) {
            return c.json({ error: 'Unauthorized' }, 401)
        }

        const { results } = await c.env.DB.prepare(
            `SELECT * FROM media WHERE user_id = ? ORDER BY created_at DESC LIMIT 50`
        ).bind(userId).all()

        return c.json({
            uploads: results,
            count: results.length,
        })
    } catch (error) {
        console.error('Failed to fetch uploads:', error)
        return c.json({ error: 'Internal Server Error' }, 500)
    }
}
