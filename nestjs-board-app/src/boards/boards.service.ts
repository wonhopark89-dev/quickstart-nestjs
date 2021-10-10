import { Injectable } from '@nestjs/common';
import { Board } from './board.model';

// 주로 데이터베이스 로직
// CRUD
@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  getAllBoards(): Board[] {
    return this.boards;
  }
}
