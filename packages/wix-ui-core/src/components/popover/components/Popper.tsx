import * as React from 'react';
import classNames from 'classnames';

import { Loadable } from '../../loadable';
import Arrow from './Arrow';

import { getModifiers } from '../utils/getModifiers';
import styles from '../Popover.st.css';

const isTestEnv = process.env.NODE_ENV === 'test';

class LoadablePopper extends Loadable<{
  Popper: React.ComponentType<any>;
}> {}

const Popper = (props: any) => {
  const {
    placement,
    zIndex,
    maxWidth,
    showArrow,
    contentHook,
    moveArrowTo,
    customArrow,
    grabScheduleUpdater,
    children,
    id,
    role,
    shouldLoadComponent,
  } = props;

  const modifiers = getModifiers(props);

  return (
    <LoadablePopper
      loader={{
        Popper: () =>
          process.env.NODE_ENV === 'test'
            ? require('react-popper')
            : import('react-popper'),
      }}
      defaultComponent={<div />}
      namedExports={{ Popper: 'Popper' }}
      shouldLoadComponent={shouldLoadComponent}
    >
      {({ Popper: ReactPopper }) => (
        <ReactPopper modifiers={modifiers} placement={placement}>
          {({
            ref,
            style,
            placement: popperPlacement,
            arrowProps,
            scheduleUpdate,
          }) => {
            grabScheduleUpdater(scheduleUpdate);
            return (
              <div
                ref={ref}
                data-hook="popover-content"
                data-content-element={contentHook}
                style={{ ...style, zIndex, maxWidth }}
                data-placement={popperPlacement || placement}
                className={classNames(styles.popover, {
                  [styles.withArrow]: showArrow,
                  [styles.popoverContent]: !showArrow,
                })}
              >
                {showArrow && (
                  <Arrow
                    arrowProps={arrowProps}
                    moveArrowTo={moveArrowTo}
                    placement={popperPlacement || placement}
                    customArrow={customArrow}
                  />
                )}
                <div
                  key="popover-content"
                  id={id}
                  role={role}
                  className={showArrow ? styles.popoverContent : ''}
                >
                  {children}
                </div>
              </div>
            );
          }}
        </ReactPopper>
      )}
    </LoadablePopper>
  );
};

export default Popper;