import { IsArray, IsUUID, ArrayMinSize } from 'class-validator';
export class CreateConversationDto {
  @IsArray()
  @ArrayMinSize(1) 
  @IsUUID('4', { each: true })
  participantIds: string[];
}