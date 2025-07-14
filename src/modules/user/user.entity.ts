import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

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

  @Column({ name: 'birth_date', nullable: false })
  birthDate: Date;
  
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

  get getId() {return this.id;}
  get getName() {return this.name;}
  get getLastName() {return this.lastName;}
  get getFullName() {return `${this.name} ${this.lastName}`;}
  get getEmail() {return this.email;}
  get getPassword() {return this.password;}
  get getBirthDate() {return this.birthDate;}
  get getCreatedAt() {return this.createdAt;}
  get getUpdatedAt() {return this.updatedAt;}
  get getDeletedAt() {return this.deletedAt;}

  setName(name: string) {this.name = name;}
  setLastName(lastName: string) {this.lastName = lastName;}
  setEmail(email: string) {this.email = email;}
  setPassword(password: string) {this.password = password;}
  setBirthDate(birthDate: Date) {this.birthDate = birthDate;}
}
