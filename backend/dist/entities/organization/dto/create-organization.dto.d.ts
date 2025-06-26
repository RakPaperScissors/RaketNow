import { userRole } from "src/entities/user/entities/user.entity";
export declare class CreateOrganizationDto {
    email: string;
    password: string;
    name: string;
    orgName: string;
    readonly role: userRole;
}
