import  * as React from 'react';
import classnames from 'classnames';
import * as styles from './style.less';
import { parseUrlParams, objToQueryString } from '../../utils'
export interface BtnProps {
  text?: string;
  backgroundColor?: string;
  bgImg?: string;
  color?: string;
  fontSize?: number;
  radius?: number;
  action?: string;
  actionType?: 0 | 1 | 2 | 3;
  position?: 'absolute' | 'relative' | 'fixed' | 'static';
  left?: number;
  top?: number;
  width?: number;
  height?: number;
  zIndex?:number;
  marginLeft?: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
}
export default class Btn extends React.PureComponent<BtnProps, {}> {
  static defaultProps = {
    actionType: 0,
  }
  handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const { actionType, action } = this.props;
    switch (actionType) {
      case 0:
        let paramsObj = parseUrlParams(location.href);
        paramsObj.pid = action;
        let nextPage = `${location.origin}${location.pathname}?${objToQueryString(paramsObj)}`;
        location.href = nextPage;
        break;
      case 1:
        location.href = action;
        break;
    }
  }
  render () {
    let {
      action,
      actionType,
      bgImg,
      radius,
      text,
      height,
      ...otherStyle
    } = this.props;
    let style: React.CSSProperties = { ...otherStyle };
    if (bgImg) {
      style.backgroundImage = `url(${bgImg})`;
    }
    if (radius) {
      style.borderRadius = radius;
    }
    if (height) {
      style.height = height;
      style.lineHeight = `${height}px`;
    }
    return <a
      className={styles.btnCpt}
      onClick={this.handleClick}
      style={style}>{text}</a>
  }
}