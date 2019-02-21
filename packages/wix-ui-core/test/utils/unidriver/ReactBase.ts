import { Simulate } from 'react-dom/test-utils';

/**
 * Temporary workaround for implementing missing Unidriver methods in React/DOM only.
 *
 * @param {UniDriver} base
 */
export function ReactBase(base) {
  const htmlElement = () => {
    if (base.type !== 'react') {
      throw new Error('Supported only in React/DOM.');
    }
    return base.getNative();
  };

  return {
    pressKey: async key => Simulate.keyDown(await htmlElement(), { key }),
    tagName: async () => (await htmlElement()).tagName,
    innerHtml: async () => (await htmlElement()).innerHTML,
    focus: async () => (await htmlElement()).focus(),
    blur: async () => (await htmlElement()).blur(),
  };
}
