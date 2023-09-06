import { Module } from '@nestjs/common';
import { AulasService } from './aulas.service';
import { AulasController } from './aulas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aula } from './aula.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Aula])],
  controllers: [AulasController],
  providers: [AulasService],
  exports: [AulasService]
})
export class AulasModule {}
