import { Test, TestingModule } from '@nestjs/testing';
import { RaketistaSkillController } from './raketista-skill.controller';
import { RaketistaSkillService } from './raketista-skill.service';

describe('RaketistaSkillController', () => {
  let controller: RaketistaSkillController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RaketistaSkillController],
      providers: [RaketistaSkillService],
    }).compile();

    controller = module.get<RaketistaSkillController>(RaketistaSkillController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
