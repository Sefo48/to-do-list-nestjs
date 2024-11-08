import { Module } from "@nestjs/common";
import { UsersModule } from './users/users.module';
import { ConfigModule } from "@nestjs/config";
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';


@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    UsersModule,
    TasksModule,
    AuthModule
  ]
})

export class AppModule {}