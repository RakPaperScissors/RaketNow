import { Users } from './user.entity';
export declare class Organization extends Users {
    org_id: number;
    org_name: string;
    is_verified: boolean;
}
