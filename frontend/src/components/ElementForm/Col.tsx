import * as React from 'react';
import classnames from 'classnames';
import * as styles from './style.less';

export interface ColProps {
  className?: String;
  style?: React.CSSProperties;
  label?: string;
  labelWidth?: number;
  children?: React.ReactNode;
}

export default function Col ({
  className,
  children,
  label,
  labelWidth,
  style }: ColProps) {

  const styleObj = {...style};
  if (labelWidth) {
    styleObj.width = `${labelWidth}px`;
  }
  return <div className={classnames(styles.inputCol, className)} style={style} >
    {label && <span className={styles.colLabel} style={styleObj}>{label}:</span>}
    <div className={styles.colContent}>
      {children}
    </div>
  </div>
}