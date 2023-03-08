import "reflect-metadata"
import { v4 as uuidv4 } from "uuid";

import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from "typeorm"

@Entity("Invoices")
export class Invoices {
    @PrimaryGeneratedColumn("uuid")
    id: string | undefined

    @Column({ type: 'varchar' })
    user_id: string | undefined

    @Column({ type: 'varchar' })
    name: string | undefined

    @Column({ type: 'varchar' })
    surname: string | undefined

    @Column({ type: 'varchar' })
    cpf: string | undefined

    @Column({ type: 'varchar' })
    email: string | undefined

    @Column({ type: 'varchar' })
    country: string | undefined

    @Column({ type: 'varchar' })
    state: string | undefined

    @Column({ type: 'varchar' })
    city: string | undefined

    @Column({ type: 'varchar' })
    neighborhood: string | undefined

    @Column({ type: 'varchar' })
    cep: string | undefined

    @Column({ type: 'varchar' })
    street: string | undefined

    @Column({ type: 'varchar' })
    order : string | undefined

    @Column({ type: 'decimal', precision: 12, scale: 2 })
    total: number | undefined

    @Column({ type: 'varchar' })
    payment_type : string | undefined

    @Column({ type: 'varchar' })
    ipv4 : string | undefined
    
    @Column({ type: 'varchar' })
    status : string | undefined

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    })
    data: Date | undefined;

    @BeforeInsert()
    generateId() {
        this.id = uuidv4();
    }
}