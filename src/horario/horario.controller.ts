import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { HorarioService } from './horario.service';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Horario } from './Horario';
import { SettingsDto } from './dto/settings.dto';
import { PorcentajeSeccionPeriodo } from './dto/porcentaje-seccion-periodo';

@ApiBearerAuth()
@Controller('horario')
export class HorarioController {
  constructor(private readonly horarioService: HorarioService) {}
  
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiResponse({ status: 200, description: 'Se ha creado el horario exitosamente'})
  createHorario(@Body() settings: SettingsDto): Promise<Array<Array<PorcentajeSeccionPeriodo>>> {
    return this.horarioService.createHorario(settings);
  }

}
