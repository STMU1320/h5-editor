import * as React from 'react';
import classnames from 'classnames';
import * as styles from './style.less';
import AntIcon from 'antd/lib/icon';

export interface IconProps {
  type: string;
  className?: string;
  disabled?: Boolean;
  onClick?: Function;
  antd?: boolean;
}

export default function Icon ({ type, className, disabled, onClick, antd }: IconProps) {
  const handleClick = (e: React.MouseEvent) => {
    if (!disabled) {
      onClick && onClick(e);
    }
  }
  // return <svg onClick={handleClick} className={classnames('h5-editor-icon', className, styles.icon, { [styles.disabled]: disabled })} aria-hidden="true">
  //   <use xlinkHref={`#h5-editor-icon${type}`}></use>
  // </svg>
  return antd ? <AntIcon type={type} onClick={handleClick} />
    : <i onClick={handleClick} className={classnames('iconfont',`h5-editor-icon${type}`, className, styles.icon, { [styles.disabled]: disabled })} aria-hidden="true"></i>
}