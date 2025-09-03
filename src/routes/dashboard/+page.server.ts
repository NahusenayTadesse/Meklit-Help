import * as auth from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import type { PageServerLoad } from './$types';

import {db} from "$lib/server/db";
import { user } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";


export const load: PageServerLoad= async ({ locals }) => {
	const currentUser = await db.select({
		name: user.name
	}).from(user).where(eq(user.id, locals.user.id));
	return { user: currentUser };
};


export const actions: Actions = {
	logout: async (event) => {
		if (!event.locals.session) {
			return fail(401);
		}
		await auth.invalidateSession(event.locals.session.id);
		auth.deleteSessionTokenCookie(event);

		return redirect(302, '/login');
	}
};