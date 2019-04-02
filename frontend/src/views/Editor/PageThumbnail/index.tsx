import * as React from 'react';
import classnames from 'classnames';

import * as styles from './page.less';

export interface OnePageProps {
  name: String;
  className?: string;
  checked?: boolean;
  onClick?: React.MouseEventHandler;
  children: JSX.Element | string;
}

export default function OnePage (props: OnePageProps) {
  const { onClick, name, checked, className, children } = props;
  return <div onClick={onClick} className={classnames(styles.pageBox, className, { [styles.checked]: checked })}>
    <h5 className={styles.pageName}>{name}</h5>
    <div className={styles.thumbnail}>
      {children}
    </div>
  </div>
}