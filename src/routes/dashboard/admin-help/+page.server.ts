import { db } from '$lib/server/db';
import {  adminHelp } from '$lib/server/db/schema';

export async function load() {
    try {
        const helps = await db.select().from(adminHelp); 
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
