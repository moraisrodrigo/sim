import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicationsService } from './medications.service';
import { MedicationsController } from './medications.controller';
import { Medication } from './entities/medication.entity';
import { Prescription } from './entities/prescription.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Medication, Prescription])],
    providers: [MedicationsService],
    controllers: [MedicationsController],
    exports: [MedicationsService],
})
export class MedicationsModule { }