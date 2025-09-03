import { fail, redirect} from '@sveltejs/kit';
import { db } from '$lib/server/db';
import {user} from '$lib/server/db/schema';
import type { Actions } from './$types';
import { eq } from 'drizzle-orm';
import { hash, verify } from '@node-rs/argon2';
import * as auth from '$lib/server/auth';


// Example: Replace with your actual user/password update logic

// async function validateCurrentPassword(userId: string, currentPassword: string) {
//     try {
//         const currentUser = await db.select().from(user).where(eq(user.id, userId));
//         const userData = currentUser.at(0);

//         if (!userData) {
//             console.log('User not found');
//             return false;
//         }

//         // Debug: Check what we're actually getting
//         console.log('User data:', userData);
//         console.log('Password hash type:', typeof userData.passwordHash);
//         console.log('Password hash value:', userData.passwordHash);

//         // Ensure passwordHash exists and is a string
//         if (!userData.passwordHash || typeof userData.passwordHash !== 'string') {
//             console.log('Invalid or missing password hash');
//             return false;
//         }

//         const validPassword = await verify(userData.passwordHash, currentPassword, {
//             memoryCost: 19456,
//             timeCost: 2,
//             outputLen: 32,
//             parallelism: 1
//         });
        
//         return validPassword;
//     } catch (error) {
//         console.error('Error in validateCurrentPassword:', error);
//         return false;
//     }
// }

async function updateUserPassword(userId: string, newPassword: string) {
    const userToUpdate = await db.select().from(user).where(eq(user.id, userId));
    const userData = userToUpdate[0];
    if (!userData) return false;

    const hashedPassword = await hash(newPassword);

    // Update the user's password (hashing/salting should be done here)
    await db.update(user).set({ passwordHash: hashedPassword }).where(eq(user.id, userId));
    return true;
}
async function validateNewPassword(newPassword: string) {
 


    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!passwordRegex.test(newPassword)) {
        return false;
    }
    else {
         return true;
    }
}

export const actions: Actions = {
    changePassword: async (event) => {
        const formData = await event.request.formData();
        const currentPassword = formData.get('currentPassword') as string || '';
        const newPassword = formData.get('newPassword') as string || '';
        const confirmPassword = formData.get('confirmNewPassword') as string || '';
        const userId = event.locals.user?.id || '';

        const currentUser = await db.select().from(user).where(eq(user.id, userId)).limit(1).then(rows => rows[0]);

        // if (!await validateCurrentPassword(userId, currentPassword)) {
        //     return fail(400, { passwordError: 'Current password is incorrect.' });
        // }

          const validPassword = await verify(currentUser.passwordHash, currentPassword, {
            memoryCost: 19456,
            timeCost: 2,
            outputLen: 32,
            parallelism: 1
        });

         if (!validPassword) {
            return fail(400, { passwordError: 'Current password is incorrect.'});
        }

        if (!await validateNewPassword(newPassword)) {
            return fail(400, { weakPasswordError: `New password is too weak. Make sure it meets the requirements.
                <ol> 
                   <li>At least 8 characters long</li>
                   <li>Contains both uppercase and lowercase letters</li>
                   <li>Includes at least one numeric digit</li>
                   <li>Has at least one special character (e.g., !@#$%^&*)</li>
                 </ol> 
                ` });
        }

        // Example: Get userId from session/auth
        // if (!userId) {
        //     throw redirect(303, '/login');
        // }

        if (!currentPassword || !newPassword || !confirmPassword) {
            return fail(400, { formError: 'All fields are required.' });
        }


        if (newPassword !== confirmPassword) {
            return fail(400, { mismatchError: 'Passwords do not match.' });
        }

        // Example: Validate current password (implement your own logic)
        // if (!await validateCurrentPassword(userId, currentPassword)) {
        //   return fail(400, { error: 'Current password is incorrect.' });
        // }
      

        const success = await updateUserPassword(userId, newPassword);
        if (!success) {
            return fail(500, { success:false, message: 'Failed to update password.' });
        } 

        await sendWelcomeEmail({
            email: currentUser.email,
            name: currentUser.name,
        });

        await auth.invalidateSession(event?.locals.session.id);
		auth.deleteSessionTokenCookie(event);

		return redirect(302, '/login');
    }
};

import nodemailer from 'nodemailer';
import { HOST, USER, PASSWORD } from '$env/static/private';

const transporter = nodemailer.createTransport({
    host: HOST,
    port: 587, // change if your SMTP uses a different port
    secure: false, // true if 465
    auth: {
        user: USER,
        pass: PASSWORD
    }
});

async function sendWelcomeEmail({
    email,
    name,
}: {
    email: string;
    name: string;
}) {
    const htmlContent = 
    `
    <div style="font-family: Arial, sans-serif; line-height:1.6; color:#333; max-width:600px; margin:0 auto; padding:20px; border:1px solid #e6e6e6; border-radius:10px; background-color:#ffffff;">
    <div style="text-align:center; margin-bottom:20px;">
        <img src="https://bymeklit.shop/wp-content/uploads/2025/09/cropped-Fixed-White-Pink-ByMeklit-2025-Logo-Update-1.png" alt="ByMeklit Logo" style="max-width:200px; height:auto;" />
    </div>
    <h2 style="color:#262626; text-align:center; margin-bottom:30px;">Your Password Has Been Changed Successfully</h2>
    <p style="font-size:16px;">Dear <strong>${name}</strong>,</p>
    <p style="font-size:16px;">Your password for your ByMeklit Shop Help account has been updated successfully.</p>
    <p style="font-size:16px;">If you did not request this change, please contact support immediately.</p>
    <div style="text-align:center; margin-top:30px;">
        <a href="https://help.bymeklit.shop/login" style="display:inline-block; padding:12px 25px; font-size:16px; color:#ffffff; background-color:#E3378D; border-radius:5px; text-decoration:none;">Login Now</a>
    </div>
    <p style="margin-top:30px; font-size:14px; color:#777;">Best regards,<br><strong>ByMeklit System</strong></p>
</div>
    `;

    try {
        await transporter.sendMail({
            from: `"ByMeklit Shop" <${USER}>`,
            to: email,
            subject: 'Your ByMeklit Shop Account',
            html: htmlContent
        });
        return { success: true };
    } catch (err) {
        console.error('Email sending failed:', err);
        return { success: false, error: 'Failed to send email' };
    }
}