import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { BoardStatus } from '../board-status.enum';

export class BoardStatusValidationPipe implements PipeTransform {
  readonly StatusOptions = [BoardStatus.PRIVATE, BoardStatus.PUBLIC];

  // 첫번째 파라미터는 처리가 된 인자의 값(value) 이며,
  // 두번째 파라미터는 인자에 대한 메타 데이터를 포함한 객체입니다.
  // transform() 메소드에서 return 된 값은 route 핸들러로 전해지고,
  // 예외(exception) 발생 시 클라이언트에 바로 전해집니다.

  transform(value: any, metadata: ArgumentMetadata): any {
    value = value.toUpperCase();
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} is not in the status options`);
    }
    return value;
  }

  private isStatusValid(status: any) {
    const index = this.StatusOptions.indexOf(status);
    return index !== -1;
  }
}
