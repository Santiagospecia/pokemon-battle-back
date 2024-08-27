// src/modules/battle/battle.controller.ts

import { Controller, Get, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { BattleService } from './battle.service';
import { Battle } from './entities/battle.entity';
import { BattleDto } from './dto/battle.dto';

@Controller('battles')
export class BattleController {
  constructor(private readonly battleService: BattleService) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async battle(@Query() battleDto: BattleDto): Promise<Battle> {
    const { pokemon1Id, pokemon2Id } = battleDto;
    return this.battleService.battle(pokemon1Id, pokemon2Id);
  }
}
