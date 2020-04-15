import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        //You can also pass strategies an options object in their constructors to configure them. For the local strategy you can pass e.g.:
        //super({
        //    usernameField: 'email',
        //   passwordField: 'password',
        //  });
        super();
    }

    async validate(username: string, password: string): Promise<any> {
        const user = await this.authService.validateUser(username, password);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}

//We've followed the recipe described earlier for all Passport strategies. In our use case with passport-local, there are no configuration options, so our constructor simply calls super(), without an options object.

//We've also implemented the validate() method. For each strategy, Passport will call the verify function (implemented with the validate() method in @nestjs/passport) using an appropriate strategy-specific set of parameters. For the local-strategy, Passport expects a validate() method with the following signature: validate(username: string, password:string): any.