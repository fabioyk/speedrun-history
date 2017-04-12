import { SpeedrunHistoryPage } from './app.po';

describe('speedrun-history App', () => {
  let page: SpeedrunHistoryPage;

  beforeEach(() => {
    page = new SpeedrunHistoryPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
