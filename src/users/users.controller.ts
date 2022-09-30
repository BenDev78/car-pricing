import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { Serialize } from "../interceptors/serialize.interceptor";
import { UserDto } from "./dtos/user.dto";

@Controller("auth")
@Serialize(UserDto)
export class UsersController {
  constructor(private readonly userService: UsersService) {
  }

  @Post("/signup")
  createUser(@Body() body: CreateUserDto) {
    return this.userService.create(body.email, body.password);
  }

  @Get("/:id")
  getUser(@Param("id") id: number) {
    return this.userService.findOne(id);
  }

  @Get()
  getUsers(@Query("email") email: string) {
    return this.userService.find(email);
  }

  @Patch("/:id")
  updateUser(@Param("id") id: string, @Body() body: UpdateUserDto) {
    return this.userService.update(+id, body);
  }

  @Delete("/:id")
  removeUser(@Param("id") id: string) {
    return this.userService.remove(+id);
  }
}
