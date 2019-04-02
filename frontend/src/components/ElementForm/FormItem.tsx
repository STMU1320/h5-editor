import * as React from 'react';
import classnames from 'classnames';
import * as styles from './style.less';

export interface FormProps {
  className?: String;
  style?: React.CSSProperties
  children?: React.ReactNode;
  label?: string;
  name?: string;
  labelWidth?:number;
}

export default function Form ({
  className,
  children,
  label,
  labelWidth,
  style }: FormProps) {
  return <div className={classnames(styles.formItem, className)} style={style} >
    <label className={styles.label} htmlFor={`${name}-input`}></label>
    {children}
  </div>
}