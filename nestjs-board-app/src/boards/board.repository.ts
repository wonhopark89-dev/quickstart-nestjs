// 데이터베이스에 관련 된일은 서비스에서 하는게 아닌 Repository 에서 하는것을 Repository Pattern 이라고함
// ( 데이터베이스 관련된 일, insert, find, delete ...)
import { EntityRepository, Repository } from 'typeorm';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatus } from './board-status.enum';
import { User } from '../auth/user.entity';

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {
  async createBoard(
    createBoardDto: CreateBoardDto,
    user: User,
  ): Promise<Board> {
    const { title, description } = createBoardDto;

    const board = this.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
      user,
    });

    await this.save(board);
    return board;
  }
}
