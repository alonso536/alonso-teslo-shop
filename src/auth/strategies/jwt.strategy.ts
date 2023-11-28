import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "../entities/user.entity";
import { JwtPayload } from "../interfaces/jwt-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
		private readonly configService: ConfigService
	) {
		super({
			secretOrKey: configService.get('SECRET_JWT'),
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
		});
	}
	async validate(payload: JwtPayload): Promise<User> {
		const { id } = payload;
		const user = await this.userRepository.findOneBy({ id });

		if(!user) throw new UnauthorizedException('Token not valid');
		if(!user.status) throw new UnauthorizedException('User was deleted');

		return user;
	}
}