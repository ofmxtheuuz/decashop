import "reflect-metadata"
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

enum Roles {
    ADMIN = "admin",
    USER = "user",
}

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

    @Column({
        type: 'enum',
        enum: Roles,
        default: Roles.USER,
    })
    role: string | undefined;
}