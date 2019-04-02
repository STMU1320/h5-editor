import * as React from 'react';
import classnames from 'classnames';
import * as styles from './style.less';

export interface RowProps {
  className?: String;
  style?: React.CSSProperties
  children?: React.ReactNode;
}

export default function Row ({
  className,
  children,
  style }: RowProps) {
  return <div className={classnames(styles.inputRow, className)} style={style} >
    {children}
  </div>
}