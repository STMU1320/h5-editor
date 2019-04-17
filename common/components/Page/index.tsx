import  * as React from 'react';
import classnames from 'classnames';
import * as styles from './style.less';
import Img, { ImgProps } from '../Img';
import Text, { TextProps } from '../Text';

export interface ElementProps extends TextProps, ImgProps {
  type: string;
  uuid: string;
};
export interface PageProps {
  uuid: string;
  elements?: Array<ElementProps>;
  backgroundColor?: string;
  bgImg?: string;
  color?: string;
  name?: string;
  renderElement?: Function;
}

export default class Page extends React.PureComponent<PageProps, {}> {

  static defaultProps = {
    backgroundColor: 'white',
    color: '#666'
  }

  renderElement = (eleData: ElementProps): React.ReactNode => {
    let type = eleData && eleData.type;
    let Ele: React.ReactElement = null;
    switch (type) {
      case 'img':
        Ele = <Img key={eleData.uuid} {...eleData}></Img>
        break;
      case 'text':
        Ele = <Text key={eleData.uuid} {...eleData}></Text>
        break;
    }
    return Ele;
  }

  render () {
    let {
      backgroundColor,
      color,
      bgImg,
      elements,
      renderElement
    } = this.props;
    let style: React.CSSProperties = { backgroundColor, color };
    if (bgImg) {
      style.backgroundImage = `url(${bgImg})`;
    }
    let childRender = renderElement || this.renderElement;
    return <div
      className={classnames(styles.pageWrap)} 
      style={style}
      >
        {
          elements && elements.map((item) => childRender(item))
        }
    </div>
  }
}