import { IsArray, ArrayMinSize, IsInt } from 'class-validator';
export class CreateConversationDto {
  @IsArray()
  @ArrayMinSize(1) 
  @IsInt({ each: true })
  participantIds: number[];
}