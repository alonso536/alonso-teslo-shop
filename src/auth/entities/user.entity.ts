import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Product } from 'src/products/entities';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    unique: true
  })
  email: string;

  @Column({
    type: 'text',
    select: false
  })
  password: string;

  @Column({
    type: 'text'
  })
  fullname: string;

  @Column({
    type: 'bool',
    default: true
  })
  status: boolean;

  @Column({
    type: 'text',
    array: true,
    default: ['ROLE_USER']
  })
  roles: string[];

  @OneToMany(
    () => Product,
    (product) => product.user
  )
  product: Product;

  @BeforeInsert()
  encryptPassword() {
    this.password = bcrypt.hashSync(this.password, 10);
  }
}
