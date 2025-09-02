import { db } from '$lib/server/db';
import { help } from '$lib/server/db/schema';

export async function load() {
    try {
        const helps = await db.select().from(help); 
        return {
            helps
        };
    } catch (error) {
        console.error('Error loading helps:', error);
        return {
            helps: []
        };
    }
}
