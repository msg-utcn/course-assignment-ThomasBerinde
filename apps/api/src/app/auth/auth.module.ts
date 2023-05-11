import {Module} from "@nestjs/common";
import {JwtModule} from "@nestjs/jwt";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {AuthController} from "./auth.controller";
import {AuthService} from "./auth.service";
import {UsersModule} from "../users/users.module";
import {LocalStrategy} from "./strategies/local.strategy";
import {AuthGuard, PassportModule} from "@nestjs/passport";
import {LocalAuthGuard} from "./guards/local-auth.guard";
import {JwtAuthGuard} from "./guards/jwt-auth.guard";
import {JwtStrategy} from "./strategies/jwt.strategy";

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        global: true,
        secret: config.get("JWT_SECRET"),
        signOptions: {expiresIn: '6000s'}
      })
    })],
  providers: [AuthService, LocalStrategy, LocalAuthGuard, JwtStrategy, JwtAuthGuard],
  controllers: [AuthController],
  exports: [JwtAuthGuard, AuthService]
})
export class AuthModule {

}
