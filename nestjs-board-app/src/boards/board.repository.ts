// 데이터베이스에 관련 된일은 서비스에서 하는게 아닌 Repository 에서 하는것을 Repository Pattern 이라고함
// ( 데이터베이스 관련된 일, insert, find, delete ...)
import { EntityRepository, Repository } from 'typeorm';
import { Board } from './board.entity';

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {}
