import { AbstractEntity } from "src/database/abstract.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Item } from "./item.entity";

@Entity()
export class Comment extends AbstractEntity<Comment> {
    @Column({default: ''})
    context: string;

    @ManyToOne(() => Item, item => item.comments)
    item: Item;
}