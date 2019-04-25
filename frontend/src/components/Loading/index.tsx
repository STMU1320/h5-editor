import  * as React from 'react';
import classnames from 'classnames';
import * as styles from './style.less';

export interface LoadingProps {
  className?: string;
}

export default function Loading ({ className }: any) {
  return <div className={classnames(styles.loading, className)}></div>
}