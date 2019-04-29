import React from 'react';
import classnames from 'classnames';



import * as styles from './style.less';
import Img from '../../../../common/components/Img';
import Text from '../../../../common/components/Text';
import Btn from '../../../../common/components/Btn';
import Page, { PageProps, ElementProps } from '../../../../common/components/Page';
import AssistBox from '../AssistBox';

export interface PaintingPageProps extends PageProps {
  onAddElement: Function;
  onEditElement: Function;
  selectedElement: string;
  zoom: number;
}

export default class PaintingPage extends React.PureComponent<PaintingPageProps, {}> {

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
    const { uuid, onAddElement } = this.props;
    const { draw } = this.state;
    if (draw) {
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
    const {  onAddElement, uuid } = this.props;
    onAddElement && onAddElement(uuid);
  }

  renderElement = (eleData: ElementProps): React.ReactNode => {
    const { zoom, onEditElement } = this.props;
    let type = eleData && eleData.type;
    let Ele: React.ReactElement = null;
    switch (type) {
      case 'img':
        Ele = <Img key={eleData.uuid} {...eleData}></Img>
        break;
      case 'text':
        Ele = <Text key={eleData.uuid} {...eleData}></Text>
        break;
      case 'btn':
        Ele = <Btn key={eleData.uuid} {...eleData}></Btn>
        break;
    }

    return <AssistBox zoom={zoom} onEditElement={onEditElement} key={eleData.uuid} eleData={eleData}>
      {Ele}
    </AssistBox>
  }

  render () {
    let {
      onEditElement,
      zoom,
      ...pageProps
    } = this.props;
    const { draw } = this.state;
    let drawBoxStyle = { left: 0, top: 0, width: 0, height: 0 };
    if (draw) {
      drawBoxStyle = this.getDrawBoxStyle();
    }

    return <div
      className={classnames(styles.paintingWrap, styles.noSelect)} 
      onMouseDown={this.handleMouseDown}
      onMouseMove={this.handleMouseMove}
      onMouseUp={this.handleMouseUp}
      onMouseLeave={this.handleMouseUp}
      onDoubleClick={this.handlePageDbClick}
      >
        {
          draw && drawBoxStyle.width && drawBoxStyle.height ? <div className={styles.drawBox} style={drawBoxStyle}></div> : ''
        }
        <Page {...pageProps} renderElement={this.renderElement}></Page>
    </div>
  }
}