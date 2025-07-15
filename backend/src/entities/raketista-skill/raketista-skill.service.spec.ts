import { Test, TestingModule } from '@nestjs/testing';
import { RaketistaSkillService } from './raketista-skill.service';

describe('RaketistaSkillService', () => {
  let service: RaketistaSkillService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RaketistaSkillService],
    }).compile();

    service = module.get<RaketistaSkillService>(RaketistaSkillService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
