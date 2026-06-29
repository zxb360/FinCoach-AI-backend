import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('oi')
  getOI(): string {
    return this.appService.getOI();
  }

  @Post('assistente-ia')
  async generateContent(@Body() body: { prompt: string }): Promise<string> {
    const response = await this.appService.generateContent(body.prompt);
    return response;
  }
}
