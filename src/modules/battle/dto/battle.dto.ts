import { IsString, IsNotEmpty } from 'class-validator';

export class BattleDto {
  @IsString()
  @IsNotEmpty()
  pokemon1Id: string;

  @IsString()
  @IsNotEmpty()
  pokemon2Id: string;
}