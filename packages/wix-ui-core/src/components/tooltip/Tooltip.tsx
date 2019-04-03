import * as React from 'react';
import style from './Tooltip.st.css';
import { Popover, Placement, AppendTo } from '../popover';

export interface Point {
  x: number;
  y: number;
}

export interface TooltipProps {
  /** tooltip's placement in relation to the target element */
  placement?: Placement;
  /** children to render that will be the target of the tooltip */
  children?: React.ReactNode;
  /** the content to put inside the tooltip */
  content?: React.ReactNode;
  /** object that describes re-positioning of the tooltip */
  moveBy?: Point;
  /** offset for the arrow */
  moveArrowTo?: number;
  /** callback to call when the tooltip is shown */
  onShow?: Function;
  /** callback to call when the tooltip is being hidden */
  onHide?: Function;
  /** Enables calculations in relation to the parent element*/
  appendTo?: AppendTo;
  /** Provides callback to invoke when outside of tooltip is clicked */
  onClickOutside?: Function;
  /** If true, makes tooltip close when clicked outside (incase it was open) */
  shouldCloseOnClickOutside?: boolean;
  /** Animation timer */
  timeout?: number;
  /** If true, shows the tooltip arrow */
  showArrow?: boolean;
}

export interface TooltipState {
  isOpen: boolean;
}

/**
 * Tooltip
 */
export class Tooltip extends React.PureComponent<TooltipProps, TooltipState> {
  static displayName = 'Tooltip';

  static defaultProps: Partial<TooltipProps> = {
    placement: 'top',
    appendTo: 'parent',
    onShow: () => ({}),
    onHide: () => ({}),
    timeout: 150,
    showArrow: true,
  };

  state = { isOpen: false };

  _handleClickOutside = () => {
    const { onClickOutside, shouldCloseOnClickOutside } = this.props;
    if (shouldCloseOnClickOutside) {
      this.props.onHide();
      this.setState({ isOpen: false });
    }
    return onClickOutside ? onClickOutside() : null;
  };

  _renderElement = () => {
    const { children } = this.props;
    if (typeof children === 'string' || !children) {
      return children || '';
    }
    return React.cloneElement(children as any, {
      onFocus: this._onFocus,
      onBlur: this._onBlur,
    });
  };

  open = () => {
    this.props.onShow();
    this.setState({ isOpen: true });
  };

  close = () => {
    const { shouldCloseOnClickOutside } = this.props;
    if(!shouldCloseOnClickOutside) {
      this.props.onHide();
      this.setState({ isOpen: false });
    }
  };

  _onFocus = (event, handlers) => {
    const focusableHOC = handlers && handlers.focus;
    this.open();
    return focusableHOC ? handlers.focus() : null;
  };

  _onBlur = (event, handlers) => {
    const focusableHOC = handlers && handlers.blur;
    this.close();
    return focusableHOC ? handlers.blur() : null;
  };

  render() {
    const {
      placement,
      content,
      moveBy,
      timeout,
      showArrow,
      moveArrowTo,
      appendTo,
    } = this.props;

    return (
      <Popover
        {...style('root', {}, this.props)}
        placement={placement}
        shown={this.state.isOpen}
        showArrow={showArrow}
        onMouseEnter={this.open}
        onMouseLeave={this.close}
        timeout={timeout}
        moveBy={moveBy}
        moveArrowTo={moveArrowTo}
        appendTo={appendTo}
        onClickOutside={this._handleClickOutside}
      >
        <Popover.Element>{this._renderElement()}</Popover.Element>
        <Popover.Content>{content}</Popover.Content>
      </Popover>
    );
  }
}
