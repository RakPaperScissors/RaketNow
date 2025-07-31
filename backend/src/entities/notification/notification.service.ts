import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Injectable()
export class NotificationService {
    constructor(
      @InjectRepository(Notification)
      private readonly notificationRepository: Repository<Notification>,
    ) {}

    async create(createNotificationDto: CreateNotificationDto) {
      const notification = this.notificationRepository.create(createNotificationDto);
      return this.notificationRepository.save(notification);
    }

    async findAll(userId?: number) {
      if (userId) {
        return this.notificationRepository.find({
          where: { user: { uid: userId } },
          order: { createdAt: 'DESC' },
        });
      }
      return this.notificationRepository.find({ order: { createdAt: 'DESC' } });
    }

    async findOne(id: number) {
      return this.notificationRepository.findOne({ where: { id } });
    }

    async markAsRead(id: number, userId: number) {
      const notif = await this.notificationRepository.findOne({ where: { id, user: { uid: userId } } });
      if (!notif) throw new NotFoundException('Notification not found');
      notif.isRead = true;
      return this.notificationRepository.save(notif);
    }

    async update(id: number, updateNotificationDto: UpdateNotificationDto) {
      await this.notificationRepository.update(id, updateNotificationDto);
      return this.findOne(id);
    }

    async remove(id: number) {
      await this.notificationRepository.delete(id);
      return { deleted: true };
    }
}