import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Listing } from "./listing.entity";
import { AbstractEntity } from "src/database/abstract.entity";
import { Comment } from "./comment.entity";

@Entity()
export class Item extends AbstractEntity<Item> {
  @Column({ nullable: true })
  name: string;

  @Column({ default: true })
  public: boolean;

  @OneToOne(() => Listing, { cascade: true })
  @JoinColumn()
  listing: Listing;

  @OneToOne(() => Comment, comment => comment.item, { cascade: true })
  comments: Comment[]
}
