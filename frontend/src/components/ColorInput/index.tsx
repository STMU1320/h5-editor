import  * as React from 'react';
import Input from 'antd/lib/input';
import classnames from 'classnames';
import * as styles from './style.less';

export interface ColorInputProps {
  className?: string;
  style?: React.CSSProperties;
  onChange?: Function;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
}



export default class ColorInput extends React.PureComponent<ColorInputProps, {}> {
  state = {
    value: ''
  }

  static getDerivedStateFromProps (nextProps: ColorInputProps, preState: { value: string }) {
    if (nextProps.value !== preState.value) {
      return { value: nextProps.value };
    }

    return null;
  }

  handleChange = (e: React.FormEvent) => {
    const value = (e.target as HTMLInputElement ).value;
    const { onChange } = this.props;
    this.setState({ value });
    onChange && onChange(value);
  }

  render () {
    const { className, style, placeholder, defaultValue = '#ffffff' } = this.props;
    const { value } = this.state;
    return <div className={classnames(styles.colorInputWrap, className)} style={style}>
      <Input onChange={this.handleChange} value={value} placeholder={placeholder}></Input>
      <input className={styles.colorInput} type="color" onChange={this.handleChange} value={value || defaultValue }/>
    </div>
  }
}