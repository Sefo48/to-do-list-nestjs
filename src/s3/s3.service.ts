import { PutObjectAclCommand, PutObjectCommand, PutObjectCommandInput, PutObjectCommandOutput, PutObjectOutput, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service {

    private region: string;
    private s3: S3Client; 

    constructor(private configService: ConfigService) {
        this.region = this.configService.get<string>('S3_REGION') || 'eu-west-1';
        this.s3 = new S3Client({
            region: this.region,
            credentials: {
                secretAccessKey: 'asd',
                accessKeyId: '123'
            }
        })
        
    }

    async uploadFile(file: Express.Multer.File, key: string) {
        const bucket = this.configService.get<string>('S3_BUCKET');
        const input: PutObjectCommandInput = {
            Body: file.buffer,
            Bucket: bucket,
            Key: key,
            ContentType: file.mimetype,
            ACL: 'public-read',
        }
        try {
            const response: PutObjectCommandOutput = await this.s3.send(new PutObjectCommand(input))
            
            if(response.$metadata.httpStatusCode === 200) {
                return `https://${bucket}.s3.${this.region}.yandex.com/${key}`
            }

            throw new Error('Image not Saved')
        } catch (error) {
            throw new Error(error)
        }
        
    }
}
