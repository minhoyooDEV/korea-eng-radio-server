import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { KakaoAuthServiceModule } from './kakao-auth-service/kakao-auth-service.module';
import { AuthModule } from './auth/auth.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [AuthModule],
})
export class AppModule {}
