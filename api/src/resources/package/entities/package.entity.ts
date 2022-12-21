import { Field, ID, ObjectType } from '@nestjs/graphql'
import { ObjectId } from 'mongodb'
import { Column, CreateDateColumn, Entity, ObjectIdColumn, UpdateDateColumn } from 'typeorm'

@Entity()
@ObjectType()
export class Package {
  @Field(() => ID) // GraphQL
  @ObjectIdColumn() //typeORM // Map this field to the (generated) _id column in the database
  id: ObjectId

  @Field() // GraphQL
  @Column() // typeORM
  customerId: string

  @Field()
  @Column()
  lat: number

  @Field()
  @Column()
  lng: number

  @Field()
  @Column()
  name: string

  @Field()
  @Column()
  weight: number

  @Field()
  @Column()
  address: string

  @Field({ nullable: true })
  @Column()
  description?: string

  @Field({ nullable: true })
  @CreateDateColumn({ type: 'timestamp', nullable: true })
  createdAt?: Date

  @Field({ nullable: true })
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date
}
