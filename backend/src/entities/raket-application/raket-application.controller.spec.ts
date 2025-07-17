import { Test, TestingModule } from '@nestjs/testing';
import { RaketApplicationController } from './raket-application.controller';
import { RaketApplicationService } from './raket-application.service';

describe('RaketApplicationController', () => {
  let controller: RaketApplicationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RaketApplicationController],
      providers: [RaketApplicationService],
    }).compile();

    controller = module.get<RaketApplicationController>(RaketApplicationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
