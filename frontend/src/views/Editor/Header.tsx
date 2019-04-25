import * as React from 'react';
import QRCode from 'qrcode.react';
import Button from 'components/Button';
import Icon from 'components/Icon';
import * as styles from './style.less';

export interface HeaderProps {
  onPreview: React.MouseEventHandler<HTMLButtonElement>;
  onPublish: React.MouseEventHandler<HTMLButtonElement>;
  togglePreviewVisible?: any;
  preLoading?: boolean;
  pubLoading?: boolean;
  previewVisible?: boolean;
  qrValue?: string;
}

export default function Header ({ onPreview, onPublish, preLoading, pubLoading, previewVisible, qrValue, togglePreviewVisible }: HeaderProps) {
  
  const handleEnter = () => {
    qrValue && togglePreviewVisible && togglePreviewVisible(true);
  }

  const handleLeave = () => {
    qrValue && togglePreviewVisible && togglePreviewVisible(false);
  }
  
  return <div className={styles.header}>
      <div className={styles.logo}>H</div>
      <div className={styles.right}>
      {
          previewVisible &&
          <div className={styles.previewQr}>
            {qrValue && <QRCode value={qrValue}></QRCode>}
            <p className={styles.qrTip}>扫描上方二维码预览<br/>有效时间10分钟</p>
          </div>
        }
        <Icon className={styles.rightItem} type="undo" disabled ></Icon>
        <Icon className={styles.rightItem} type="redo" disabled ></Icon>
        <Button className={styles.rightItem} type="primary"  onMouseLeave={handleLeave} onMouseEnter={handleEnter} loading={preLoading} onClick={onPreview}>预览</Button>
        <Button className={styles.rightItem} loading={pubLoading} onClick={onPublish}>发布</Button>
      </div>
  </div>
}