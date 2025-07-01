import { Injectable } from "@nestjs/common";
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';
import axios from 'axios';
import { access } from "fs";

@Injectable()
export class AuthService {
  private clientId: string;
  private clientSecret: string;
  private redirectUri: string;

  constructor(
    private readonly config: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    this.clientId = this.config.get<string>('SPOTIFY_CLIENT_ID') ?? '';
    this.clientSecret = this.config.get<string>('SPOTIFY_CLIENT_SECRET') ?? '';
    this.redirectUri = this.config.get<string>('SPOTIFY_REDIRECT_URL') ?? '';
  }

  getSpotifyAuthUrl(): string {
    const scope = [
      'user-read-email',
      'user-read-private',
      'user-top-read',
      'playlist-modify-public',
    ].join(' ');

    const params = new URLSearchParams({
      client_id: this.clientId,
      response_type: 'code',
      redirect_uri: this.redirectUri,
      scope,
    });

    return `https://accounts.spotify.com/authorize?${params.toString()}`;
  }

  async handleSpotifyCallback(code: string): Promise<void> {
    const tokenResponse = await axios.post(
      'https://accounts.spotify.com/api/token',
      new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: this.redirectUri,
      }),
      {
        headers: {
          Authorization:
          'Basic ' + 
          Buffer.from(`${this.clientId}:${this.clientSecret}`).toString(
            'base64',
          ),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    const {
      access_token,
      refresh_token,
      expires_in,
    } = tokenResponse.data;

    const profileResponse = await axios.get('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const { id, display_name, email } = profileResponse.data;
    
    const tokenExpiration = new Date(Date.now() + expires_in * 1000);

    await this.prisma.user.upsert({
      where: { spotifyId: id },
      update: {
        accessToken: access_token,
        refreshToken: refresh_token,
        tokenExpiration,
        displayName: display_name,
        email,
      },
      create: {
        spotifyId: id,
        accessToken: access_token,
        refreshToken: refresh_token,
        tokenExpiration,
        displayName: display_name,
        email,
      },
    });
  }
}