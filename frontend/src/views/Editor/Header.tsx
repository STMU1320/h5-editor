import * as React from 'react';
import Button from 'components/Button';
import Icon from 'components/Icon';
import * as styles from './style.less';

export interface HeaderProps {
  onPreview: React.MouseEventHandler<HTMLButtonElement>;
  onPublish: React.MouseEventHandler<HTMLButtonElement>;
  preLoading?: boolean;
  pubLoading?: boolean;
}

export default function Header ({ onPreview, onPublish, preLoading, pubLoading }: HeaderProps) {
  
  return <div className={styles.header}>
      <div className={styles.logo}>H</div>
      <div className={styles.right}>
        <Icon className={styles.rightItem} type="undo" disabled ></Icon>
        <Icon className={styles.rightItem} type="redo" disabled ></Icon>
        <Button className={styles.rightItem} type="primary" loading={preLoading} onClick={onPreview}>预览</Button>
        <Button className={styles.rightItem} loading={pubLoading} onClick={onPublish}>发布</Button>
      </div>
  </div>
}