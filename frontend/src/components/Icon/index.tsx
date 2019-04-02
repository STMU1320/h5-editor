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
  return <i onClick={handleClick} className={classnames('fa',`fa-${type}`, className, { [styles.disabled]: disabled })} aria-hidden="true"></i>
}