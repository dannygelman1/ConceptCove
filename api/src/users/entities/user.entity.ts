import { ObjectType, Field } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql/dist/scalars';
import { Entity } from 'typeorm/decorator/entity/Entity';
import { Column } from 'typeorm/decorator/columns/Column';
import { CreateDateColumn } from 'typeorm/decorator/columns/CreateDateColumn';

import { PrimaryGeneratedColumn } from 'typeorm/decorator/columns/PrimaryGeneratedColumn';
import { UpdateDateColumn } from 'typeorm/decorator/columns/UpdateDateColumn';

@ObjectType()
@Entity('users')
export class User {
  @Field(() => ID, { description: 'ID of the user' })
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field({ description: 'Name of the user' })
  @Column({ name: 'name' })
  name!: string;

  @Field({ description: 'Email of the user' })
  @Column({ name: 'email' })
  email!: string;

  @Field({ description: 'Firebase ID of the user' })
  @Column({ name: 'firebase_id' })
  firebase_id!: string;

  @Field({ description: 'Creation timestamp of the game.' })
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @Field({ description: 'Last updated timestamp of the game.' })
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;
}
