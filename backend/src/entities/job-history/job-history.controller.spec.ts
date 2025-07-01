import { Test, TestingModule } from '@nestjs/testing';
import { JobHistoryController } from './job-history.controller';
import { JobHistoryService } from './job-history.service';

describe('JobHistoryController', () => {
  let controller: JobHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobHistoryController],
      providers: [JobHistoryService],
    }).compile();

    controller = module.get<JobHistoryController>(JobHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
