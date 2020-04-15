import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        if (user && user.password === pass) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    //sign() function  generates our JWT from a subset of the user object properties, which we then return as a simple object with a single access_token property.

    //Note: we choose a property name of sub to hold our userId value to be consistent with JWT standards. Don't forget to inject the JwtService provider into the AuthService.
    async login(user: any) {
        const payload = { username: user.username, sub: user.userId };
        return {
            // eslint-disable-next-line @typescript-eslint/camelcase
            access_token: this.jwtService.sign(payload),
        };
    }
}