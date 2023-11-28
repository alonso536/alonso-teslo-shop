import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateUserDto {
	@IsString()
	@IsEmail()
	email: string;

	@IsString()
	@MinLength(4)
	password: string;

	@IsString()
	@MinLength(1)
	fullname: string;
}
