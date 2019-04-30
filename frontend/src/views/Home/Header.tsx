import * as React from 'react';
import classnames from 'classnames';
import Button from 'components/Button';
import browserHistory from '../routeHistory';
import * as styles from './style.less';

export interface HeaderProps {
}

export default function Header ({  }: HeaderProps) {
  const handleCreate = () => {
    browserHistory.push('/editor');
  }
  return <div className={styles.header}>
      <div className={styles.logo}>H</div>
      <div className={styles.right}>
        <Button className={styles.rightItem} type="primary" onClick={handleCreate}>创建</Button>
      </div>
  </div>
}