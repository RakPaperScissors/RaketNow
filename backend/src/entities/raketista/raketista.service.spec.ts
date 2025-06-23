import { Test, TestingModule } from '@nestjs/testing';
import { RaketistaService } from './raketista.service';

describe('RaketistaService', () => {
  let service: RaketistaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RaketistaService],
    }).compile();

    service = module.get<RaketistaService>(RaketistaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
