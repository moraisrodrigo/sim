import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './config/configuration';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MedicationsModule } from './medications/medications.module';
import { User } from './users/entities/user.entity';
import { Medication } from './medications/entities/medication.entity';
import { Prescription } from './medications/entities/prescription.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.database'),
        entities: [User, Medication, Prescription],
        synchronize: configService.get('database.synchronize') || false,
        logging: configService.get('database.logging') || false,
      
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    MedicationsModule,
  ],
})
export class AppModule { }