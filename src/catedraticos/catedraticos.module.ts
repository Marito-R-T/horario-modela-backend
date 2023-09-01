import { Module } from '@nestjs/common';
import { CatedraticosService } from './catedraticos.service';
import { CatedraticosController } from './catedraticos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Catedratico } from './catedratico.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Catedratico])],
  providers: [CatedraticosService],
  controllers: [CatedraticosController]
})
export class CatedraticosModule {}
