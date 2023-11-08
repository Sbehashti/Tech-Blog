const {format_date, format_plural, format_url} = require('./helpers');
test('format_date() returns a date string', () => {
  const date = new Date('2023-01-15T00:00:00.000Z');
  expect(format_date(date)).toBe('1/15/2023');
});
test('format_plural() returns a pluralized word', () => {
  const word1 = format_plural('tiger', 1);
  const word2 = format_plural('lion', 2);
  expect(word1).toBe('tiger');
  expect(word2).toBe('lions');
});
test('format_url() returns a simplified url string', () => {
  const url1 = format_url('http://test.com/page?id=1');
  const url2 = format_url('https://www.coolstuff.co.uk/new-products');
  const ur13 = format_url('http://www.google.com/search?q=test');
  expect(url1).toBe('test.com/page?id=1');
  expect(url2).toBe('coolstuff.co.uk/new-products');
  expect(ur13).toBe('google.com/search?q=test');
});