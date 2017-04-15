import { Angular2ClinetsideImagePage } from './app.po';

describe('angular2-clinetside-image App', () => {
  let page: Angular2ClinetsideImagePage;

  beforeEach(() => {
    page = new Angular2ClinetsideImagePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
