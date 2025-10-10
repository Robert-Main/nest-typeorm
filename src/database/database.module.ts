import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (ConfigService: ConfigService) => ({
        type: 'mysql',
        host: ConfigService.getOrThrow('MYSQL_HOST'),
        port: +ConfigService.getOrThrow<number>('MYSQL_PORT'),
        database: ConfigService.getOrThrow('MYSQL_DATABASE'),
        username: ConfigService.getOrThrow('MYSQL_USERNAME'),
        password: ConfigService.getOrThrow('MYSQL_ROOT_PASSWORD'),
        autoLoadEntities: true,
        synchronize: ConfigService.getOrThrow('MYSQL_SYNCHRONIZE'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
