import {BeforeInsert, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {v4 as uuidv4} from "uuid";

@Entity("Orders")
export class Orders {
    constructor() {
        this.products = []
    }

    @PrimaryGeneratedColumn("uuid")
    id: string | undefined

    @Column({ type: 'varchar' })
    user_id: string | undefined

    @Column({ type: 'simple-json' })
    products: {
        product: string;
        quantity: number;
    }[];

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
