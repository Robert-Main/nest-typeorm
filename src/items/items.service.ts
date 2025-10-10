import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { EntityManager, Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Listing } from "./entities/listing.entity";

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemsRepository: Repository<Item>,
    private readonly entityManager: EntityManager,
  ) {}
  async create(createItemDto: CreateItemDto) {
    const listing = new Listing({
      ...createItemDto.listing,
      rating: 0
    })
    const item = new Item({
      ...CreateItemDto,
      listing,
    })
    await this.entityManager.save(item);
    return item;
  }

  async findAll() {
    return this.itemsRepository.find();
  }

  asyncfindOne(id: number) {
    return this.itemsRepository.findOneBy({ id });
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    const item = await this.itemsRepository.findOneBy({ id });
    if (!item) {
      throw new Error(`Item with id ${id} not found`);
    }
    item.public = updateItemDto.public;
    await this.entityManager.save(item);
  }

  remove(id: number) {
    return `This action removes a #${id} item`;
  }
}
