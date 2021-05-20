import { TruncatePipe } from './truncate.pipe';

describe('Truncate pipe', () => {
  let pipe: TruncatePipe;

  beforeEach(() => {
    pipe = new TruncatePipe();
  });

  it('With an empty text the truncatePipe returns the input', () => {
    let text = '';
    expect(pipe.transform(text, 100)).toEqual(text);
  });

  it('With an text size lower length than the limit, the truncatePipe returns the whole input', () => {
    const text = 'example';
    expect(pipe.transform(text, 10)).toBe(text);
  });

  it('With an text size higher length than the limit, the truncatePipe returns the input truncated', () => {
    const text = 'example';
    expect(pipe.transform(text, 6)).toBe(text.substring(0, 6) + '...');
  });
});
