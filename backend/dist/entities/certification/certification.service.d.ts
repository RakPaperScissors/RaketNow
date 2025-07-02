import { Repository } from 'typeorm';
import { Certification } from './entities/certification.entity';
import { CreateCertificationDto } from './dto/create-certification.dto';
import { UpdateCertificationDto } from './dto/update-certification.dto';
export declare class CertificationService {
    private readonly certRepo;
    constructor(certRepo: Repository<Certification>);
    create(dto: CreateCertificationDto, raketistaId: number): Promise<Certification>;
    findAll(): Promise<Certification[]>;
    findOne(id: number): Promise<Certification | null>;
    update(id: number, updateDto: UpdateCertificationDto): Promise<Certification | null>;
    remove(id: number): Promise<{
        message: string;
    }>;
    updateField(id: number, fields: Partial<Certification>): Promise<Certification | null>;
}
