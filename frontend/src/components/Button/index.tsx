import  * as React from 'react';
import classnames from 'classnames';
import * as styles from './style.less';

export interface ButtonProps {
  type?: ('primary' | 'danger' | 'success');
  children: JSX.Element | String;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: String
}
export default function Button (props: ButtonProps) {
  const { children, onClick, type, className } = props;
  return <button onClick={onClick} className={classnames(styles.button, type, className)}>
    {children}  
  </button>
}