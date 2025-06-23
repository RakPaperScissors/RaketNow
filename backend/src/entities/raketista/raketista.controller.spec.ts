import { Test, TestingModule } from '@nestjs/testing';
import { RaketistaController } from './raketista.controller';
import { RaketistaService } from './raketista.service';

describe('RaketistaController', () => {
  let controller: RaketistaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RaketistaController],
      providers: [RaketistaService],
    }).compile();

    controller = module.get<RaketistaController>(RaketistaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
