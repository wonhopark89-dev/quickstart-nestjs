import { Injectable } from '@nestjs/common';

// 주로 데이터베이스 로직
// CRUD
@Injectable()
export class BoardsService {
  private boards = [];

  getAllBoards() {
    return this.boards;
  }
}
