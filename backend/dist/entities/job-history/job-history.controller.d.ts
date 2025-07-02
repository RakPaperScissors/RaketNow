import { JobHistoryService } from './job-history.service';
import { CreateJobHistoryDto } from './dto/create-job-history.dto';
import { UpdateJobHistoryDto } from './dto/update-job-history.dto';
export declare class JobHistoryController {
    private readonly jobHistoryService;
    constructor(jobHistoryService: JobHistoryService);
    create(createJobHistoryDto: CreateJobHistoryDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateJobHistoryDto: UpdateJobHistoryDto): string;
    remove(id: string): string;
}
