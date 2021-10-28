import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt'; // Strategy 중요함
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  // JWT strategy
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
      secretOrKey: 'Secret1234', // 어떤 시크릿 키로 확인을 하는지
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 어디서 토큰을 가져오는지, 어떤 타입인지
    });
  }

  // 위에서 토큰이 유효한지 확인이 되면 validate 메소드에서 payload 에 있는 유저이름이 데이터베이스에서 있는 유저인지
  // 확인 후 있다면 유저 객체를 return 값으로 던져줍니다.
  // return 값은 @UseGuards(AuthGuard()) 를 이용한 모든 요청의 Request Object 에 들어갑니다.
  async validate(payload) {
    // 모든 유효한 요청에는 user 정보가 있는걸 판단하기 위함
    const { username } = payload;
    const user: User = await this.userRepository.findOne({ username });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
