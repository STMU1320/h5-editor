import * as React from 'react';
import classnames from 'classnames';
import { Input, Form, InputNumber, Select } from 'antd';
import ColorInput from '../ColorInput';
import Row from './Row';
import Col from './Col';
import { TextProps } from '../../../../common/components/Text';

const Item = Form.Item;
const TextArea = Input.TextArea;
const Option = Select.Option;

export interface TextFormProps {
  name?: string;
  data?: TextProps;
  onChange?: Function;
}

export default function TextForm ({
  data = { content: '' },
  onChange,
  }: TextFormProps) {

    const handleFieldChange = function (key: string, e: React.FormEvent) {
      let value: any = '';
      if (['string', 'number'].includes(typeof e)) {
        value = e;
      } else {
        value = (e.target as HTMLInputElement).value
      }
      const next = { ...data, [key]: value };
      onChange && onChange(next);
    };

    const positionDisabled = !data.position || data.position === 'static';

  return <Form layout="vertical" className="element-editor-form">
    <Item
      label="文本内容"
    >
      <TextArea autoFocus onChange={handleFieldChange.bind(this, 'content')} rows={5} value={data.content} placeholder="请输入文本框内容"></TextArea>
    </Item>
    <Item
      label="颜色字号"
    >
      <Row>
        <Col label="字体大小">
          <InputNumber style={{ width: '100%' }} onChange={handleFieldChange.bind(this, 'fontSize')} value={data.fontSize} placeholder="px"></InputNumber>
        </Col>
      </Row>
      <Row>
        <Col label="字体颜色">
          <ColorInput placeholder="色值" onChange={handleFieldChange.bind(this, 'color')} value={data.color} defaultValue="#666666"></ColorInput>
        </Col>
      </Row>
      <Row>
        <Col label="文本行高">
          <Input onChange={handleFieldChange.bind(this, 'lineHeight')} value={data.lineHeight} placeholder="px"></Input>
        </Col>
      </Row>
      <Row>
        <Col label="背景颜色">
          <ColorInput onChange={handleFieldChange.bind(this, 'backgroundColor')} value={data.backgroundColor} placeholder="色值" ></ColorInput>
        </Col>
      </Row>
    </Item>
    <Item
      label="位置尺寸"
    >
      <Row>
        <Col label="P">
          <Select dropdownClassName="editor-select" value={data.position} style={{ width: 220 }} placeholder="定位方式" onChange={handleFieldChange.bind(this, 'position')}>
            <Option value="static">跟随文档</Option>
            <Option value="fixed">脱离文档</Option>
            <Option value="absolute">绝对定位</Option>
            <Option value="relative">相对定位</Option>
          </Select>
        </Col>
      </Row>
      <Row>
        <Col label="Z">
          <InputNumber disabled={positionDisabled} onChange={handleFieldChange.bind(this, 'zIndex')} style={{ width: '220px' }} value={data.zIndex} placeholder="显示层级"></InputNumber>
        </Col>
      </Row>
      <Row>
        <Col labelWidth={15} label="X">
          <InputNumber disabled={positionDisabled} onChange={handleFieldChange.bind(this, 'left')} value={data.left} placeholder="px"></InputNumber>
        </Col>
        <Col labelWidth={15} label="Y">
          <InputNumber disabled={positionDisabled} onChange={handleFieldChange.bind(this, 'top')} value={data.top} placeholder="px" ></InputNumber>
        </Col>
      </Row>
      <Row>
        <Col labelWidth={15} label="W">
          <InputNumber onChange={handleFieldChange.bind(this, 'width')} value={data.width} placeholder="px"></InputNumber>
        </Col>
        <Col labelWidth={15} label="H">
          <InputNumber onChange={handleFieldChange.bind(this, 'height')} value={data.height} placeholder="px"></InputNumber>
        </Col>
      </Row>
    </Item>
    <Item
      label="文本边距"
    >
      <Row>
        <Col labelWidth={15} label="L">
          <InputNumber onChange={handleFieldChange.bind(this, 'paddingLeft')} value={data.paddingLeft} placeholder="px"></InputNumber>
        </Col>
        <Col labelWidth={15} label="T">
          <InputNumber onChange={handleFieldChange.bind(this, 'paddingTop')} value={data.paddingTop} placeholder="px"></InputNumber>
        </Col>
      </Row>
      <Row>
        <Col labelWidth={15} label="R">
          <InputNumber onChange={handleFieldChange.bind(this, 'paddingRight')} value={data.paddingRight} placeholder="px"></InputNumber>
        </Col>
        <Col labelWidth={15} label="B">
          <InputNumber onChange={handleFieldChange.bind(this, 'paddingButtom')} value={data.paddingButtom} placeholder="px"></InputNumber>
        </Col>
      </Row>
    </Item>
  </Form>
}