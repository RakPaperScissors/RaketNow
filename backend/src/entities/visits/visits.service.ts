import { Injectable } from '@nestjs/common';
import { CreateVisitDto } from './dto/create-visit.dto';
import { UpdateVisitDto } from './dto/update-visit.dto';
import { Visit } from './entities/visit.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, MoreThan, Repository } from 'typeorm';

@Injectable()
export class VisitsService {
  constructor(
    @InjectRepository(Visit)
    private readonly visitsRepo: Repository<Visit>
  ) {}

  async create(createVisitDto: CreateVisitDto) {
    const visit = this.visitsRepo.create(createVisitDto);
    return await this.visitsRepo.save(visit);
  }

  async findAll() {
    return await this.visitsRepo.find();
  }

  async findOne(id: number): Promise<Visit> {
    const visit = await this.visitsRepo.findOne({ where: { id } });
    if (!visit) {
      throw new Error (`Visit with ID ${id} not found.`);
    }
    return visit;
  }

  async update(id: number, updateVisitDto: UpdateVisitDto) {
    await this.visitsRepo.update(id, updateVisitDto);
    return await this.visitsRepo.findOne({ where: { id } });
  }

  async remove(id: number) {
    const result = await this.visitsRepo.delete(id);
    return result;
  }


  // Track visits of website
  async trackVisit(sessionId: string, userId?: number) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existing = await this.visitsRepo.findOne({
      where: [
        { sessionId, visitedAt: MoreThan(today) },
        ...(userId ? [{ userId, visitedAt: MoreThan(today) }] : []),
      ],
    });

    if (!existing) {
      const visit = this.visitsRepo.create({ sessionId, userId });
      await this.visitsRepo.save(visit);
    }
  }

  async getStats() {
    const total = await this.visitsRepo.count();
    const thisMonth = await this.visitsRepo.count({
      where: {
        visitedAt: Between(
          new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          new Date()
        ),
      },
    });
    return { total, thisMonth };
  }
}
