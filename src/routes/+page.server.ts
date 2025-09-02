import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';


export const load: PageServerLoad = async ({ locals }) => {
    if (locals.user) {
         redirect(303, '/dashboard');
    }
    else {
        redirect(303, '/help');
    }
};