import * as React from 'react';
import classnames from 'classnames';
import * as styles from './style.less';

export interface IconProps {
  type: String;
  className?: String;
  disabled?: Boolean;
  onClick?: Function;
}

export default function Icon ({ type, className, disabled, onClick }: IconProps) {
  const handleClick = (e: React.MouseEvent) => {
    if (!disabled) {
      onClick && onClick(e);
    }
  }
  // return <svg onClick={handleClick} className={classnames('h5-editor-icon', className, styles.icon, { [styles.disabled]: disabled })} aria-hidden="true">
  //   <use xlinkHref={`#h5-editor-icon${type}`}></use>
  // </svg>
  return <i onClick={handleClick} className={classnames('iconfont',`h5-editor-icon${type}`, className, styles.icon, { [styles.disabled]: disabled })} aria-hidden="true"></i>
}