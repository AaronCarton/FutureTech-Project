import { Field, ID, ObjectType } from '@nestjs/graphql'
import { ObjectId } from 'mongodb'
import { Parcel } from 'src/resources/parcel/entities/parcel.entity'
import { Column, CreateDateColumn, Entity, ObjectIdColumn, UpdateDateColumn } from 'typeorm'

@Entity()
@ObjectType()
export class Van {
  @Field(() => ID) // GraphQL
  @ObjectIdColumn() //typeORM // Map this field to the (generated) _id column in the database
  id: ObjectId

  @Field(() => [Parcel])
  parcels: Parcel[]

  @Column()
  parcelIds: string[]

  @Field({ nullable: true })
  @CreateDateColumn({ type: 'timestamp', nullable: true })
  createdAt?: Date

  @Field({ nullable: true })
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date
}
