import { IsInt, IsNotEmpty, IsOptional } from "class-validator";

export class CreateRaketistaSkillDto {
    @IsOptional()
    raketistaId?: number;
    
    @IsNotEmpty()
    @IsInt()
    skillId: number;
}
