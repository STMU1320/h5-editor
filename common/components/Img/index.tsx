import  * as React from 'react';
import classnames from 'classnames';
import * as styles from './style.less';
export interface ImgProps {
  src: string;
  visible?: boolean;
  name?: string;
  position?: 'absolute' | 'relative' | 'fixed' | 'static';
  left?: number;
  top?: number;
  width?: number;
  height?: number;
  zIndex?:number;
  marginLeft?: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
}
export default function Img (props: ImgProps) {
  let { src = '', ...style } = props;
  return <img className={classnames(styles.imgCpt)} alt="picture" src={src} style={style}></img>
}