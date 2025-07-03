import { JobHistoryService } from './job-history.service';
import { CreateJobHistoryDto } from './dto/create-job-history.dto';
import { UpdateJobHistoryDto } from './dto/update-job-history.dto';
export declare class JobHistoryController {
    private readonly jobHistoryService;
    constructor(jobHistoryService: JobHistoryService);
    create(createJobHistoryDto: CreateJobHistoryDto): Promise<import("./entities/job-history.entity").JobHistory>;
    findAll(): Promise<import("./entities/job-history.entity").JobHistory[]>;
    findOne(id: string): Promise<import("./entities/job-history.entity").JobHistory>;
    update(id: string, updateJobHistoryDto: UpdateJobHistoryDto): Promise<import("./entities/job-history.entity").JobHistory>;
    updateTitle(id: string, value: string): Promise<import("./entities/job-history.entity").JobHistory>;
    updateDescription(id: string, value: string): Promise<import("./entities/job-history.entity").JobHistory>;
    remove(id: string): Promise<import("./entities/job-history.entity").JobHistory>;
}
