import { hash } from '@node-rs/argon2';
import { encodeBase32LowerCase } from '@oslojs/encoding';
import { fail } from '@sveltejs/kit';
// import * as auth from '$lib/server/auth';
// import { eq } from 'drizzle-orm';

import { db } from '$lib/server/db';
import { user} from '$lib/server/db/schema';
import type { Actions} from './$types';






export const actions: Actions = {
	register: async (event) => {
		const formData = await event.request.formData();

	const name = formData.get('name') as string;
	const email = formData.get('email') as string;
    const username = extractUsername(email);

		const password = generatePassword();

		if(!isValidEmail(email)){
			return fail(400, {success: false, message: 'Invalid email'})
		}

		const userId = generateUserId();
		const passwordHash = await hash(password, {
			// recommended minimum parameters
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});

		try {
			await db.insert(user).values({ id: userId, email, name,  username, passwordHash });



			// const sessionToken = auth.generateSessionToken();
			// const session = await auth.createSession(sessionToken, userId);
			// auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
   



		} catch(err) {
			console.error('Action failed:', err);

			return fail(500, { success: false, message: 'An error has occurred' });
		}

    sendWelcomeEmail({ email, username, name, password })
            .catch((err) => console.error('Background mail send failed:', err));
		return {
       success: true,
       message: "Successfully Added User, An Email with login details has been sent to the user."
    };
	}
}; 


function generateUserId() {
	// ID with 120 bits of entropy, or about the same as UUID v4.
	const bytes = crypto.getRandomValues(new Uint8Array(15));
	const id = encodeBase32LowerCase(bytes);
	return id;
}

// function validateUsername(username: unknown): username is string {
// 	return (
// 		typeof username === 'string' &&
// 		username.length >= 3 &&
// 		username.length <= 31 &&
// 		/^[a-z0-9_-]+$/.test(username)
// 	);
// }

// function validatePassword(password: unknown): password is string {
// 	return typeof password === 'string' && password.length >= 6 && password.length <= 255;
// }
function isValidEmail(email: string): boolean {
  // Basic email regex pattern
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
function extractUsername(email: string) {
  if (typeof email !== "string") {
    fail(400, "Input must be a string");
  }

  // Find the part before the '@'
  const atIndex = email.indexOf("@");
  
  if (atIndex === -1) {
     fail(404, "Invalid email address: missing '@'");
  }

  return email.substring(0, atIndex);
}

function generatePassword() {
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";
  
  const allChars = upper + lower + numbers + symbols;
  const length = 16; // fixed length

  let password = "";
  
  // Ensure at least one of each type
  password += upper[Math.floor(Math.random() * upper.length)];
  password += lower[Math.floor(Math.random() * lower.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += symbols[Math.floor(Math.random() * symbols.length)];

  // Fill the rest up to fixed length
  for (let i = password.length; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }

  // Shuffle characters so the first four aren’t predictable
  password = password.split("").sort(() => Math.random() - 0.5).join("");

  return password;
}

// Example usage
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
    username,
    name,
    password
}: {
    email: string;
    username: string;
    name: string;
    password: string;
}) {
    const htmlContent = 
    `
    <div style="font-family: Arial, sans-serif; line-height:1.6; color:#333; max-width:600px; margin:0 auto; padding:20px; border:1px solid #e6e6e6; border-radius:10px; background-color:#ffffff;">
    <div style="text-align:center; margin-bottom:20px;">
        <img src="https://bymeklit.shop/wp-content/uploads/2025/09/cropped-Fixed-White-Pink-ByMeklit-2025-Logo-Update-1.png" alt="ByMeklit Logo" style="max-width:200px; height:auto;" />
    </div>
    <h2 style="color:#262626; text-align:center; margin-bottom:30px;">Welcome to Your ByMeklit Shop Help Account</h2>
    <p style="font-size:16px;">Dear <strong>${name}</strong>,</p>
    <p style="font-size:16px;">Your account has been successfully created. Below are your login details:</p>
    <ul style="font-size:16px; list-style:none; padding:0; margin:20px 0;">
        <li style="margin-bottom:10px;"><strong>Username:</strong> <span style="color:#FF6600;">${username}</span></li>
        <li style="margin-bottom:10px;"><strong>Password:</strong> <span style="color:#FF6600;">${password}</span></li>
    </ul>
    <p style="font-size:16px;">You can now log in and start using the system.</p>
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