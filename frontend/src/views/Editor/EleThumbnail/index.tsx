import * as React from 'react';
import classnames from 'classnames';
import { Icon } from 'antd';

import * as styles from './style.less';

export interface EleItemProps {
  name?: String;
  checked?: boolean;
  onClick: React.MouseEventHandler;
  eleData: any;
  onChange: Function;
}

interface EleItemState {
  isEdit: boolean;
  tempValue: string;
}

export default class EleItem extends React.PureComponent<EleItemProps, EleItemState> {
  state: EleItemState = { isEdit: false, tempValue: '' };
  input: HTMLInputElement;
  handleSetInputMode = () => {
    const { eleData } = this.props;
    this.setState({ isEdit: true, tempValue: eleData.name }, () => {
      this.input.focus();
    });
  }
  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    this.setState({ tempValue: value });
  }
  handleInputKeyUp = (e: React.KeyboardEvent) => {
    if (e.keyCode === 13) {
      this.changeEleName();
    }
  }
  handleInputBlur = () => {
    this.changeEleName();
  }

  changeEleName = () => {
    const { onChange, eleData } = this.props;
    const nextData = {...eleData};
    nextData.name = this.state.tempValue;
    this.setState({ tempValue: '', isEdit: false });
    onChange && onChange(nextData);
  }
  
  handleIconClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const { onChange, eleData, onClick } = this.props;
    const next = { ...eleData, visible: !eleData.visible };
    onChange && onChange(next);
  }
  handleItemClick = () => {
    const { onClick, eleData } = this.props;
    onClick({ ...eleData });
  }
  render () {
    const { eleData, checked } = this.props;
    const { isEdit, tempValue } = this.state;
    return <div className={classnames(styles.eleItemBox, { [styles.checked]: checked })} onClick={this.handleItemClick}>
      <Icon type="eye" theme="filled" onClick={this.handleIconClick} className={classnames({ [styles.eyeDisabled]: !eleData.visible })} />
      {
        isEdit
        ? <input ref={(ele: HTMLInputElement) => { this.input = ele }} className={ classnames(styles.eleName, styles.inputMode)} onKeyUp={this.handleInputKeyUp} onBlur={this.handleInputBlur} onChange={this.handleInputChange} type="text" value={tempValue}/>
        : <p className={styles.eleName} onDoubleClick={this.handleSetInputMode}>{eleData.name}</p>
      }
    </div>
  }
}