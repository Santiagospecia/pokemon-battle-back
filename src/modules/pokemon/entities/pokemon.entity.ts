import { Entity, Column, PrimaryColumn  } from 'typeorm';

@Entity()
export class Pokemon {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  hp: number;

  @Column()
  attack: number;

  @Column()
  defense: number;

  @Column()
  speed: number;
  
  @Column()
  type: string;

  @Column()
  imageUrl: string;
}
