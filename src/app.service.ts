import { GoogleGenAI } from '@google/genai';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  private readonly ai?: GoogleGenAI;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('GOOGLE_API_KEY');

    if (typeof apiKey === 'string' && apiKey.trim().length > 0) {
      this.ai = new GoogleGenAI({ apiKey });
    }
  }

  async generateContent(prompt: string): Promise<string> {
    if (!prompt?.trim()) {
      return 'Nenhum texto foi enviado.';
    }

    if (!this.ai) {
      return 'GOOGLE_API_KEY is not configured. Please set it to use the AI assistant.';
    }

    const response = await this.ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Ajude a resolver este problema: ${prompt}`,
    });

    return response.text ?? 'Não foi possível gerar uma resposta no momento.';
  }

  getOI(): string {
    return 'Olá Mundo!';
  }

  getHello(): string {
    return 'Hello World!';
  }
}
