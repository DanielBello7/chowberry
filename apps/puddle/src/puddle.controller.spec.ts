import { Test, TestingModule } from '@nestjs/testing';
import { PuddleController } from './puddle.controller';
import { PuddleService } from './puddle.service';

describe('PuddleController', () => {
  let puddleController: PuddleController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PuddleController],
      providers: [PuddleService],
    }).compile();

    puddleController = app.get<PuddleController>(PuddleController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(puddleController.getHello()).toBe('Hello World!');
    });
  });
});
