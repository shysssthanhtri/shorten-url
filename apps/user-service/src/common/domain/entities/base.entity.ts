import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @ApiProperty()
  @CreateDateColumn({ name: 'created_at' })
  @Type(() => Date)
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: 'updated_at' })
  @Type(() => Date)
  updatedAt: Date;
}
