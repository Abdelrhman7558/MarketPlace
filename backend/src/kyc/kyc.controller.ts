import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFiles,
  BadRequestException,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role, KYCStatus } from '@prisma/client';
import { KycService } from './kyc.service';

const uploadDir = join(process.cwd(), 'uploads', 'kyc');

// Ensure upload directory exists
if (!existsSync(uploadDir)) {
  mkdirSync(uploadDir, { recursive: true });
}

const multerStorage = diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `kyc-${uniqueSuffix}${extname(file.originalname)}`);
  },
});

const imageFilter = (req: any, file: Express.Multer.File, cb: any) => {
  if (!file.mimetype.match(/^image\/(jpeg|jpg|png|webp)$/)) {
    cb(new BadRequestException('Only JPEG, PNG, and WebP images are allowed'), false);
    return;
  }
  cb(null, true);
};

@Controller('kyc')
@UseGuards(JwtAuthGuard)
export class KycController {
  constructor(private readonly kycService: KycService) {}

  /** Submit KYC with base64 images (JSON body) */
  @Post('submit')
  async submitKyc(
    @Request() req,
    @Body() body: {
      documentType: string;
      frontImageUrl: string;
      backImageUrl?: string;
      selfieUrl?: string;
      livenessScore?: number;
    },
  ) {
    return this.kycService.submitKyc(req.user.sub, body);
  }

  /** Submit KYC with file uploads (multipart) */
  @Post('upload')
  @UseInterceptors(FilesInterceptor('files', 3, { storage: multerStorage, fileFilter: imageFilter }))
  async uploadKycFiles(
    @Request() req,
    @UploadedFiles() files: Express.Multer.File[],
    @Body() body: { documentType: string; livenessScore?: string },
  ) {
    if (!files || files.length === 0) {
      throw new BadRequestException('At least one file is required');
    }

    const backendUrl = process.env.BACKEND_URL || 'http://localhost:3001';
    const [frontFile, backFile, selfieFile] = files;

    return this.kycService.submitKyc(req.user.sub, {
      documentType: body.documentType,
      frontImageUrl: frontFile ? `${backendUrl}/uploads/kyc/${frontFile.filename}` : '',
      backImageUrl: backFile ? `${backendUrl}/uploads/kyc/${backFile.filename}` : undefined,
      selfieUrl: selfieFile ? `${backendUrl}/uploads/kyc/${selfieFile.filename}` : undefined,
      livenessScore: body.livenessScore ? parseFloat(body.livenessScore) : undefined,
    });
  }

  /** Get my KYC status */
  @Get('status')
  async getMyStatus(@Request() req) {
    return this.kycService.getMyKycStatus(req.user.sub);
  }

  /** Admin: get all pending submissions */
  @Get('admin/pending')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.MODERATOR)
  async getPending() {
    return this.kycService.getAllPending();
  }

  /** Admin: get all submissions with optional status filter */
  @Get('admin/all')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.MODERATOR)
  async getAll(@Query('status') status?: KYCStatus) {
    return this.kycService.getAll(status);
  }

  /** Admin: get KYC stats */
  @Get('admin/stats')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.MODERATOR)
  async getStats() {
    return this.kycService.getStats();
  }

  /** Admin: get single KYC document */
  @Get('admin/:id')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.MODERATOR)
  async getById(@Param('id') id: string) {
    return this.kycService.getById(id);
  }

  /** Admin: verify (approve) */
  @Patch('admin/:id/verify')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.MODERATOR)
  async verify(@Param('id') id: string, @Body() body: { adminNotes?: string }) {
    return this.kycService.verifyKyc(id, body.adminNotes);
  }

  /** Admin: reject */
  @Patch('admin/:id/reject')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.MODERATOR)
  async reject(@Param('id') id: string, @Body() body: { adminNotes: string }) {
    return this.kycService.rejectKyc(id, body.adminNotes);
  }
}
