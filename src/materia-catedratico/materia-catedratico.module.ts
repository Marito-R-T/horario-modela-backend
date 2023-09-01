import { Module } from '@nestjs/common';
import { MateriaCatedraticoController } from './materia-catedratico.controller';
import { MateriaCatedraticoService } from './materia-catedratico.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MateriaCatedratico } from './materia-catedratico.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MateriaCatedratico])],
  controllers: [MateriaCatedraticoController],
  providers: [MateriaCatedraticoService]
})
export class MateriaCatedraticoModule {}
