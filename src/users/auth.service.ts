import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "./users.service";
import * as bcrypt from "bcrypt";
import { User } from "./users.entity";

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async signUp(email: string, password: string): Promise<User> {
    let isEmailInUse = await this.usersService.find(email);

    if (isEmailInUse.length)
      throw new BadRequestException('This email is already in use');

    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(password, salt);

    return await this.usersService.create(email, hash);
  }

  async signin(email: string, password: string): Promise<User> {
    const [user] = await this.usersService.find(email);

    if (!user)
      throw new NotFoundException('There is no account with this email');

    const compare = await bcrypt.compare(password, user.password);

    if (!compare)
      throw new BadRequestException('Password is invalid')

    return user;
  }
}
