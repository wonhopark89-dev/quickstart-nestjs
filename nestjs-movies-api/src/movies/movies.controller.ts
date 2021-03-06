import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }

  @Get('/:id')
  getOne(@Param('id') id: number): Movie {
    // Param 이름은 같아야함
    return this.moviesService.getOne(id);
  }

  @Post()
  create(@Body() movieData: CreateMovieDto) {
    // NestJS 는 JSON 포맷을 자동으로 인식할 수 있고, 리턴도 가능하다.
    return this.moviesService.create(movieData);
  }

  @Delete('/:id')
  remove(@Param('id') movieId: number) {
    this.moviesService.deleteOne(movieId);
  }

  // Put vs Patch ( Patch 는 일부분만 업데이트 )
  @Patch('/:id')
  path(@Param('id') movieId: number, @Body() updateData: UpdateMovieDto) {
    return this.moviesService.update(movieId, updateData);
  }
}
