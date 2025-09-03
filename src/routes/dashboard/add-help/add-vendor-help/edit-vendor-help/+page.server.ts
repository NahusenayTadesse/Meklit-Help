

import type { Actions, PageServerLoad } from "./$types";
import { db } from "$lib/server/db";
import { vendorHelp } from "$lib/server/db/schema";
import {eq} from "drizzle-orm";

export const load: PageServerLoad = async () => {
    try {
        const helps = await db.select().from(vendorHelp);
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
    edit: async ({ request }) => {
        const formData = await request.formData();
        const idValue = formData.get("id");
        const id = idValue ? Number(idValue) : undefined;
        const title = formData.get("title") as string || '';
        const video = formData.get("video") as string || '';
        const description = formData.get("description") as string || '';

        // Perform your action here, e.g., save to database
        try {
            await db.update(vendorHelp).set({
                title,
                video,
                description
            }).where(eq(vendorHelp.id, id));

            return {
                success: true,
                message: "Help Article updated successfully."
            };
        } catch (error) {
            return {
                success: false,
                error: "Failed to update help Article" + error,
                message: "Failed to update Help Article"
            };
        }
    },
    delete: async ({ request }) => {
        const formData = await request.formData();
        const idValue = formData.get("id");
        const id = idValue ? Number(idValue) : undefined;

        // Perform your action here, e.g., delete from database
        try {
            await db.delete(vendorHelp).where(eq(vendorHelp.id, id));

            return {
                success: true,
                message: "Help Article deleted successfully."
            };
        } catch (error) {
            return {
                success: false,
                error: "Failed to delete help Article" + error,
                message: "Failed to delete Help Article"
            };
        }
    }
}