import { Controller } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { MateriasService } from './materias.service';

@ApiBearerAuth()
@Controller('materias')
export class MateriasController {
  constructor(private readonly materiaService: MateriasService) {}
}
