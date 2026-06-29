import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            getHello: jest.fn().mockReturnValue('Hello World!'),
            getOI: jest.fn().mockReturnValue('Olá Mundo!'),
            generateContent: jest.fn(),
          },
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();
  });

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  describe('getOI', () => {
    it('should return "Olá Mundo!"', () => {
      expect(appController.getOI()).toBe('Olá Mundo!');
    });
  });

  describe('generateContent', () => {
    it('should call appService.generateContent with the provided prompt', async () => {
      const body = { prompt: 'teste de prompt' };
      const serviceSpy = jest
        .spyOn(appService, 'generateContent')
        .mockResolvedValue('Resposta da IA');

      const result = await appController.generateContent(body);

      expect(serviceSpy).toHaveBeenCalledWith(body.prompt);
      expect(result).toBe('Resposta da IA');
    });

    it('should handle empty prompt correctly', async () => {
      const body = { prompt: '' };
      jest
        .spyOn(appService, 'generateContent')
        .mockResolvedValue('Nenhum texto foi enviado.');

      const result = await appController.generateContent(body);
      expect(result).toBe('Nenhum texto foi enviado.');
    });

    it('should handle whitespace prompt correctly', async () => {
      const body = { prompt: '   ' };
      jest
        .spyOn(appService, 'generateContent')
        .mockResolvedValue('Nenhum texto foi enviado.');

      const result = await appController.generateContent(body);
      expect(result).toBe('Nenhum texto foi enviado.');
    });
  });
});
