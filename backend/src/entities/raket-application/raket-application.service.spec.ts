import { Test, TestingModule } from '@nestjs/testing';
import { RaketApplicationService } from './raket-application.service';

describe('RaketApplicationService', () => {
  let service: RaketApplicationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RaketApplicationService],
    }).compile();

    service = module.get<RaketApplicationService>(RaketApplicationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
