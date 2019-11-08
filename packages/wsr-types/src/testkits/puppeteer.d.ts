declare module 'wix-style-react/dist/testkit/puppeteer' {
  import { Page } from 'puppeteer';

  type PuppeteerTestkitFactory<T> = (
    params: PuppeteerTestkitParams
  ) => Promise<T>;

  type PuppeteerUniTestkitFactory<T extends __WSRTests.BaseUniDriver> = (
    params: PuppeteerTestkitParams
  ) => Promise<T>;

  interface PuppeteerTestkitParams {
    dataHook: string;
    page: Page;
  }

  export const loaderTestkitFactory: PuppeteerUniTestkitFactory<
    __WSRTests.LoaderUniDriver
  >;
  export const textTestkitFactory: PuppeteerTestkitFactory<
    __WSRTests.TextPuppeteerDriver
  >;
  export const buttonTestkitFactory: PuppeteerUniTestkitFactory<
    __WSRTests.ButtonUniDriver
  >;
  export const textButtonTestkitFactory: PuppeteerUniTestkitFactory<
    __WSRTests.TextButtonUniDriver
  >;
  export const emptyStateTestkitFactory: PuppeteerUniTestkitFactory<
    __WSRTests.EmptyStateUniDriver
  >;
  export const headingTestkitFactory: PuppeteerTestkitFactory<
    __WSRTests.HeadingPuppeteerDriver
  >;
}