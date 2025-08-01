import { Module } from "@nestjs/common";
import { MinioClientProvider } from "./minio-client.provider";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [ConfigModule],
    providers: [MinioClientProvider],
    exports: [MinioClientProvider],
})
export class MinioModule {}