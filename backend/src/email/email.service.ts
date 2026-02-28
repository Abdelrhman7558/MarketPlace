import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
    private transporter;

    constructor() {
        // In a real app, these should comes from environment variables
        this.transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST || 'smtp.ethereal.email',
            port: parseInt(process.env.EMAIL_PORT || '587'),
            secure: process.env.EMAIL_SECURE === 'true',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
    }

    async sendVerificationEmail(email: string, token: string) {
        const url = `${process.env.FRONTEND_URL}/auth/verify-email?token=${token}`;
        await this.transporter.sendMail({
            from: '"Atlantis Marketplace" <noreply@atlantis.eg>',
            to: email,
            subject: 'Verify your email - Atlantis Marketplace',
            html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #FF7A1A;">Welcome to Atlantis!</h2>
          <p>Please click the button below to verify your email address and activate your account.</p>
          <a href="${url}" style="display: inline-block; padding: 12px 24px; background-color: #FF7A1A; color: white; text-decoration: none; border-radius: 5px; font-weight: bold; margin-top: 10px;">Verify Email</a>
          <p style="margin-top: 20px; font-size: 12px; color: #666;">If the button doesn't work, copy and paste this link into your browser: <br/> ${url}</p>
        </div>
      `,
        });
    }

    async sendPasswordResetEmail(email: string, token: string) {
        const url = `${process.env.FRONTEND_URL}/auth/reset-password?token=${token}`;
        await this.transporter.sendMail({
            from: '"Atlantis Marketplace" <noreply@atlantis.eg>',
            to: email,
            subject: 'Reset your password - Atlantis Marketplace',
            html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #FF7A1A;">Password Reset Request</h2>
          <p>You requested to reset your password. Click the button below to proceed.</p>
          <a href="${url}" style="display: inline-block; padding: 12px 24px; background-color: #FF7A1A; color: white; text-decoration: none; border-radius: 5px; font-weight: bold; margin-top: 10px;">Reset Password</a>
          <p style="margin-top: 20px; font-size: 12px; color: #666;">This link will expire in 1 hour. If you didn't request this, please ignore this email.</p>
        </div>
      `,
        });
    }

    async sendTeamInvitation(email: string, name: string, role: string) {
        const url = `${process.env.FRONTEND_URL}/auth/login`; // Or a specific setup page if needed
        await this.transporter.sendMail({
            from: '"Atlantis Marketplace" <noreply@atlantis.eg>',
            to: email,
            subject: 'You have been invited to the Atlantis Team',
            html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #FF7A1A;">Team Invitation</h2>
          <p>Hello ${name},</p>
          <p>You have been invited to join the Atlantis Marketplace team as a <strong>${role}</strong>.</p>
          <p>Please log in to your account to get started.</p>
          <a href="${url}" style="display: inline-block; padding: 12px 24px; background-color: #FF7A1A; color: white; text-decoration: none; border-radius: 5px; font-weight: bold; margin-top: 10px;">Login Now</a>
        </div>
      `,
        });
    }
}
