// src/modules/battle/battle.service.ts

import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Battle } from './entities/battle.entity';
import { Pokemon } from '../pokemon/entities/pokemon.entity';

@Injectable()
export class BattleService {
  constructor(
    @InjectRepository(Battle)
    private readonly battleRepository: Repository<Battle>,
    @InjectRepository(Pokemon)
    private readonly pokemonRepository: Repository<Pokemon>,
  ) {}

  async battle(pokemon1Id: string, pokemon2Id: string): Promise<Battle> {
    const pokemon1 = await this.getPokemonById(pokemon1Id);
    const pokemon2 = await this.getPokemonById(pokemon2Id);

    this.validatePokemons(pokemon1, pokemon2);

    const winner = this.runBattleSimulation(pokemon1, pokemon2);

    return this.saveBattleResult(pokemon1, pokemon2, winner);
  }

  private async getPokemonById(id: string): Promise<Pokemon> {
    const pokemon = await this.pokemonRepository.findOneBy({ id });
    if (!pokemon) {
      throw new NotFoundException(`Pokemon with ID ${id} not found`);
    }
    return pokemon;
  }

  private validatePokemons(pokemon1: Pokemon, pokemon2: Pokemon): void {
    if (pokemon1.hp <= 0 || pokemon2.hp <= 0) {
      throw new BadRequestException('One or both Pokémon have insufficient HP to battle');
    }
  }

  private runBattleSimulation(pokemon1: Pokemon, pokemon2: Pokemon): Pokemon {
    let attacker = pokemon1.speed >= pokemon2.speed ? pokemon1 : pokemon2;
    let defender = attacker === pokemon1 ? pokemon2 : pokemon1;

    if (pokemon1.speed === pokemon2.speed) {
      attacker = pokemon1.attack >= pokemon2.attack ? pokemon1 : pokemon2;
      defender = attacker === pokemon1 ? pokemon2 : pokemon1;
    }

    while (pokemon1.hp > 0 && pokemon2.hp > 0) {
      const damage = Math.max(1, attacker.attack - defender.defense);
      defender.hp -= damage;

      // Intercambiar roles
      [attacker, defender] = [defender, attacker];
    }

    return pokemon1.hp > 0 ? pokemon1 : pokemon2;
  }

  private async saveBattleResult(pokemon1: Pokemon, pokemon2: Pokemon, winner: Pokemon): Promise<Battle> {
    const battle = this.battleRepository.create({
      pokemon1,
      pokemon2,
      winner,
    });
    return await this.battleRepository.save(battle);
  }
}
