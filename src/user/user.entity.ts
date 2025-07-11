import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'users' })
export default class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  private _id: string;

  @Column({ name: 'name', length: 100, nullable: false })
  private _name: string;

  @Column({ name: 'last_name', length: 100, nullable: false })
  private _lastName: string;

  @Column({ name: 'email', length: 80, nullable: false })
  private _email: string;

  @Column({ name: 'password', length: 255, nullable: false })
  private _password: string;

  @Column({ name: 'birth_date', nullable: false })
  private _birthDate: Date;
  
  @CreateDateColumn({ name: 'created_at' })
  private _createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  private _updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  private _deletedAt: string;

  constructor(
    id: string,
    name: string,
    lastName: string,
    email: string,
    password: string,
    birthDate: Date,
  ) {
    this._id = id;
    this._name = name;
    this._lastName = lastName;
    this._email = email;
    this._password = password;
    this._birthDate = birthDate;
  }

  get id() {return this._id;}
  get name() {return this._name;}
  get lastName() {return this._lastName;}
  get fullName() {return `${this._name} ${this._lastName}`;}
  get email() {return this._email;}
  get password() {return this._password;}
  get birthDate() {return this._birthDate;}
  get createdAt() {return this._createdAt;}
  get updatedAt() {return this._updatedAt;}
  get deletedAt() {return this._deletedAt;}

  setName(name: string) {this._name = name;}
  setLastName(lastName: string) {this._lastName = lastName;}
  setEmail(email: string) {this._email = email;}
  setPassword(password: string) {this._password = password;}
  setBirthDate(birthDate: Date) {this._birthDate = birthDate;}
}
