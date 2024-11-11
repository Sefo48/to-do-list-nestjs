import { Module } from "@nestjs/common";
import { UsersModule } from './users/users.module';
import { ConfigModule } from "@nestjs/config";
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { S3Module } from './s3/s3.module';


@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    UsersModule,
    TasksModule,
    AuthModule,
    S3Module,
  ]
})

export class AppModule {}