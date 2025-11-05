import { forwardRef, Module } from '@nestjs/common';
import { RelationshipCalendarService } from './relationship-calendar.service';
import { RelationshipCalendarController } from './relationship-calendar.controller';
import { RelationshipCalendar } from './entities/relationship-calendar.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from 'src/usuario2/usuario.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CustomCalendarModule } from 'src/custom-calendar/custom-calendar.module';
import { EventoModule } from 'src/evento/evento.module';
import { EventsRelationshipModule } from 'src/events-relationship/events-relationship.module';

@Module({
  imports: [
        TypeOrmModule.forFeature([RelationshipCalendar]),
        UsuarioModule,
        CustomCalendarModule,
        EventoModule,
        forwardRef(() => EventsRelationshipModule),
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
  controllers: [RelationshipCalendarController],
  providers: [RelationshipCalendarService],
  exports: [RelationshipCalendarService],
})
export class RelationshipCalendarModule {}
