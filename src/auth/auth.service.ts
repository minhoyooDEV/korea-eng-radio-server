import { HttpService, Injectable } from '@nestjs/common';
export const KAKAO_CLIENT_ID = '9622d0fd4d9984b34f0c1b0e94a07d48';
// default redirect to : https://myno.loca.lt/auth/kakao
@Injectable()
export class AuthService {
  constructor(private http: HttpService) {}
  getKakaoToken(code: string) {
    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('client_id', `${KAKAO_CLIENT_ID}`);
    params.append('redirect_uri', 'https://myno.loca.lt/auth/kakao');
    params.append('code', code);

    return this.http.post(`https://kauth.kakao.com/oauth/token`, params);
  }
  getMe(token: string) {
    return this.http.request({
      url: 'https://kapi.kakao.com/v2/user/me',
      headers: {
        authorization: 'Bearer ' + token,
      },
    });
  }
  getKakaoScopes(scopes: string[]) {
    return this.http.get(
      `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${'https://myno.loca.lt/auth/kakao_service'}&response_type=code&scope=${scopes.join(
        ',',
      )}`,
    );
  }
  // async getKakaoCode() {
  //   try {
  //     const result = await this.http.get(
  //       `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${'https://myno.loca.lt/auth/kakao'}&response_type=code`,
  //     );
  //     console.log('!!!!!!!!!!!');
  //     return result.toPromise().then((r) => r);
  //   } catch (error) {
  //     console.log('@@@@@@@@@@@@@@');
  //     console.error(error);
  //     return error;
  //   }
  // }
}
