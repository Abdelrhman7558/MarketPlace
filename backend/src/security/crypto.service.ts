import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class CryptoService {
    // 32-byte key for AES-256. In production, this should always come from an environment variable.
    // For safety, we have a strong fallback if not provided in .env
    private readonly ALGORITHM = 'aes-256-gcm';
    private readonly key: Buffer;

    constructor() {
        const secret = process.env.ENCRYPTION_KEY || 'marketplace-secure-billing-key-1234567890';
        // Ensure the key is exactly 32 bytes (256 bits)
        this.key = crypto.scryptSync(secret, 'salt', 32);
    }

    encrypt(text: string): string {
        if (!text) return text;

        try {
            // Generate a secure 12-byte initialization vector (IV) for GCM
            const iv = crypto.randomBytes(12);
            const cipher = crypto.createCipheriv(this.ALGORITHM, this.key, iv);

            let encrypted = cipher.update(text, 'utf8', 'hex');
            encrypted += cipher.final('hex');

            const authTag = cipher.getAuthTag().toString('hex');

            // Format: iv:authTag:encryptedData
            return `${iv.toString('hex')}:${authTag}:${encrypted}`;
        } catch (error) {
            console.error('Encryption failed:', error);
            throw new Error('Failed to encrypt sensitive data');
        }
    }

    decrypt(encryptedText: string): string {
        if (!encryptedText) return encryptedText;

        // If the text isn't in our format (from before encryption was added), return it as is
        if (!encryptedText.includes(':')) {
            return encryptedText;
        }

        try {
            const parts = encryptedText.split(':');
            if (parts.length !== 3) return encryptedText;

            const iv = Buffer.from(parts[0], 'hex');
            const authTag = Buffer.from(parts[1], 'hex');
            const encryptedData = parts[2];

            const decipher = crypto.createDecipheriv(this.ALGORITHM, this.key, iv);
            decipher.setAuthTag(authTag);

            let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
            decrypted += decipher.final('utf8');

            return decrypted;
        } catch (error) {
            console.error('Decryption failed, returning null or masked data:', error);
            return '*** DECRYPTION_FAILED ***';
        }
    }
}
