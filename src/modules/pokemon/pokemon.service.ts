// src/pokemon/pokemon.service.ts

import { Injectable, OnModuleInit, NotFoundException  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pokemon } from './entities/pokemon.entity';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class PokemonService implements OnModuleInit {
  constructor(
    @InjectRepository(Pokemon)
    private readonly pokemonRepository: Repository<Pokemon>,
  ) {}

  async onModuleInit() {
    await this.seedDatabase();
  }

  private async seedDatabase() {
    const count = await this.pokemonRepository.count();
    if (count === 0) {
      const filePath = path.join(process.cwd(), 'src', 'pokemon', 'pokemon-data.json');
      const data = fs.readFileSync(filePath, 'utf8');
      const parsedData = JSON.parse(data);

      const pokemons: Pokemon[] = parsedData.pokemon.map((poke) => this.pokemonRepository.create(poke));

      await this.pokemonRepository.save(pokemons);
      console.log('Database has been seeded with initial Pokémon data.');
    }
  }

  async findAll(): Promise<Pokemon[]> {
    return this.pokemonRepository.find();
  }

  async findById(id: string): Promise<Pokemon> {
    const pokemon = await this.pokemonRepository.findOneBy({ id });
    if (!pokemon) {
      throw new NotFoundException(`Pokemon with ID ${id} not found`);
    }
    return pokemon;
  }
}
