import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './report.entity';
import { CreateReportDto } from './dtos/create-report-dto';
import { User } from '../users/user.entity';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private reop: Repository<Report>) {}

  create(reportDto: CreateReportDto, user: User) {
    const report = this.reop.create(reportDto);
    report.user = user;
    return this.reop.save(report);
  }

  async changeApproval(id: number, approved: boolean) {
    const report = await this.reop.findOne({ where: { id } });
    if (!report) {
      throw new NotFoundException('report not found');
    }

    report.approved = approved;
    return this.reop.save(report);
  }
}
