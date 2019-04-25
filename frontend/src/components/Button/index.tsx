import  * as React from 'react';
import classnames from 'classnames';
import * as styles from './style.less';

import Loading from '../Loading';

export interface ButtonProps {
  type?: ('primary' | 'danger' | 'success');
  children: JSX.Element | String;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLButtonElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLButtonElement>;
  className?: String;
  loading?: boolean;
}
export default function Button (props: ButtonProps) {
  const { children, onClick, type, className, loading, onMouseLeave, onMouseEnter } = props;
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    onClick && onClick(e);
  }
  return <button onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className={classnames(styles.button, type, className, { [styles.loading]: styles.loading })}>
    {loading && <Loading className={styles.btnLoading}></Loading>}
    {children}  
  </button>
}