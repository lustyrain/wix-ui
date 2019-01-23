import {
  BaseUniDriver,
  baseUniDriverFactory
} from 'wix-ui-test-utils/base-driver';
import { UniDriver } from 'unidriver';

export interface ButtonNextDriver extends BaseUniDriver {
  /** returns button text */
  getButtonTextContent: () => Promise<string>;
  /** returns true if button disabled */
  isButtonDisabled: () => Promise<boolean>;
}

export const buttonNextDriverFactory = (base: UniDriver): ButtonNextDriver => {
  return {
    ...baseUniDriverFactory(base),
    getButtonTextContent: async () => await base.text(),
    isButtonDisabled: async () => {
      console.log(`await base.attr('disabled') === '' : `, await base.attr('disabled') === '');
      console.log(`await base.getNative()).getAttribute('disabled') === null: `, (await base.getNative()).getAttribute('disabled') === null);
      return await base.attr('disabled') !== null
    }
  };
};
