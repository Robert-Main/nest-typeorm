import { Listing } from './../entities/listing.entity';
import { CreateListingDto } from "./create-listing.dto";

export class CreateItemDto {
  name: string;
  public: boolean;
  listing: CreateListingDto
}
