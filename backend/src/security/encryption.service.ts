import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class EncryptionService {
    private readonly algorithm = 'aes-256-gcm';
    private readonly secretKey: Buffer;

    constructor() {
        const key = process.env.ENCRYPTION_KEY || 'development-secret-key-32bytes+!!';
        // Ensure key is exactly 32 bytes for aes-256-gcm
        this.secretKey = Buffer.from(crypto.createHash('sha256').update(String(key)).digest('base64').substring(0, 32));
    }

    encrypt(text: string): string {
        if (!text) return text;
        try {
            const iv = crypto.randomBytes(16);
            const cipher = crypto.createCipheriv(this.algorithm, this.secretKey, iv);
            let encrypted = cipher.update(text, 'utf8', 'hex');
            encrypted += cipher.final('hex');
            const authTag = cipher.getAuthTag().toString('hex');
            return `${iv.toString('hex')}:${authTag}:${encrypted}`;
        } catch (e) {
            console.error('Encryption failing', e);
            return text;
        }
    }

    decrypt(hash: string): string {
        if (!hash || typeof hash !== 'string') return hash;
        try {
            const parts = hash.split(':');
            if (parts.length !== 3) return hash; // Not encrypted or malformed
            const iv = Buffer.from(parts[0], 'hex');
            const authTag = Buffer.from(parts[1], 'hex');
            const encryptedText = parts[2];
            
            const decipher = crypto.createDecipheriv(this.algorithm, this.secretKey, iv);
            decipher.setAuthTag(authTag);
            let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
            decrypted += decipher.final('utf8');
            return decrypted;
        } catch (e) {
            // Console error omitted to prevent leaking secrets in logs over time, just fallback
            return hash; 
        }
    }
}
