import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Board } from '../boards/board.entity';

@Entity()
@Unique(['username']) // 기본값 : Controller 레벨에서 500 에러 발생/리턴
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  // eager : true -> user 를 가져올때 board 정보도 가져올 수 있도록
  // one-to-many : 한 사람이 여러 board 를 만들 수 있음
  // Board-Entity 에서 User-Entity 를 연동해놔야 된다.
  @OneToMany((type) => Board, (board) => board.user, { eager: true })
  boards: Board[];
}
