import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './board.entity';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { BoardStatus } from './board-status.enum';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';

@Controller('boards')
@UseGuards(AuthGuard()) // Controller 레벨로 지정해야 모든 Handler 에 적용된다.
export class BoardsController {
  // boardService: BoardsService;
  // constructor(boardService: BoardsService) {
  //   this.boardService = boardService;
  // }
  // 접근 제한자를 이용해서 소스 간단하게 하기
  /**
   * 접근제한자 ( public, protected, private) 을 생성자(constructor) 파라미터에 선언하면
   * 접근 제한자가 사용된 생성자 파라미터는 암묵적으로 클래스 프로퍼티로 선언됩니다.
   */
  constructor(private boardService: BoardsService) {}

  @Get()
  getAllBoard(): Promise<Board[]> {
    return this.boardService.getAllBoards();
  }

  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardService.getBoardById(id);
  }

  // Board 생성 시 User 정보도 넣을 수 있도록 설정
  @Post('/')
  @UsePipes(ValidationPipe) // handler-level pipes
  createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @GetUser() user: User,
  ): Promise<Board> {
    return this.boardService.createBoard(createBoardDto, user);
  }

  @Delete('/:id')
  deleteBoard(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.boardService.deleteBoard(id);
  }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) boardStatus: BoardStatus,
  ): Promise<Board> {
    return this.boardService.updateBoardStatus(id, boardStatus);
  }
}

// Test on Memory with Database...
//
// @Get('/')
// getAllBoard(): Board[] {
//   return this.boardService.getAllBoards();
// }
//
// @Post('/')
// @UsePipes(ValidationPipe) // handler-level pipes
// createBoard(@Body() createBoardDto: CreateBoardDto): Board {
//   return this.boardService.createBoard(createBoardDto);
// }
//
// @Get('/:id')
// getBoardById(@Param('id') id: string): Board {
//   return this.boardService.getBoardById(id);
// }
//
// @Delete('/:id')
// deleteBoard(@Param('id') id: string): void {
//   this.boardService.deleteBoard(id);
// }
//
// // parameter-level pipe
// @Patch('/:id/status')
// updateBoardStatus(
//   @Param('id') id: string,
//   @Body('status', BoardStatusValidationPipe) boardStatus: BoardStatus,
// ): Board {
//   return this.boardService.updateBoardStatus(id, boardStatus);
// }
