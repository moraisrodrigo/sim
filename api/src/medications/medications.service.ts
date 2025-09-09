import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Medication } from './entities/medication.entity';
import { Prescription } from './entities/prescription.entity';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { UpdateMedicationDto } from './dto/update-medication.dto';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';

@Injectable()
export class MedicationsService {
    constructor(
        @InjectRepository(Medication)
        private medicationsRepository: Repository<Medication>,
        @InjectRepository(Prescription)
        private prescriptionsRepository: Repository<Prescription>,
    ) { }

    // Medication methods
    async createMedication(createMedicationDto: CreateMedicationDto): Promise<Medication> {
        const medication = this.medicationsRepository.create(createMedicationDto);
        return this.medicationsRepository.save(medication);
    }

    async findAllMedications(): Promise<Medication[]> {
        return this.medicationsRepository.find();
    }

    async findOneMedication(id: string): Promise<Medication> {
        const medication = await this.medicationsRepository.findOne({ where: { id } });
        if (!medication) {
            throw new NotFoundException(`Medication with ID ${id} not found`);
        }
        return medication;
    }

    async updateMedication(id: string, updateMedicationDto: UpdateMedicationDto): Promise<Medication> {
        const medication = await this.findOneMedication(id);
        Object.assign(medication, updateMedicationDto);
        return this.medicationsRepository.save(medication);
    }

    async removeMedication(id: string): Promise<void> {
        const result = await this.medicationsRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Medication with ID ${id} not found`);
        }
    }

    // Prescription methods
    async createPrescription(createPrescriptionDto: CreatePrescriptionDto): Promise<Prescription> {
        const prescription = this.prescriptionsRepository.create({
            ...createPrescriptionDto,
            medication: { id: createPrescriptionDto.medicationId },
            user: createPrescriptionDto.user,
        });

        return this.prescriptionsRepository.save(prescription);
        // const prescription = this.prescriptionsRepository.create(createPrescriptionDto);
        // return this.prescriptionsRepository.save(prescription);
    }

    async findAllPrescriptions(): Promise<Prescription[]> {
        return this.prescriptionsRepository.find({
            relations: ['user', 'medication'],
        });
    }

    async findUserPrescriptions(userId: string): Promise<Prescription[]> {
        return this.prescriptionsRepository.find({
            where: { user: { id: userId } },
            relations: ['medication'],
        });
    }

    async findOnePrescription(id: string): Promise<Prescription> {
        const prescription = await this.prescriptionsRepository.findOne({
            where: { id },
            relations: ['user', 'medication'],
        });
        if (!prescription) {
            throw new NotFoundException(`Prescription with ID ${id} not found`);
        }
        return prescription;
    }

    async updatePrescription(id: string, updatePrescriptionDto: UpdatePrescriptionDto): Promise<Prescription> {
        const prescription = await this.findOnePrescription(id);
        Object.assign(prescription, updatePrescriptionDto);
        return this.prescriptionsRepository.save(prescription);
    }

    async removePrescription(id: string): Promise<void> {
        const result = await this.prescriptionsRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Prescription with ID ${id} not found`);
        }
    }
}