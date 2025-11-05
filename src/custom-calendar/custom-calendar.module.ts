import { Module } from '@nestjs/common';
import { CustomCalendarService } from './custom-calendar.service';
import { CustomCalendarController } from './custom-calendar.controller';
import { CustomCalendar } from './entities/custom-calendar.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from 'src/usuario2/usuario.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RelationshipCalendarModule } from 'src/relationship-calendar/relationship-calendar.module';

@Module({
  imports: [
      TypeOrmModule.forFeature([CustomCalendar]),
      UsuarioModule,
      //RelationshipCalendarModule,
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
  controllers: [CustomCalendarController],
  providers: [CustomCalendarService],
  exports: [CustomCalendarService],
})
export class CustomCalendarModule {}
