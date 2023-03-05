import "reflect-metadata"

import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity("Products")
export class Product {
    @PrimaryGeneratedColumn()
    id: number | undefined

    @Column({ type: 'varchar' })
    name: string | undefined

    @Column({ type: 'varchar' })
    description: string | undefined

    @Column({ type: 'varchar' })
    image_url: string | undefined

    @Column('decimal')
    price: number | undefined
}