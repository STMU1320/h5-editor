import  * as React from 'react';
import classnames from 'classnames';
import * as styles from './style.less';
import { number } from 'prop-types';
export interface ImgProps {
  src: string;
  position?: 'absolute' | 'relative' | 'fixed' | 'static';
  left?: number;
  top?: number;
  width?: number;
  height?: number;
  zIndex?:number;
}
export default function Img (props: ImgProps) {
  let { src = '', ...style } = props;
  return <img className={classnames(styles.imgCpt)} alt="picture" src={src} style={style}></img>
}