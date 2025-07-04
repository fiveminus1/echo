import { Controller, Res, Get, Query } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Response } from "express";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('login')
  login(@Res() res: Response){
    const redirectUrl = this.authService.getSpotifyAuthUrl();
    return res.redirect(redirectUrl);
  }

  @Get('callback')
  async callback(@Query('code') code: string, @Res() res: Response){
    await this.authService.handleSpotifyCallback(code);
    console.log('Received code:', code); // Ensure the `code` exists
    return res.send('Authentication successful! You can close this tab.');
  }
}