import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { EntityManager, Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Listing } from "./entities/listing.entity";
import { Comment } from "./entities/comment.entity";

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemsRepository: Repository<Item>,
    private readonly entityManager: EntityManager,
  ) {}
  async create(createItemDto: CreateItemDto) {
    const listing = this.entityManager.create(Listing, {
      ...createItemDto.listing,
      rating: 0,
    });
    await this.entityManager.save(listing);

    const item = this.entityManager.create(Item, {
      ...createItemDto,
      comments: [],
      listing,
    });
    await this.entityManager.save(item);

    // Reload with relations
    // return this.itemsRepository.findOne({
    //   where: { id: item.id },
    //   relations: ['listing'],
    // });
  }

  async findAll() {
    const items = await this.itemsRepository.find({
      relations: ['listing'],
    });

    return items;
  }

  asyncfindOne(id: number) {
    return this.itemsRepository.findOne({
      where: { id },
      relations: ['listing', 'comments'],
    });
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    const item = await this.itemsRepository.findOneBy({ id });
    if (!item) {
      throw new Error(`Item with id ${id} not found`);
    }
    item.public = updateItemDto.public;

    const comments = updateItemDto.comments.map(commentDto => {
      const comment = new Comment();
      Object.assign(comment, commentDto);
      return comment;
    });
    item.comments = comments;
    await this.entityManager.save(item);
  }

  remove(id: number) {
    const deleteItem = this.itemsRepository.delete(id)
    console.log("deletwd item",deleteItem);
    return deleteItem
  }
}
