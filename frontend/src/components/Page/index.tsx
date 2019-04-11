import  * as React from 'react';
import classnames from 'classnames';
import * as styles from './style.less';
import Img, { ImgProps } from '../Img';
import Text, { TextProps } from '../Text';
import AssistBox from '../AssistBox';

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
  painting?: boolean;
  onAddElement?: Function;
  onEditElement?: Function;
  selectedElement?: string;
  zoom?: number;
}

const renderElement = (eleData: ElementProps, painting: boolean, selectedElement: string, zoom: number, onEditElement: Function): React.ReactNode => {
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

  if (painting) {
    return <AssistBox zoom={zoom} onEditElement={onEditElement} key={eleData.uuid} eleData={eleData} showBox={eleData.uuid === selectedElement}>
      {Ele}
    </AssistBox>
  }
  return Ele;
}

export default class Page extends React.PureComponent<PageProps, {}> {

  static defaultProps = {
    backgroundColor: 'white',
    color: '#666'
  }

  state = {
    draw: false,
    startPoint: { x: 0, y: 0 },
    currentPoint: { x: 0, y: 0 },
    pageX: 0,
    pageY: 0
  }

  getDrawBoxStyle = () => {
    const { zoom = 1 } = this.props;
    const { startPoint, currentPoint, pageX, pageY } = this.state;
    const x1 = startPoint.x, x2 = currentPoint.x;
    const y1 = startPoint.y, y2 = currentPoint.y;
    const width = Math.abs(x1 - x2);
    const height = Math.abs(y1 - y2);
    const left = Math.min(x1, x2) - pageX;
    const top = Math.min(y1, y2) - pageY;

    const translate = (num: number) => Math.round(num / zoom);
    return {
      width: translate(width),
      height: translate(height), 
      left: translate(left), 
      top: translate(top), 
    };
  }

  handleMouseDown = (e: React.MouseEvent) => {
    const { painting } = this.props;
    if (!painting) {
      return
    }
    const { draw } = this.state;
    const pageBox = (e.target as HTMLDivElement).getBoundingClientRect();
    let point = {
      x: e.clientX,
      y: e.clientY
    }
    if (!draw) {
      this.setState({
        draw: true,
        startPoint: {
          ...point
        },
        currentPoint: {
          ...point
        },
        pageX: pageBox.left,
        pageY: pageBox.top
      })
    }
  }

  handleMouseMove = (e: React.MouseEvent) => {
    const { painting } = this.props;
    if (!painting) {
      return
    }
    const { draw, startPoint } = this.state;
    if (draw) {
      this.setState({
        currentPoint: {
          x: e.clientX,
          y: e.clientY
        }
      });
    }
  }

  handleMouseUp = (e: React.MouseEvent) => {
    const { painting, uuid, onAddElement } = this.props;
    const { draw } = this.state;
    if (painting && draw) {
      this.setState({ 
        draw: false,
      });
      const style = {  ...this.getDrawBoxStyle(), position: 'absolute' };
      if (style.width && style.height) {
        onAddElement && onAddElement(uuid, style);
      }
    }
  }

  handlePageDbClick = () => {
    const {  onAddElement, uuid, painting } = this.props;
    if (painting && onAddElement) {
      onAddElement(uuid);
    }
  }

  render () {
    let {
      backgroundColor,
      color,
      bgImg,
      elements,
      painting,
      selectedElement,
      onEditElement,
      zoom
    } = this.props;
    const { draw, startPoint, currentPoint, pageX, pageY } = this.state;
    let style: React.CSSProperties = { backgroundColor, color };
    if (bgImg) {
      style.backgroundImage = `url(${bgImg})`;
    }

    let drawBoxStyle = { left: 0, top: 0, width: 0, height: 0 };
    if (draw) {
      drawBoxStyle = this.getDrawBoxStyle();
    }

    return <div
      className={classnames(styles.pageWrap, { [styles.noSelect]: painting })} 
      style={style}
      onMouseDown={this.handleMouseDown}
      onMouseMove={this.handleMouseMove}
      onMouseUp={this.handleMouseUp}
      onMouseLeave={this.handleMouseUp}
      onDoubleClick={this.handlePageDbClick}
      >
        {
          draw && drawBoxStyle.width && drawBoxStyle.height ? <div className={styles.drawBox} style={drawBoxStyle}></div> : ''
        }
        {
          elements && elements.map((item) => renderElement(item, painting, selectedElement, zoom, onEditElement))
        }
    </div>
  }
}