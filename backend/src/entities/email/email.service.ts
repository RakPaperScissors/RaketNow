import { Injectable, Logger } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';
import { Users } from 'src/entities/user/entities/user.entity';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private readonly fromEmail: string;

  constructor() {
    const apiKey = String(process.env.SENDGRID_API_KEY);
    this.fromEmail = String(process.env.SENDGRID_FROM_EMAIL);

    sgMail.setApiKey(apiKey);
    this.logger.log('SendGrid Mail service initialized.');
  }

  async sendVerificationEmail(user: Users, code: string): Promise<void> {
    const msg = {
      to: user.email,
      from: this.fromEmail, // Use the class property
      subject: 'Welcome to RaketNow! Please Verify Your Email',
      html: `
        <div style="font-family: Arial, sans-serif; text-align: center; color: #333;">
          <h2>Welcome to RacketNow, ${user.firstName}!</h2>
          <p>Please use the following code to verify your email address:</p>
          <p style="font-size: 24px; font-weight: bold; letter-spacing: 5px;">
            ${code}
          </p>
          <p>This code will expire in 15 minutes.</p>
        </div>
      `,
    };

    try {
      await sgMail.send(msg);
      this.logger.log(`Verification email sent to ${user.email}`);
    } catch (error) {
      this.logger.error(`Failed to send verification email to ${user.email}`, error.stack);
      throw new Error('Could not send verification email.');
    }
  }
}