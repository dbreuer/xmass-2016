import { Xmass2016Page } from './app.po';

describe('xmass-2016 App', function() {
  let page: Xmass2016Page;

  beforeEach(() => {
    page = new Xmass2016Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
