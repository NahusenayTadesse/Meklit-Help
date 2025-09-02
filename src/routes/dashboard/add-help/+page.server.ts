import type { Actions } from "./$types";
import { db } from "$lib/server/db";
import { help } from "$lib/server/db/schema";






export const actions: Actions = {

    default: async ({ request }) => {
        const formData = await request.formData();
        const title = formData.get("title");
        const video = formData.get("video");
        const description = formData.get("description");

        // Perform your action here, e.g., save to database
        try{
        await db.insert(help).values({
            title,
            video,
            description
        });

        return {
            success: true,
            message: "Help Article added successfully"
        };
    } catch (error) {
        return {
            success: false,
            error: "Failed to add help Article" + error,
            message: "Failed to add Help Article"
        };
    }
    }
}