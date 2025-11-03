import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class EventsService {
    private _prismaService;
    constructor(_prismaService: PrismaService);
    create(createEventDto: CreateEventDto): Promise<{
        id: number;
        name: string;
        description: string | null;
        days: string | null;
        date: Date | null;
        image: string | null;
        createAt: Date;
        updateAt: Date;
    }>;
    findAll(): Prisma.PrismaPromise<{
        id: number;
        name: string;
        description: string | null;
        days: string | null;
        date: Date | null;
        image: string | null;
        createAt: Date;
        updateAt: Date;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        name: string;
        description: string | null;
        days: string | null;
        date: Date | null;
        image: string | null;
        createAt: Date;
        updateAt: Date;
    }>;
    update(id: number, updateEventDto: UpdateEventDto): Promise<{
        id: number;
        name: string;
        description: string | null;
        days: string | null;
        date: Date | null;
        image: string | null;
        createAt: Date;
        updateAt: Date;
    }>;
    remove(id: number): Promise<{
        id: number;
        name: string;
        description: string | null;
        days: string | null;
        date: Date | null;
        image: string | null;
        createAt: Date;
        updateAt: Date;
    }>;
}
