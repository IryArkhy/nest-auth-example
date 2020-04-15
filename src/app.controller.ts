import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) { }

  //Now we can update the /auth/login route to return a JWT.

  @UseGuards(LocalAuthGuard) //create gouarded routes
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user); //returns token
  }

  //^^^ for checking use command: curl -X POST http://localhost:3000/auth/login -d '{"username": "john", "password": "changeme"}' -H "Content-Type: application/json"

  //Protects this route and requires Bearer token for authorization

  //^^^ for checking use 1)command: curl -X POST http://localhost:3000/auth/login -d '{"username": "john", "password": "changeme"}' -H "Content-Type: application/json"

  //Get token

  //curl http://localhost:3000/profile -H "Authorization: Bearer previous_token" ---> {"userId":1,"username":"john"}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}