import  * as React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import * as styles from './style.less';

import { ElementProps } from '../Page';

export interface AssistBoxProps {
  dispatch?: Function;
  eleData: ElementProps;
  showBox?: boolean;
  zoom?: number;
  onEditElement?: Function;
  children: React.ReactElement;
}

interface AssistBoxState {
  assistBoxVisible: boolean;
  startPoint: {};
  currentPoint: {};
  draw: boolean;
  boxHeight: number;
  boxWidth: number;
}

class AssistBox extends React.PureComponent<AssistBoxProps, AssistBoxState> {

  state = {
    assistBoxVisible: false,
    startPoint: { x: 0, y: 0 },
    currentPoint: { x: 0, y: 0 },
    draw: false,
    boxWidth: 0,
    boxHeight: 0
  }

  assitBox: HTMLDivElement = null

  getDrawBoxStyle = () => {
    const { zoom = 1 } = this.props;
    const { startPoint, currentPoint, draw, boxHeight, boxWidth } = this.state;
    if (!draw) {
      return {}
    }
    const x1 = startPoint.x, x2 = currentPoint.x;
    const y1 = startPoint.y, y2 = currentPoint.y;
    const left = x2 - x1;
    const top = y2 - y1;

    const translate = (num: number) => Math.round(num / zoom);
    return {
      left: translate(left), 
      top: translate(top),
      width: translate(boxWidth),
      height: translate(boxHeight)
    };
  }

  handleMouseEnter =  () => {
    this.setState({ assistBoxVisible: true });
  }

  handleMouseLeave = () => {
    this.setState({ assistBoxVisible: false });
  }

  handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    const { eleData, dispatch } = this.props;
    const { draw } = this.state;
    dispatch({ type: 'editor/selectElement', payload: { element: eleData } });
    if (!draw) {
      const box = this.assitBox.getBoundingClientRect();
      const point = {
        x: e.clientX,
        y: e.clientY
      }
      this.setState({
        draw: true,
        startPoint: { ...point },
        currentPoint: { ...point },
        boxHeight: box.height,
        boxWidth: box.width
      });
      document.body.addEventListener('mousemove', this.handleDocmentMouseMove);
      document.body.addEventListener('mouseup', this.handleDocmentMouseUp);
    }
  }

  handleDocmentMouseMove = (e: MouseEvent) => {
    const { draw } = this.state;
    if (draw) {
      this.setState({
        currentPoint: {
          x: e.clientX,
          y: e.clientY
        }
      });
    }
  }

  handleDocmentMouseUp = (e: MouseEvent) => {
    const { eleData, onEditElement } = this.props;
    const diff = this.getDrawBoxStyle();
    if (diff.left || diff.top) {
      const nextEleData = { ...eleData };
      if (eleData.position === 'static') {
        nextEleData.position = 'relative';
      }
      nextEleData.top += diff.top;
      nextEleData.left += diff.left;
      onEditElement && onEditElement(nextEleData);
    }
    this.setState({ 
      draw: false,
    });
    document.body.removeEventListener('mousemove', this.handleDocmentMouseMove);
    document.body.removeEventListener('mouseup', this.handleDocmentMouseUp);
  }

  render () {
    const { assistBoxVisible } = this.state;
    const { children, eleData, showBox } = this.props;
    let { position, ...defaultStyle }  = eleData;
    switch (position) {
      case 'static':
      case 'relative':
        position = 'relative';
        break;
      case 'fixed':
      case 'absolute':
        position = 'absolute';
        break;
      default:
        position = 'relative';
        break;
    }
    const style: React.CSSProperties = {...defaultStyle, position};
    const boxStyle = this.getDrawBoxStyle();

    const renderChildren = (children: React.ReactElement) => {
      return React.Children.map(children, child => {
        return React.cloneElement(child, {
          position: 'static'
        })
      })
      
    }
    return <div
      className={styles.assistBox} 
      style={style}
      onMouseEnter={this.handleMouseEnter}
      onMouseLeave={this.handleMouseLeave}
      onMouseDown={this.handleMouseDown}
      >
        <div ref={(ele) => this.assitBox = ele} className={classnames(styles.borderBox, { [styles.showBox]: showBox || assistBoxVisible })} style={boxStyle}></div>
        { renderChildren(children) }
    </div>
  }
}

export default connect()(AssistBox);