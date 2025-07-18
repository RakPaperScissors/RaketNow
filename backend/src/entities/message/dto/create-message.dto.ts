import { IsNotEmpty, IsString, IsUUID, MinLength, IsOptional, IsArray } from 'class-validator';

export class CreateMessageDto {
  @IsNotEmpty()
  @IsUUID()
  conversationId: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  text: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

  // senderId: string | undefined;
}