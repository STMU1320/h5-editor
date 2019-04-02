import  * as React from 'react';
import * as styles from './style.less';
export interface PageProps {
  children?: React.ReactNode;
  backgroundColor?: string;
  color?: string;
}
export default function Page (props: PageProps) {
  let { children, backgroundColor = 'white', color = '#666' } = props;
  return <div className={styles.pageWrap} style={{ backgroundColor, color }}>
    { children }
  </div>
}