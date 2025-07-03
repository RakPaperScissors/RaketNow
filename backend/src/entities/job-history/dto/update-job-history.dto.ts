import { PartialType } from '@nestjs/mapped-types';
import { CreateJobHistoryDto } from './create-job-history.dto';

export class UpdateJobHistoryDto extends PartialType(CreateJobHistoryDto) {}
