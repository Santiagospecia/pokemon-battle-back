// src/modules/battle/battle.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { BattleService } from './battle.service';
import { PokemonService } from '../pokemon/pokemon.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Battle } from './entities/battle.entity';
import { Pokemon } from '../pokemon/entities/pokemon.entity';
import { Repository } from 'typeorm';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('BattleService', () => {
  let battleService: BattleService;
  let pokemonService: PokemonService;
  let battleRepository: Repository<Battle>;
  let pokemonRepository: Repository<Pokemon>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BattleService,
        PokemonService,
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

    battleService = module.get<BattleService>(BattleService);
    pokemonService = module.get<PokemonService>(PokemonService);
    battleRepository = module.get<Repository<Battle>>(getRepositoryToken(Battle));
    pokemonRepository = module.get<Repository<Pokemon>>(getRepositoryToken(Pokemon));
  });

  it('should throw an error if a Pokémon is not found', async () => {
    jest.spyOn(pokemonRepository, 'findOneBy').mockResolvedValue(null);
    await expect(battleService.battle('1', '2')).rejects.toThrow(NotFoundException);
  });

  it('should throw an error if a Pokémon has insufficient HP', async () => {
    jest.spyOn(pokemonRepository, 'findOneBy').mockResolvedValue({ id: '1', hp: 0 } as Pokemon);
    jest.spyOn(pokemonRepository, 'findOneBy').mockResolvedValueOnce({ id: '2', hp: 10 } as Pokemon);
    await expect(battleService.battle('1', '2')).rejects.toThrow(BadRequestException);
  });

});
