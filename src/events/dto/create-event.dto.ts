
import { IsString, IsDate, IsOptional, IsEnum, IsNotEmpty } from 'class-validator';
import { evento } from '@prisma/client';
import { Type } from 'class-transformer';

export class CreateEventDto{
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsDate()
    @Type(() => Date)
    date: Date;
}

//export type CreateEventDto2 = Omit<evento, 'id' | 'createAt'>;


