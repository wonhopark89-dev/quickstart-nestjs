import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  @Get()
  getAll() {
    return 'This will return all movies';
  }

  @Get('/:id')
  getOne(@Param('id') id: string) {
    // Param 이름은 같아야함
    return `This will return one movie with id: ${id}`;
  }

  @Post()
  create() {
    return `This will create a movie`;
  }

  @Delete('/:id')
  remove(@Param('id') movieId: string) {
    return `This will delete a movie with id ${movieId}`;
  }

  // Put vs Patch ( Patch 는 일부분만 업데이트 )
  @Patch('/:id')
  path(@Param('id') movieId: string) {
    return `This will patch a movie with id ${movieId}`;
  }
}
