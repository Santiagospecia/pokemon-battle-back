import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PokemonService } from './pokemon.service';
import { Pokemon } from './entities/pokemon.entity';

describe('PokemonService', () => {
  let service: PokemonService;
  let repository: Repository<Pokemon>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PokemonService,
        {
          provide: getRepositoryToken(Pokemon),
          useClass: Repository, 
        },
      ],
    }).compile();

    service = module.get<PokemonService>(PokemonService);
    repository = module.get<Repository<Pokemon>>(getRepositoryToken(Pokemon));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


});
