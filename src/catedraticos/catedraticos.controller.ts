import { Controller } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CatedraticosService } from './catedraticos.service';

@ApiBearerAuth()
@Controller('catedraticos')
export class CatedraticosController {
  constructor(private readonly catedraticoService: CatedraticosService) {}
}
