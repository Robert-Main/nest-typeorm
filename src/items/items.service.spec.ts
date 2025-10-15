import { Test, TestingModule } from '@nestjs/testing';
import { ItemsService } from './items.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Item } from './entities/item.entity'; // Make sure to import Item
import { EntityManager, Repository } from "typeorm";
import { find } from "rxjs";

describe('ItemsService', () => {
  let service: ItemsService;
  let itemsRepository:Repository<Item>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemsService,
        {
          provide: getRepositoryToken(Item),
          useValue: {
            find: jest.fn().mockResolvedValue([]),
          },
        },
        {
          provide: EntityManager,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<ItemsService>(ItemsService);
    itemsRepository = module.get<Repository<Item>>(getRepositoryToken(Item));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  test('findAll should return an array of items', async () => {
    await service.findAll();
    expect(itemsRepository.find).toHaveBeenCalledWith({ relations: ['listing'] });
  });
});
