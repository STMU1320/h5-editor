import  * as React from 'react';
import classnames from 'classnames';
import * as styles from './style.less';
export interface TextProps {
  content: string;
  position?: 'absolute' | 'relative' | 'fixed' | 'static';
  left?: number;
  top?: number;
  width?: number;
  height?: number;
  lineHeight?: number | string;
  paddingLeft?: number;
  paddingTop?: number;
  paddingRight?: number;
  paddingButtom?: number;
  backgroundColor?: string;
  color?: string;
  fontSize?: number;
  showBox?: boolean;
}
export default function Text (props: TextProps) {
  let { content = '', showBox, ...style } = props;
  let renderContent = {
    __html: content.replace(/\n|\\n/g, '<br>')
  }
  return <div className={classnames(styles.textWrap, { [styles.showBorder]: showBox })} dangerouslySetInnerHTML={renderContent} style={style}></div>
}