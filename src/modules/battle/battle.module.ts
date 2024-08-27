// src/modules/battle/battle.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Battle } from './entities/battle.entity';
import { BattleService } from './battle.service';
import { BattleController } from './battle.controller';
import { Pokemon } from '../pokemon/entities/pokemon.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Battle, Pokemon])],
  providers: [BattleService],
  controllers: [BattleController],
})
export class BattleModule {}
