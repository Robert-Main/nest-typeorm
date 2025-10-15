import { EventSubscriber, InsertEvent } from "typeorm";
import { Item } from "./entities/item.entity";
import { EntitySubscriberInterface } from "typeorm/browser";
import { Logger } from "@nestjs/common";
import { DataSource } from "typeorm/browser";


@EventSubscriber()
export class ItemSubscriber implements EntitySubscriberInterface<Item>{
    private readonly logger = new Logger(ItemSubscriber.name);

    constructor(dataSource:DataSource){
        dataSource.subscribers.push(this);
    }

    listenTo() {
        return Item;
    }

    beforeInsert(event: InsertEvent<Item>): Promise<any> | void {
        this.logger.log(`BEFORE ITEM INSERTED: ${JSON.stringify(event.entity)}`);
    }

    afterInsert(event: InsertEvent<Item>): Promise<any> | void {
        this.logger.log(`AFTER ITEM INSERTED: ${JSON.stringify(event.entity)}`);
    }

}