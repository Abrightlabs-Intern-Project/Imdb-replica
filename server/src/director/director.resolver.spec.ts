import { Test, TestingModule } from '@nestjs/testing';
import { DirectorResolver } from './director.resolver';

describe('DirectorResolver', () => {
  let resolver: DirectorResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DirectorResolver],
    }).compile();

    resolver = module.get<DirectorResolver>(DirectorResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
