import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobHistory } from './entities/job-history.entity';
import { Raket } from '../rakets/entities/raket.entity';
import { CreateJobHistoryDto } from './dto/create-job-history.dto';
import { UpdateJobHistoryDto } from './dto/update-job-history.dto';

@Injectable()
export class JobHistoryService {
  constructor(
    @InjectRepository(JobHistory)
    private jobHistoryRepo: Repository<JobHistory>,

    @InjectRepository(Raket)
    private raketRepo: Repository<Raket>,
  ) {}

  async create(dto: CreateJobHistoryDto) {
    if (dto.historyType === 'Raket') {
      if (!dto.raketId) {
        throw new BadRequestException('raketId is required for Raket job history');
      }

      const raket = await this.raketRepo.findOne({ where: { raketId: dto.raketId } });
      if (!raket || raket.status !== 'completed') {
        throw new BadRequestException('Raket not found or not completed');
      }

      const history = this.jobHistoryRepo.create({
        title: raket.title,
        description: raket.description,
        historyType: 'Raket',
        raket: raket,
      });

      return this.jobHistoryRepo.save(history);
    }

    // Manual Work Experience entry
    const manualHistory = this.jobHistoryRepo.create({
      title: dto.title,
      description: dto.description,
      historyType: 'Work_Experience',
    });

    return this.jobHistoryRepo.save(manualHistory);
  }

  findAll() {
    return this.jobHistoryRepo.find();
  }

  async findOne(jobId: number) {
    const history = await this.jobHistoryRepo.findOne({ where: { jobId } });
    if (!history) {
      throw new NotFoundException(`Job history #${jobId} not found`);
    }
    return history;
  }

  async update(id: number, dto: UpdateJobHistoryDto) {
    const history = await this.findOne(id);
    Object.assign(history, dto);
    return this.jobHistoryRepo.save(history);
  }

  async updateField(id: number, field: string, value: any) {
    const allowedFields = ['title', 'description'];
    if (!allowedFields.includes(field)) {
      throw new BadRequestException(`Field '${field}' is not allowed to be updated`);
    }

    const history = await this.findOne(id);

    if (field === 'title') {
      if (!value || value.trim() === '') {
        throw new BadRequestException('Title is required and cannot be empty');
      }
      history.title = value;
    }

    if (field === 'description') {
      history.description = value?.trim() === '' ? 'No description' : value;
    }

    return this.jobHistoryRepo.save(history);
  }

  async remove(id: number) {
    const history = await this.findOne(id);
    return this.jobHistoryRepo.remove(history);
  }
}
