import { Test, TestingModule } from '@nestjs/testing';
import { RaketsService } from './rakets.service';

describe('RaketsService', () => {
  let service: RaketsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RaketsService],
    }).compile();

    service = module.get<RaketsService>(RaketsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
