import { Test, TestingModule } from '@nestjs/testing';
import { JobHistoryService } from './job-history.service';

describe('JobHistoryService', () => {
  let service: JobHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobHistoryService],
    }).compile();

    service = module.get<JobHistoryService>(JobHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
