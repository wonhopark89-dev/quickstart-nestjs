import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: '',
  password: '',
  database: 'board-app',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  // synchronize true 값을 주면 애플리케이션을 다시 실행할때, 엔티티 안에서 수정된 컬럼의 길이 타입 변경값 등을
  // 해당 테이블을 Drop 한 후 다시 생성한다.

  synchronize: true,
};
