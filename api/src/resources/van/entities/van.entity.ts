import { Field, ID, ObjectType } from '@nestjs/graphql'
import { ObjectId } from 'mongodb'
import { Package } from 'src/resources/package/entities/package.entity'
import { Column, CreateDateColumn, Entity, ObjectIdColumn, UpdateDateColumn } from 'typeorm'

@Entity()
@ObjectType()
export class Van {
  @Field(() => ID) // GraphQL
  @ObjectIdColumn() //typeORM // Map this field to the (generated) _id column in the database
  id: ObjectId

  @Field(() => [Package])
  packages: Package[]

  @Column()
  packagesIds: string[]

  @Field({ nullable: true })
  @CreateDateColumn({ type: 'timestamp', nullable: true })
  createdAt?: Date

  @Field({ nullable: true })
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date
}
