import { Test, TestingModule } from '@nestjs/testing';
import { RaketPicturesController } from './raket-pictures.controller';
import { RaketPicturesService } from './raket-pictures.service';

describe('RaketPicturesController', () => {
  let controller: RaketPicturesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RaketPicturesController],
      providers: [RaketPicturesService],
    }).compile();

    controller = module.get<RaketPicturesController>(RaketPicturesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
