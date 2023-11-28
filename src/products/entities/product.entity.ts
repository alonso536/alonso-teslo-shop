import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductImage } from "./product-image.entity";
import { User } from "src/auth/entities/user.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Product {
  @ApiProperty({ example: '29bb81bb-e7d5-46ae-b7ad-a9271341ba67' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({
    type: 'text',
    unique: true
  })
  title: string;

  @ApiProperty()
  @Column({
    type: 'float',
    default: 0
  })
  price: number;

  @ApiProperty()
  @Column({
    type: 'text',
    nullable: true
  })
  description: string;

  @ApiProperty()
  @Column({
    type: 'text',
    unique: true
  })
  slug: string;

  @ApiProperty()
  @Column({
    type: 'int',
    default: 0
  })
  stock: number;

  @ApiProperty()
  @Column({
    type: 'text',
    array: true
  })
  sizes: string[];

  @ApiProperty()
  @Column({
    type: 'text'
  })
  gender: string;

  @ApiProperty()
  @Column({
    type: 'text',
    array: true,
    default: []
  })
  tags: string[];

  @ManyToOne(
    () => User,
    (user) => user.product,
    { eager: true }
  )
  user: User;

  @OneToMany(
    () => ProductImage,
    (productImage) => productImage.product,
    { cascade: true, eager: true }
  )
  images?: ProductImage[]

  @BeforeInsert()
  checkSlugInsert() {
    if(!this.slug) {
      this.slug = this.title;
    }

    this.slug = this.slug.toLowerCase().replaceAll(" ", "-");
  }

  @BeforeUpdate()
  checkSlugUpdate() {
    this.slug = this.slug.toLowerCase().replaceAll(" ", "-");
  }
}
