import { Injectable, NotFoundException } from '@nestjs/common';
// import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';

// 주로 데이터베이스 로직
// CRUD
@Injectable()
export class BoardsService {
  // Inject Repository to Service
  constructor(
    // @Inject Repository as DI
    // Service 에서 해당 Repository 를 이용한다고 변수에 할당
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}

  // async / await -> 데이터베이스 작업이 끝난 후 결과값을 반환
  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Can't find Board id ${id}`);
    }

    return found;
  }

  createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto);
  }
}

// Test on Memory with Database...

// getAllBoards(): Board[] {
//   return this.boards;
// }
//
// createBoard(createBoardDto: CreateBoardDto) {
//   const { title, description } = createBoardDto;
//   const board: Board = {
//     id: uuid(), // 임의로 난수
//     title,
//     description,
//     status: BoardStatus.PUBLIC,
//   };
//
//   this.boards.push(board);
//   return board;
// }
//
// getBoardById(id: string): Board {
//   const found = this.boards.find((board) => board.id === id);
//
//   if (!found) {
//     throw new NotFoundException(`Can't find Board with id ${id}`);
//   }
//
//   return found;
// }
//
// deleteBoard(id: string): void {
//   const found = this.getBoardById(id);
//   this.boards.filter((board) => board.id !== found.id);
// }
//
// updateBoardStatus(id: string, status: BoardStatus): Board {
//   const board = this.getBoardById(id);
//   board.status = status;
//   return board;
// }
