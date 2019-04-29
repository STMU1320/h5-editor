import * as React from 'react';
import classnames from 'classnames';
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
        <Icon className={classnames(styles.rightItem, styles.headerIcon)} type="undo" disabled antd ></Icon>
        <Icon className={classnames(styles.rightItem, styles.headerIcon)} type="redo" disabled antd></Icon>
        <Button className={styles.rightItem} type="primary" loading={preLoading} onClick={onPreview}>预览</Button>
        <Button className={styles.rightItem} loading={pubLoading} onClick={onPublish}>发布</Button>
      </div>
  </div>
}