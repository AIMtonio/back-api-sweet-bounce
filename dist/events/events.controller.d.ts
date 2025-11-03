import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
export declare class EventsController {
    private readonly eventsService;
    constructor(eventsService: EventsService);
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
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        name: string;
        description: string | null;
        days: string | null;
        date: Date | null;
        image: string | null;
        createAt: Date;
        updateAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        id: number;
        name: string;
        description: string | null;
        days: string | null;
        date: Date | null;
        image: string | null;
        createAt: Date;
        updateAt: Date;
    }>;
    update(id: string, updateEventDto: UpdateEventDto): Promise<{
        id: number;
        name: string;
        description: string | null;
        days: string | null;
        date: Date | null;
        image: string | null;
        createAt: Date;
        updateAt: Date;
    }>;
    remove(id: string): Promise<{
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
