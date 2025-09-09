import { IsString, IsNotEmpty, IsDate, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';

export class CreatePrescriptionDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    medicationId: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    dosage: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    frequency: string;

    @ApiProperty()
    @Type(() => Date)
    @IsDate()
    startDate: Date;

    @ApiProperty({ required: false })
    @Type(() => Date)
    @IsDate()
    @IsOptional()
    endDate?: Date;

    user?: User;
}