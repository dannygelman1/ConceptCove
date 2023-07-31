import { ObjectType, Field } from '@nestjs/graphql';
import { Entity } from 'typeorm';
import { ID } from '@nestjs/graphql/dist/scalars';
import { Column } from 'typeorm/decorator/columns/Column';
import { CreateDateColumn } from 'typeorm/decorator/columns/CreateDateColumn';

import { PrimaryGeneratedColumn } from 'typeorm/decorator/columns/PrimaryGeneratedColumn';
import { UpdateDateColumn } from 'typeorm/decorator/columns/UpdateDateColumn';

@ObjectType()
@Entity('images')
export class Image {
  @Field(() => ID, { description: 'ID of the user' })
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field({ description: 'Name of the image' })
  @Column({ name: 'name' })
  name!: string;

  @Field({ description: 'Extension of the image' })
  @Column({ name: 'extension' })
  extension!: string;

  @Field({ description: 'Creation timestamp of the game.' })
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @Field({ description: 'Last updated timestamp of the game.' })
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;
}
