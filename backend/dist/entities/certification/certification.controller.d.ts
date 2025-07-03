import { CertificationService } from './certification.service';
import { CreateCertificationDto } from './dto/create-certification.dto';
import { UpdateCertificationDto } from './dto/update-certification.dto';
export declare class CertificationController {
    private readonly certificationService;
    constructor(certificationService: CertificationService);
    create(req: any, dto: CreateCertificationDto): Promise<import("./entities/certification.entity").Certification>;
    findAll(): Promise<import("./entities/certification.entity").Certification[]>;
    findOne(id: string): Promise<import("./entities/certification.entity").Certification | null>;
    update(id: string, updateCertificationDto: UpdateCertificationDto): Promise<import("./entities/certification.entity").Certification | null>;
    updateTitle(id: string, title: string): Promise<import("./entities/certification.entity").Certification | null>;
    updateFile(id: string, fileURL: string): Promise<import("./entities/certification.entity").Certification | null>;
    updateOrg(id: string, org: string): Promise<import("./entities/certification.entity").Certification | null>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
