import { Repository } from 'typeorm';
import { JobHistory } from './entities/job-history.entity';
import { Raket } from '../rakets/entities/raket.entity';
import { CreateJobHistoryDto } from './dto/create-job-history.dto';
import { UpdateJobHistoryDto } from './dto/update-job-history.dto';
export declare class JobHistoryService {
    private jobHistoryRepo;
    private raketRepo;
    constructor(jobHistoryRepo: Repository<JobHistory>, raketRepo: Repository<Raket>);
    create(dto: CreateJobHistoryDto): Promise<JobHistory>;
    findAll(): Promise<JobHistory[]>;
    findOne(jobId: number): Promise<JobHistory>;
    update(id: number, dto: UpdateJobHistoryDto): Promise<JobHistory>;
    updateField(id: number, field: string, value: any): Promise<JobHistory>;
    remove(id: number): Promise<JobHistory>;
}
