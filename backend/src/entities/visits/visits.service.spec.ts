import { Test, TestingModule } from '@nestjs/testing';
import { VisitsService } from './visits.service';

describe('VisitsService', () => {
  let service: VisitsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VisitsService],
    }).compile();

    service = module.get<VisitsService>(VisitsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
