import {
  Controller,
  Get,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';

@Controller('admin')
@UseGuards(JwtAuthGuard, new RolesGuard('ADMIN'))
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('vendors/pending')
  getPendingVendors() {
    return this.adminService.getPendingVendors();
  }

  @Patch('vendors/:userId/approve')
  approveVendor(@Param('userId') userId: string) {
    return this.adminService.approveVendor(userId);
  }

  @Patch('vendors/:userId/reject')
  rejectVendor(@Param('userId') userId: string) {
    return this.adminService.rejectVendor(userId);
  }
}
