import { CreateJobHistoryDto } from './dto/create-job-history.dto';
import { UpdateJobHistoryDto } from './dto/update-job-history.dto';
export declare class JobHistoryService {
    create(createJobHistoryDto: CreateJobHistoryDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateJobHistoryDto: UpdateJobHistoryDto): string;
    remove(id: number): string;
}
