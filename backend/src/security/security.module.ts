import { Module, Global } from '@nestjs/common';
import { SecurityService } from './security.service';
import { SecurityController } from './security.controller';
import { ThreatDetectionService } from './threat-detection.service';
import { ReactionService } from './reaction.service';
import { VulnerabilityScannerService } from './vulnerability-scanner.service';

@Global()
@Module({
    providers: [
        SecurityService,
        ThreatDetectionService,
        ReactionService,
        VulnerabilityScannerService,
    ],
    controllers: [SecurityController],
    exports: [SecurityService, ThreatDetectionService, ReactionService],
})
export class SecurityModule { }
