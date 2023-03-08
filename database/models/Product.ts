import "reflect-metadata"
import { v4 as uuidv4 } from "uuid";

import {Entity, Column, PrimaryGeneratedColumn, BeforeInsert, CreateDateColumn} from "typeorm"

@Entity("Products")
export class Product {
    @PrimaryGeneratedColumn("uuid")
    id: string | undefined

    @Column({ type: 'varchar' })
    name: string | undefined

    @Column({ type: 'varchar' })
    description: string | undefined

    @Column({ type: 'varchar' })
    image_url: string | undefined

    @Column({ type: 'decimal', precision: 12, scale: 2 })
    price: number | undefined



    @BeforeInsert()
    generateId() {
      this.id = uuidv4();
    }
}