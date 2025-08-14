import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { OrderEntity } from '../order/order.entity';
import { AddressEntity } from '../address/address.entity';
import CartEntity from '../cart/entities/cart.entity';

@Entity({ name: 'users' })
export default class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', length: 100, nullable: false })
  name: string;

  @Column({ name: 'last_name', length: 100, nullable: false })
  lastName: string;

  @Column({ name: 'email', length: 80, nullable: false })
  email: string;

  @Column({ name: 'password', length: 255, nullable: false })
  password: string;

  @OneToMany(() => OrderEntity, order => order.user)
  orders: OrderEntity[];

  @Column({ name: 'birth_date', nullable: false })
  birthDate: Date;

  @OneToMany(() => AddressEntity, address => address.user)
  addresses: AddressEntity[];

  @OneToOne(() => CartEntity, cart => cart.user)
  cart: CartEntity;
  
  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;

  constructor(
    name: string,
    lastName: string,
    email: string,
    password: string,
    birthDate: Date,
  ) {
    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.birthDate = birthDate;
  }
}
