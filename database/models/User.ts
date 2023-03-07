import "reflect-metadata"
import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from "typeorm"
import { v4 as uuidv4 } from "uuid";

enum Roles {
    ADMIN = "admin",
    USER = "user",
}

@Entity("Users")
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string | undefined

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

    @BeforeInsert()
    generateId() {
      this.id = uuidv4();
    }
}
