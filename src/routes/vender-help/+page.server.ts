import { db } from '$lib/server/db';
import {  vendorHelp } from '$lib/server/db/schema';

export async function load() {
    try {
        const helps = await db.select().from(vendorHelp); 
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
