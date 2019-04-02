import * as React from 'react';
import Button from 'components/Button';
import Icon from 'components/Icon';
import * as styles from './style.less';

export interface HeaderProps {
  onPreview: React.MouseEventHandler<HTMLButtonElement>;
  onPublish: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Header ({ onPreview, onPublish }: HeaderProps) {
  return <div className={styles.header}>
      <div className={styles.logo}>H</div>
      <div className={styles.right}>
        <Icon className={styles.rightItem} type="reply" disabled ></Icon>
        <Icon className={styles.rightItem} type="share" disabled ></Icon>
        <Button className={styles.rightItem} type="primary" onClick={onPreview}>预览</Button>
        <Button className={styles.rightItem} onClick={onPublish}>发布</Button>
      </div>
  </div>
}