import { Controller, Get } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { Pokemon } from './entities/pokemon.entity';

@Controller('pokemons')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  async findAll(): Promise<Pokemon[]> {
    return this.pokemonService.findAll();
  }
}
