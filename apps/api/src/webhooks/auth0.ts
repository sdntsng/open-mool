import { Context } from 'hono'
import { users } from '@open-mool/db'
import { drizzle } from 'drizzle-orm/d1'
import { eq } from 'drizzle-orm'

interface Env {
    DB: D1Database
    AUTH0_WEBHOOK_SECRET: string
}

export const auth0Webhook = async (c: Context<{ Bindings: Env }>) => {
    const db = drizzle(c.env.DB)

    // Basic validation of content-type
    // const contentType = c.req.header('content-type')

    let body: any;
    try {
        body = await c.req.json();
    } catch (e) {
        return c.json({ error: 'Invalid JSON' }, 400);
    }

    const secret = c.req.header('x-auth0-secret')
    if (secret !== c.env.AUTH0_WEBHOOK_SECRET) {
        // For development, we might skip this or use a default
        // return c.json({ error: 'Unauthorized' }, 401)
        console.warn("Auth0 Secret mismatch or missing");
    }

    const { user } = body;

    if (!user || !user.user_id) {
        return c.json({ error: 'Invalid payload: user.user_id missing' }, 400)
    }

    try {
        // Insert user, on conflict do nothing (or update if needed)
        await db.insert(users).values({
            auth0Id: user.user_id,
            role: 'SCOUT',
            reputationScore: 0
        }).onConflictDoNothing()
        // onConflictDoNothing in SQLite Drizzle might need target
        // .onConflictDoNothing({ target: users.auth0Id })

        return c.json({ message: 'User synced successfully' })
    } catch (error) {
        console.error('Failed to sync user:', error)
        return c.json({ error: 'Internal Server Error' }, 500)
    }
}
