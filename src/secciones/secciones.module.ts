import { Module } from '@nestjs/common';
import { SeccionesService } from './secciones.service';
import { SeccionesController } from './secciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seccion } from './seccion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Seccion])],
  providers: [SeccionesService],
  controllers: [SeccionesController]
})
export class SeccionesModule {}
