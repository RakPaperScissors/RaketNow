import { S3 } from "aws-sdk";

export const MinioClientProvider = {
    provide: 'MINIO_CLIENT',
    useFactory: async () => {
        return new S3({
            endpoint: `${process.env.PICTURE_URL}`,
            accessKeyId: 'raketnow',
            secretAccessKey: 'raketnowadmin_2345',
            s3ForcePathStyle: true,
            signatureVersion: 'v4',
        });
    },
};