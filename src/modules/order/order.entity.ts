import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import UserEntity from "../user/user.entity";

@Entity({ name: 'orders' })
export class OrderEntity {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column({ name: 'total_value', type: 'numeric', precision: 10, scale: 2, nullable: false })
   totalValue: number;

   @ManyToOne(() => UserEntity, user => user.orders)
   userId: string;

   @CreateDateColumn({ name: 'created_at' })
   createdAt: Date;

   @UpdateDateColumn({ name: 'updated_at' })
   updatedAt: Date;

   @DeleteDateColumn({ name: 'deleted_at' })
   deletedAt: Date;
}
