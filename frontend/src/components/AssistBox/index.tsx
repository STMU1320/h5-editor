import  * as React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import * as styles from './style.less';

import { ElementProps } from '../Page';

export interface AssistBoxProps {
  dispatch?: Function;
  eleData: ElementProps;
  showBox?: boolean;
  children: React.ReactElement;
}

interface AssistBoxState {}

class AssistBox extends React.PureComponent<AssistBoxProps, AssistBoxState> {

  state = {
    assistBoxVisible: false,
  }

  handleMouseEnter =  () => {
    this.setState({ assistBoxVisible: true });
  }

  handleMouseLeave = () => {
    this.setState({ assistBoxVisible: false });
  }

  handleClick = () => {
    const { eleData, dispatch } = this.props;
    dispatch({ type: 'editor/selectElement', payload: { element: eleData } });
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
      onClick={this.handleClick}
      >
        <div className={classnames(styles.borderBox, { [styles.showBox]: showBox || assistBoxVisible })} ></div>
        { renderChildren(children) }
    </div>
  }
}

export default connect()(AssistBox);