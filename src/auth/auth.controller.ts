import { Body, Controller, Get, Header, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleSmartHomeDto } from './google-smart-home.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  googleSmartHome(@Query() query: GoogleSmartHomeDto): string {
    console.log(query);
    return 'called api';
  }

  @Post()
  googleSmartHomeToken(@Body() body: GoogleSmartHomeDto): string {
    console.log(body);
    return 'called post api';
  }

  @Get('kakao')
  @Header('content-type', 'text/html')
  async kakaoRedirect(@Query('code') code): Promise<any> {
    const result = await this.authService.getKakaoToken(code);
    try {
      const res = await result.toPromise();
      console.log(res.data);
      const token = (res.data as any).access_token;

      const meResult = await this.authService.getMe(token);
      const meRes = (await meResult.toPromise()).data;

      return `<!DOCTYPE html>
                ${code}
                <div style="color: red"> 
                ${JSON.stringify(res.data)}
                <div>
                <div style="color: blue"> 
                ${JSON.stringify(meRes)}
                <div>
              </html>`;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  @Get('kakao_service')
  kakaoService() {
    return `<!DOCTYPE html>errors</html>`;
  }

  @Get('kakao_login')
  @Header('content-type', 'text/html')
  async kakaoAuth(): Promise<any> {
    return `<!DOCTYPE html>
        <div>
        <a href=https://kauth.kakao.com/oauth/authorize?client_id=${'9622d0fd4d9984b34f0c1b0e94a07d48'}&redirect_uri=${'https://myno.loca.lt/auth/kakao'}&response_type=code>로그인하기 </a>
        </div>
        <div>
        <a gref
        </div>

        </html>`;
  }
}
