// NestJS 에서 DTO (Data-Transfer-Object) 생성 시 Class 를 더 추천함 ( interface 도 가능 )
// => 클래스는 인터페이스와 다르게 런타임에서 작동하기 떄문에 파이프같은 기능을 이용할때 더 유용
// service 와 controller 에서 사용

import { IsNotEmpty } from 'class-validator';

export class CreateBoardDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
