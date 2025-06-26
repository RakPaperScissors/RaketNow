import { Test, TestingModule } from '@nestjs/testing';
import { RaketsController } from './rakets.controller';
import { RaketsService } from './rakets.service';

describe('RaketsController', () => {
  let controller: RaketsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RaketsController],
      providers: [RaketsService],
    }).compile();

    controller = module.get<RaketsController>(RaketsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
