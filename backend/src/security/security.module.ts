import { Module, Global } from '@nestjs/common';
import { SecurityService } from './security.service';
import { SecurityController } from './security.controller';
import { ThreatDetectionService } from './threat-detection.service';
import { ReactionService } from './reaction.service';
import { VulnerabilityScannerService } from './vulnerability-scanner.service';
import { AutoHealerService } from './auto-healer.service';

@Global()
@Module({
    providers: [
        SecurityService,
        ThreatDetectionService,
        ReactionService,
        VulnerabilityScannerService,
        AutoHealerService,
    ],
    controllers: [SecurityController],
    exports: [SecurityService, ThreatDetectionService, ReactionService, AutoHealerService],
})
export class SecurityModule { }
