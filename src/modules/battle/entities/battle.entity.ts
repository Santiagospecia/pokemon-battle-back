// src/modules/battle/entities/battle.entity.ts

import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { Pokemon } from '../../pokemon/entities/pokemon.entity';

@Entity()
export class Battle {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Pokemon)
  pokemon1: Pokemon;

  @ManyToOne(() => Pokemon)
  pokemon2: Pokemon;

  @ManyToOne(() => Pokemon)
  winner: Pokemon;

  @CreateDateColumn()
  createdAt: Date;
}
