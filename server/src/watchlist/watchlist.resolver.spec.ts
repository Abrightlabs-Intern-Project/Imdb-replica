import { Test, TestingModule } from '@nestjs/testing';
import { WatchlistResolver } from './watchlist.resolver';

describe('WatchlistResolver', () => {
  let resolver: WatchlistResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WatchlistResolver],
    }).compile();

    resolver = module.get<WatchlistResolver>(WatchlistResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
