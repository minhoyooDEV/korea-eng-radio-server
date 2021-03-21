// kakao app id: 367342

import { HttpService, Injectable } from '@nestjs/common';

// default redirect to : https://myno.loca.lt/auth/kakao
@Injectable()
export class AuthService {
  constructor(private http: HttpService) {}
  async getKakaoCode() {
    try {
      const result = await this.http.get(
        `https://kauth.kakao.com/oauth/authorize?client_id=${367342}&redirect_uri=${'https://myno.loca.lt/auth/kakao'}&response_type=code`,
      );
      console.log('!!!!!!!!!!!');
      return result.toPromise().then((r) => r);
    } catch (error) {
      console.log('@@@@@@@@@@@@@@');
      console.error(error);
      return error;
    }
  }
}
