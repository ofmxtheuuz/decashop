import "reflect-metadata"
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity("Users")
export class User {
    @PrimaryGeneratedColumn()
    id: number | undefined

    @Column({ type: 'varchar' })
    name: string | undefined

    @Column({ type: 'varchar' })
    username: string | undefined

    @Column({ type: 'varchar' })
    email: string | undefined

    @Column({ type: 'varchar' })
    password: string | undefined
}