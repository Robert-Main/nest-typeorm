import { CreateCommentDto } from "./create-comment.dtos";

export class UpdateItemDto {
  public: boolean;
  comments: CreateCommentDto[];
}
