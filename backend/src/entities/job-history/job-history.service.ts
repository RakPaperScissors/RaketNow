import { Injectable } from '@nestjs/common';
import { CreateJobHistoryDto } from './dto/create-job-history.dto';
import { UpdateJobHistoryDto } from './dto/update-job-history.dto';

@Injectable()
export class JobHistoryService {
  create(createJobHistoryDto: CreateJobHistoryDto) {
    return 'This action adds a new jobHistory';
  }

  findAll() {
    return `This action returns all jobHistory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} jobHistory`;
  }

  update(id: number, updateJobHistoryDto: UpdateJobHistoryDto) {
    return `This action updates a #${id} jobHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} jobHistory`;
  }
}
