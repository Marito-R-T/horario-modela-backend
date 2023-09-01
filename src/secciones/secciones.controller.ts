import { Controller } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { SeccionesService } from './secciones.service';

@ApiBearerAuth()
@Controller('secciones')
export class SeccionesController {
  constructor(private readonly seccionService: SeccionesService) {}
}
