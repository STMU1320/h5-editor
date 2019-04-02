import  * as React from 'react';
import classnames from 'classnames';
import * as styles from './style.less';
export interface PhoneModelProps {
  children?: JSX.Element | String;
  zoom?: number;
  title?: String;
  showHeader?: boolean
}
export default function PhoneModel (props: PhoneModelProps) {
  const { children, zoom = 1, title, showHeader } = props;
  const DESIGN_WIDTH = 750;
  const DESIGN_HEIGHT = showHeader ? 1334 : 1206;
  const style = { transform: `scale(${zoom})` };
  const wrapStyle = {
    width: `${DESIGN_WIDTH * zoom}px`,
    height: `${DESIGN_HEIGHT * zoom}px`
  };
  return <div className={styles.modelWrap} style={wrapStyle}>
    <div className={styles.phoneModel} style={style}>
      {
        showHeader && <header className={styles.status}>
          { title }
        </header>
      }
      <div className={styles.phoneContent}>
        { children }
      </div>
    </div>
  </div>
}