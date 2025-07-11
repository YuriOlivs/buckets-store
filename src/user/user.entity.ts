import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'users' })
export default class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  private id: string;

  @Column({ name: 'name', length: 100, nullable: false })
  private name: string;

  @Column({ name: 'lastName', length: 100, nullable: false })
  private lastName: string;

  @Column({ name: 'email', length: 80, nullable: false })
  private email: string;

  @Column({ name: 'password', length: 255, nullable: false })
  private password: string;

  @Column({ name: 'birthDate', nullable: false })
  private birthDate: Date;
  
  @CreateDateColumn({ name: 'created_at' })
  private createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  private updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  private deletedAt: string;

  constructor(
    id: string,
    name: string,
    lastName: string,
    email: string,
    password: string,
    birthDate: Date,
  ) {
    this.id = id;
    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.birthDate = birthDate;
  }

  get getId() {
    return this.id;
  }
  get getName() {
    return this.name;
  }
  get getLastName() {
    return this.lastName;
  }
  get fullName() {
    return `${this.name} ${this.lastName}`;
  }
  get getEmail() {
    return this.email;
  }
  get getPassword() {
    return this.password;
  }
  get getBirthDate() {
    return this.birthDate;
  }
  get getCreatedAt() {
    return this.createdAt;
  }
  get getUpdatedAt() {
    return this.updatedAt;
  }
  get getDeletedAt() {
    return this.deletedAt;
  }

  //setId(id: string) { this.id = id; }
  setName(name: string) {
    this.name = name;
  }
  setLastName(lastName: string) {
    this.lastName = lastName;
  }
  setEmail(email: string) {
    this.email = email;
  }
  setPassword(password: string) {
    this.password = password;
  }
  setBirthDate(birthDate: Date) {
    this.birthDate = birthDate;
  }
}
