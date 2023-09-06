import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';
import { AulasModule } from './aulas/aulas.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MateriaCatedraticoModule } from './materia-catedratico/materia-catedratico.module';
import { SeccionesModule } from './secciones/secciones.module';
import { MateriasModule } from './materias/materias.module';
import { CatedraticosModule } from './catedraticos/catedraticos.module';
import { HorarioModule } from './horario/horario.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'horario',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }), 
    UsersModule, 
    BooksModule,
    AulasModule,
    AuthModule,
    MateriaCatedraticoModule,
    SeccionesModule,
    MateriasModule,
    CatedraticosModule,
    HorarioModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
