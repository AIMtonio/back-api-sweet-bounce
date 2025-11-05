import { forwardRef, Module } from '@nestjs/common';
import { EventsRelationshipService } from './events-relationship.service';
import { EventsRelationshipController } from './events-relationship.controller';
import { EventsRelationship } from './entities/events-relationship.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from 'src/usuario2/usuario.module';
import { CustomCalendarModule } from 'src/custom-calendar/custom-calendar.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RelationshipCalendarModule } from 'src/relationship-calendar/relationship-calendar.module';
import { EventoModule } from 'src/evento/evento.module';

@Module({
  imports: [
        TypeOrmModule.forFeature([EventsRelationship]),
        UsuarioModule,
        CustomCalendarModule,
        EventoModule,
        forwardRef(() => RelationshipCalendarModule),
        JwtModule.registerAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: async (configService: ConfigService) => ({
            secret: configService.get<string>('JWT_SECRET'),
            signOptions: { expiresIn: '1h' },
          }),
        }),
        ConfigModule.forRoot({ isGlobal: true }),
    ],
  controllers: [EventsRelationshipController],
  providers: [EventsRelationshipService],
  exports: [EventsRelationshipService],
})
export class EventsRelationshipModule {}
