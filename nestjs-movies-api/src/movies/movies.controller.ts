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

@Controller('movies')
export class MoviesController {
  @Get()
  getAll() {
    return 'This will return all movies';
  }

  @Get('search')
  search(@Query('year') searchingYear: string) {
    return `We are searching for a movie mode after: ${searchingYear}`;
  }

  @Get('/:id')
  getOne(@Param('id') id: string) {
    // Param 이름은 같아야함
    return `This will return one movie with id: ${id}`;
  }

  @Post()
  create(@Body() movieData) {
    // NestJS 는 JSON 포맷을 자동으로 인식할 수 있고, 리턴도 가능하다.
    return movieData;
  }

  @Delete('/:id')
  remove(@Param('id') movieId: string) {
    return `This will delete a movie with id ${movieId}`;
  }

  // Put vs Patch ( Patch 는 일부분만 업데이트 )
  @Patch('/:id')
  path(@Param('id') movieId: string, @Body() updateData) {
    return {
      updateMovie: movieId,
      ...updateData,
    };
  }
}
