import { Test, TestingModule } from '@nestjs/testing';
import { WriterResolver } from './writer.resolver';

describe('WriterResolver', () => {
  let resolver: WriterResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WriterResolver],
    }).compile();

    resolver = module.get<WriterResolver>(WriterResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
