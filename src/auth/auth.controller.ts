import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, SetMetadata } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './decorators/get-user.decorator';
import { User } from './entities/user.entity';
import { RawHeaders } from './decorators/raw-headers.decorator';
import { UserRoleGuard } from './guards/user-role.guard';
import { RoleProtected } from './decorators/role-protected.decorator';
import { ValidRoles } from './interfaces/valid-roles.interface';
import { Auth } from './decorators/auth.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('private')
  @UseGuards(AuthGuard())
  testingPrivateRoute(
    @GetUser() user: User, 
    @GetUser('email') email: string,
    @RawHeaders() rawHeaders: string[]
  ) {
    return {
      ok: true,
      msg: 'Hello world private',
      user,
      email,
      rawHeaders
    }
  }

  @Get('private2')
  @RoleProtected(ValidRoles.ADMIN, ValidRoles.SUPER, ValidRoles.USER)
  //@SetMetadata('roles', ['ROLE_ADMIN', 'ROLE_SUPER', 'ROLE_USER'])
  @UseGuards(AuthGuard(), UserRoleGuard)
  testingPrivateRoute2(
    @GetUser() user: User, 
  ) {
    return {
      ok: true,
      user
    }
  }

  @Get('private3')
  @Auth(ValidRoles.ADMIN, ValidRoles.USER)
  testingPrivateRoute3(
    @GetUser() user: User, 
  ) {
    return {
      ok: true,
      user
    }
  }
}
