import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { EntityManager, Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Listing } from './entities/listing.entity';
import { Comment } from './entities/comment.entity';
import { CreateTagDto } from './dto/create-tag.dto';
import { Tag } from './entities/tag.entity';

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

    const tags = createItemDto.tags.map((createTagDto) => {
      const tag = new Tag();
      Object.assign(tag, createTagDto);
      return tag;
    });
    const item = this.entityManager.create(Item, {
      ...createItemDto,
      comments: [],
      tags,
      listing,
    });
    await this.entityManager.save(item);
    return item;
  }

  async findAll() {
    const items = await this.itemsRepository.find({
      relations: ['listing'],
    });

    return items;
  }
  async findOne(id: number) {
    return this.itemsRepository.findOne({
      where: { id },
      relations: ['listing', 'comments', 'tags'],
    });
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    // const item = await this.itemsRepository.findOneBy({ id });
    // if (!item) {
    //   throw new Error(`Item with id ${id} not found`);
    // }
    // item.public = updateItemDto.public;

    // const comments = updateItemDto.comments.map((commentDto) => {
    //   const comment = new Comment();
    //   Object.assign(comment, commentDto);
    //   return comment;
    // });
    // item.comments = comments;
    // await this.entityManager.save(item);

    await this.entityManager.transaction(async (manager) => {
      const item = await this.itemsRepository.findOneBy({ id });
      if (!item) {
        throw new Error(`Item with id ${id} not found`);
      }
      item.public = updateItemDto.public;

      const comments = updateItemDto.comments.map((commentDto) => {
        const comment = new Comment();
        Object.assign(comment, commentDto);
        return comment;
      });
      item.comments = comments;
      await manager.save(item);

      const tagContent = `${Math.random()}`
      const tag = manager.create(Tag, { content: tagContent });
      await manager.save(tag);

      return item;
    });
  }

  remove(id: number) {
    const deleteItem = this.itemsRepository.delete(id);
    console.log('deletwd item', deleteItem);
    return deleteItem;
  }
}
