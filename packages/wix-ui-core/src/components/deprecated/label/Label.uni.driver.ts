import {
  BaseUniDriver,
  baseUniDriverFactory
} from 'wix-ui-test-utils/base-driver';
import {UniDriver} from 'unidriver';
import { StylableUnidriverUtil } from '../../../../test/StylableUnidriverUtil';
import styles from './Label.st.css';
import {ReactBase} from '../../../../test/utils/unidriver';

export interface LabelDriver extends BaseUniDriver {
  /** get the label's text */
  getLabelText: ()=> Promise<string>;
  /** get the id of the component */
  getId: ()=> Promise<string>;
  /** get the "for" attribute of the component */
  getForAttribute: () => Promise<string>;
  /** returns true if the label is in ellipsis state */
  hasEllipsis: () => Promise<boolean>;
   /** true if disabled */
  isDisabled: () => Promise<boolean>;
  /** send key down on the label */
  keyDown: (key) => Promise<void>;
}

export const labelUniDriverFactory = (base: UniDriver): LabelDriver => {
  const stylableUnidriverUtil = new StylableUnidriverUtil(styles);
  const reactBase = ReactBase(base);

  return {
    ...baseUniDriverFactory(base),
    /** Get label's text content */
    getLabelText: () => base.text(),
    /** Get 'id' HTML attribute */
    getId: () => base.attr('id'),
    /** Get 'for' HTML attribute */
    getForAttribute: () => base.attr('for'),
    /** Is ellipsis showing (...) */
    hasEllipsis: () => stylableUnidriverUtil.hasStyleState(base, 'ellipsis'),
    /** Is the label disabled */
    isDisabled: () => stylableUnidriverUtil.hasStyleState(base, 'disabled'),
    /** 
     * Key press action
     * @ReactDOMOnly
     */
    keyDown: key => reactBase.pressKey(key),
  }
};
