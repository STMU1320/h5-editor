import  * as React from 'react';
import classnames from 'classnames';
import * as styles from './style.less';
export interface TextProps {
  content: string;
  visible?: boolean;
  name?: string;
  position?: 'absolute' | 'relative' | 'fixed' | 'static';
  left?: number;
  top?: number;
  width?: number;
  height?: number;
  lineHeight?: number | string;
  paddingLeft?: number;
  paddingTop?: number;
  paddingRight?: number;
  paddingBottom?: number;
  marginLeft?: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  backgroundColor?: string;
  color?: string;
  fontSize?: number;
  zIndex?:number;
}
export default function Text (props: TextProps) {
  let { content = '', ...style } = props;
  let renderContent = {
    __html: content.replace(/\n|\\n/g, '<br>')
  }
  return <div className={classnames(styles.textWrap)} dangerouslySetInnerHTML={renderContent} style={style}></div>
}