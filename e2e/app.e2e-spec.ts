import { LawManWebPage } from './app.po';

describe('law-man-web App', function() {
  let page: LawManWebPage;

  beforeEach(() => {
    page = new LawManWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
