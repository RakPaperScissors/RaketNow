import { Users } from './../../user/entities/user.entity';
export declare class Certification {
    certId: number;
    title: string;
    fileURL: string;
    isAuthenticated: boolean;
    issuingOrganization: string;
    raketistaId: Users;
}
