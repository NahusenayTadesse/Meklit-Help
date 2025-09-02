import type { Actions } from './$types';
import nodemailer from 'nodemailer';
import { HOST, PORT, USER, PASSWORD } from '$env/static/private';
import { fail } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { user, proEmails } from '$lib/server/db/schema';
import {eq} from 'drizzle-orm';
// import type { PageServerData } from '../$types';


// export const load: PageServerData = async ({ locals }) => {

//      const userId = locals.user?.id;

//      const userData = await db.select({
//          name: user.name
//      }).from(user).where(eq(user.id, userId)).limit(1);


//     userName = userData[0]?.name || 'User';
//      return {
//      };
// }


export const actions: Actions = {
  default: async ({ request, locals }) => {
      const formData = await request.formData();

      const email = formData.get('email') as string;
      const name = formData.get('name') as string;
      const subject = formData.get('subject') as string;
      const replyMessage = formData.get('message') as string;
      const userId = locals.user?.id;

      const userData = await db.select({
         name: user.name
     }).from(user).where(eq(user.id, userId)).limit(1);


    const userName = userData[0]?.name || 'User';

      // Basic validation
      if ( !subject || !email || !name || !replyMessage) {
        return fail(400, { success: false, message: 'Missing required fields.' });
      }
      const transporter = nodemailer.createTransport({
        host: HOST,
        port: PORT,
        secure: false,
        auth: {
          user: USER,
          pass: PASSWORD
        }
      });

      const currentYear = new Date().getFullYear();


    const htmlContent = `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #E3378D; height: 200px; text-align: center; margin-bottom: 20px; padding-bottom:20px;">
        <img src="https://bymeklit.shop/wp-content/uploads/2025/09/cropped-Fixed-White-Pink-ByMeklit-2025-Logo-Update-1.png" alt="ByMeklit Logo" style="width: 200px; height: 200px;" />
        </div>
        
        <p>Hi ${name},</p>
        
        <div style="background-color: #f4f8fb; padding: 15px; margin: 20px 0;">
        ${replyMessage}
        </div>
        
        <br>
        <p>Best regards,<br><strong style="color: #E3378D;">ByMeklit Team</strong></p>
        <p style="text-align: center;"> &copy; ${currentYear} <a href="https://bymeklit.shop" style="color: #E3378D; text-decoration: none;">
ByMeklit</a> All Rights Reserved </p>
      </div>
    `;

  try {
      await transporter.sendMail({
        from: `"ByMeklit Shop" <${USER}>`,
        to: email,
        subject: subject,
        html: htmlContent,
      });

      await db.insert(proEmails).values({
        email,
        subject,
        sentAt: new Date(),
        content: replyMessage,
        sentBy: userName
      });

      return {
        success: true,
        message: 'Email sent successfully.'
      };

    } catch (error) {
      console.error('Error processing message:', error);

      return fail(400, { success: false, message: 'An unexpected error occurred. Please try again later.' });
    }
  }
};
