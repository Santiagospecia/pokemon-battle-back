import { Test, TestingModule } from '@nestjs/testing';
import { BattleController } from './battle.controller';
import { BattleService } from './battle.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Battle } from './entities/battle.entity';
import { Pokemon } from '../pokemon/entities/pokemon.entity';

describe('BattleController', () => {
  let controller: BattleController;
  let service: BattleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BattleController],
      providers: [
        BattleService,
        {
          provide: getRepositoryToken(Battle),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Pokemon),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<BattleController>(BattleController);
    service = module.get<BattleService>(BattleService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

});
