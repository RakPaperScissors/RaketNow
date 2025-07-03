import { Test, TestingModule } from '@nestjs/testing';
import { RaketPicturesService } from './raket-pictures.service';

describe('RaketPicturesService', () => {
  let service: RaketPicturesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RaketPicturesService],
    }).compile();

    service = module.get<RaketPicturesService>(RaketPicturesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
