import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { MedicationsService } from './medications.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { UpdateMedicationDto } from './dto/update-medication.dto';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';

@ApiTags('medications')
@Controller('medications')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class MedicationsController {
    constructor(private readonly medicationsService: MedicationsService) { }

    // Medication endpoints
    @Post()
    @ApiOperation({ summary: 'Create new medication' })
    createMedication(@Body() createMedicationDto: CreateMedicationDto) {
        return this.medicationsService.createMedication(createMedicationDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all medications' })
    findAllMedications() {
        return this.medicationsService.findAllMedications();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get medication by id' })
    findOneMedication(@Param('id') id: string) {
        return this.medicationsService.findOneMedication(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update medication' })
    updateMedication(
        @Param('id') id: string,
        @Body() updateMedicationDto: UpdateMedicationDto,
    ) {
        return this.medicationsService.updateMedication(id, updateMedicationDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete medication' })
    removeMedication(@Param('id') id: string) {
        return this.medicationsService.removeMedication(id);
    }

    // Prescription endpoints
    @Post('prescriptions')
    @ApiOperation({ summary: 'Create new prescription' })
    createPrescription(@Body() createPrescriptionDto: CreatePrescriptionDto, @Request() req) {
        const prescriptionData = { ...createPrescriptionDto, user: req.user };
        return this.medicationsService.createPrescription(prescriptionData);
    }

    @Get('prescriptions')
    @ApiOperation({ summary: 'Get all prescriptions' })
    findAllPrescriptions(@Request() req) {
        return this.medicationsService.findUserPrescriptions(req.user.id);
    }

    @Get('prescriptions/:id')
    @ApiOperation({ summary: 'Get prescription by id' })
    findOnePrescription(@Param('id') id: string) {
        return this.medicationsService.findOnePrescription(id);
    }

    @Patch('prescriptions/:id')
    @ApiOperation({ summary: 'Update prescription' })
    updatePrescription(
        @Param('id') id: string,
        @Body() updatePrescriptionDto: UpdatePrescriptionDto,
    ) {
        return this.medicationsService.updatePrescription(id, updatePrescriptionDto);
    }

    @Delete('prescriptions/:id')
    @ApiOperation({ summary: 'Delete prescription' })
    removePrescription(@Param('id') id: string) {
        return this.medicationsService.removePrescription(id);
    }
}