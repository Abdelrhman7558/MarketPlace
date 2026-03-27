import { Module, Global } from '@nestjs/common';
import { SecurityService } from './security.service';
import { SecurityController } from './security.controller';
import { ThreatDetectionService } from './threat-detection.service';
import { ReactionService } from './reaction.service';
import { VulnerabilityScannerService } from './vulnerability-scanner.service';
import { AutoHealerService } from './auto-healer.service';
import { CryptoService } from './crypto.service';
import { EncryptionService } from './encryption.service';

@Global()
@Module({
    providers: [
        SecurityService,
        ThreatDetectionService,
        ReactionService,
        VulnerabilityScannerService,
        AutoHealerService,
        CryptoService,
        EncryptionService,
    ],
    controllers: [SecurityController],
    exports: [SecurityService, ThreatDetectionService, ReactionService, AutoHealerService, CryptoService, EncryptionService],
})
export class SecurityModule { }
