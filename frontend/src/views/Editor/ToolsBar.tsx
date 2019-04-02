import * as React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import Icon from 'components/Icon';
import { ICON_BTNS } from 'utils/config';

import * as styles from './style.less';

interface IconBtnProps {
  type: String;
  value: String;
  checked?: Boolean;
  onClick?: Function;
}

function IconBtn ({ type, checked, onClick, value }: IconBtnProps) {
  const handleClick = () => {
    onClick && onClick(value);
  }
  return <div onClick={handleClick} className={classnames(styles.iconBtn, { [styles.checked]: checked })}>
    <Icon type={type}></Icon>
  </div>
}

export interface ToolsBarProps {
  onElementTypeChange?: Function;
  checkedEle?: String;
  dispatch?: Function;
}

class Tools extends React.Component<ToolsBarProps, {}> {

  handleIconClick = (value: String) => {
    if (this.props.checkedEle !== value) {
      const { dispatch } = this.props;
      dispatch({ type: 'editor/save', payload: { checkedEle: value } });
    }
  }
  render () {
    const { checkedEle } = this.props;
    return <div className={styles.toolsBar}>
          <div className={classnames(styles.toolsGroup, styles.eleGroup)}>
            {
              Object.values(ICON_BTNS).map((item: string) => (
                <IconBtn type={item} onClick={this.handleIconClick} key={item} value={item} checked={checkedEle === item} />
              ))
            }
          </div>
    </div>
  }
}

export default connect((state: any) => ({ ...state.editor }))(Tools)