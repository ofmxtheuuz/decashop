import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("CartItems")
export class CartItem {
  
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column({ type: "varchar" })
  product: string | undefined;

  @Column({ type: "varchar" })
  user: string | undefined;

  @Column({ type: "integer" })
  quantity: number | undefined;
}