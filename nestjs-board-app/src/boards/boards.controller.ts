import { Controller, Get } from '@nestjs/common';
import { BoardsService } from './boards.service';

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
  getAllBoard() {
    return this.boardService.getAllBoards();
  }
}
