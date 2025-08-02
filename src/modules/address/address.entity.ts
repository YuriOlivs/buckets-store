import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import UserEntity from "../user/user.entity";
import { OrderEntity } from "../order/order.entity";

@Entity({ name: 'addresses' })
export class AddressEntity {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column({ name: 'street', length: 255, nullable: false })
   street: string;

   @Column({ name: 'number', length: 20, nullable: false })
   number: string;

   @Column({ name: 'city', length: 100, nullable: false })
   city: string;

   @Column({ name: 'state', length: 100, nullable: false })
   state: string;

   @Column({ name: 'complement', length: 100, nullable: true })
   complement: string;

   @Column({ name: 'neighborhood', length: 100, nullable: false })
   neighborhood: string;

   @Column({ name: 'postal_code', length: 20, nullable: false })
   postalCode: string;

   @Column({ name: 'country', length: 100, nullable: false })
   country: string;

   @ManyToOne(() => UserEntity, user => user.addresses)
   user: UserEntity;

   @OneToMany(() => OrderEntity, order => order.address)
   orders: OrderEntity[];

   @CreateDateColumn({ name: 'created_at' })
   createdAt: Date;

   @UpdateDateColumn({ name: 'updated_at' })
   updatedAt: Date;

   @DeleteDateColumn({ name: 'deleted_at' })
   deletedAt: Date;

   constructor(
      street: string,
      number: string,
      city: string,
      state: string,
      complement: string,
      neighborhood: string,
      postalCode: string,
      country: string,
      user: UserEntity
   ) {
      this.street = street;
      this.number = number;
      this.city = city;
      this.state = state;
      this.complement = complement;
      this.neighborhood = neighborhood;
      this.postalCode = postalCode;
      this.country = country;
      this.user = user;
   }
}
