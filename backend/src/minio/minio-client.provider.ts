import { S3 } from "aws-sdk";

export const MinioClientProvider = {
    provide: 'MINIO_CLIENT',
    useFactory: async () => {
        return new S3({
            endpoint: 'http://localhost:9000',
            accessKeyId: 'minioadmin',
            secretAccessKey: 'minioadmin123',
            s3ForcePathStyle: true,
            signatureVersion: 'v4',
        });
    },
};