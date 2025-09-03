

import type { Actions, PageServerLoad } from "./$types";
import { db } from "$lib/server/db";
import { help } from "$lib/server/db/schema";

export const load: PageServerLoad = async () => {
    try {
        const helps = await db.select().from(help);
        return {
            helps
        };
    } catch (error) {
        console.error("Failed to load helps:", error);
        return {
            helps: []
        };
    }
}


export const actions: Actions = {
     
}