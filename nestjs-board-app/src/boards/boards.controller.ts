import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board, BoardStatus } from './board.model';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('boards')
export class BoardsController {
  // boardService: BoardsService;
  // constructor(boardService: BoardsService) {
  //   this.boardService = boardService;
  // }
  // 접근 제한자를 이용해서 소스 간단하게 하기
  /**
   * 접근제한자 ( public, protected, private) 을 생성자(consturctor) 파라미터에 선언하면
   * 접근 제한자가 사용된 생성자 파라미터는 암묵적으로 클래스 프로퍼티로 선언됩니다.
   */
  constructor(private boardService: BoardsService) {}

  @Get('/')
  getAllBoard(): Board[] {
    return this.boardService.getAllBoards();
  }

  @Post('/')
  @UsePipes(ValidationPipe) // handler-level pipes
  createBoard(@Body() createBoardDto: CreateBoardDto): Board {
    return this.boardService.createBoard(createBoardDto);
  }

  @Get('/:id')
  getBoardById(@Param('id') id: string): Board {
    return this.boardService.getBoardById(id);
  }

  @Delete('/:id')
  deleteBoard(@Param('id') id: string): void {
    this.boardService.deleteBoard(id);
  }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id') id: string,
    @Body('status') boardStatus: BoardStatus,
  ): Board {
    return this.boardService.updateBoardStatus(id, boardStatus);
  }
}
