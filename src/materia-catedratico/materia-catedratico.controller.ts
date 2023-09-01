import { Controller } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { MateriaCatedraticoService } from './materia-catedratico.service';

@ApiBearerAuth()
@Controller('materia-catedratico')
export class MateriaCatedraticoController {
  constructor(private readonly mcService: MateriaCatedraticoService) {}
}
