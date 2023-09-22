import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesModule } from './images/images.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5532,
      username: 'admin',
      password: 'empty',
      database: 'photobank',
      entities: [__dirname + '/**/*.entity.{t,j}s'],
      synchronize: true,
    }),
    ImagesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
