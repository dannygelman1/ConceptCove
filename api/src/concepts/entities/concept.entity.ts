import { ObjectType, Field } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql/dist/scalars';
import { Entity } from 'typeorm/decorator/entity/Entity';
import { Column } from 'typeorm/decorator/columns/Column';
import { CreateDateColumn } from 'typeorm/decorator/columns/CreateDateColumn';

import { PrimaryGeneratedColumn } from 'typeorm/decorator/columns/PrimaryGeneratedColumn';
import { UpdateDateColumn } from 'typeorm/decorator/columns/UpdateDateColumn';
import { User as UserEntity } from 'src/users/entities/user.entity';
import { JoinColumn, ManyToOne } from 'typeorm';

@ObjectType()
@Entity('concepts')
export class Concept {
  @Field(() => ID, { description: 'ID of the concept art' })
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field({ description: 'ID of the concept art image', nullable: true })
  @Column({ name: 'image_id', nullable: true })
  image_id?: string;

  @Field({ description: 'Title of the concept art', nullable: true })
  @Column({ name: 'title', nullable: true })
  title?: string;

  @Field({ description: 'Artist who made the concept art', nullable: true })
  @Column({ name: 'artist', nullable: true })
  artist?: string;

  @Field({ description: 'Url to the concept art', nullable: true })
  @Column({ name: 'url', nullable: true })
  url?: string;

  @Field({ description: 'Owner id of the concept art' })
  @Column({ name: 'owner_id' })
  owner_id!: string;

  @ManyToOne(() => UserEntity, (user) => user.concept)
  @JoinColumn({ name: 'owner_id' })
  user: UserEntity;

  @Field({ description: 'Creation timestamp of the game.' })
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @Field({ description: 'Last updated timestamp of the game.' })
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;
}
