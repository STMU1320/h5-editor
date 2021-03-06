import * as React from 'react';
import { Input, Form, InputNumber } from 'antd';
import ColorInput from '../ColorInput';
import Row from './Row';
import Col from './Col';
import CommonForm from './CommonForm';
import { TextProps } from '../../../../common/components/Text';

const Item = Form.Item;
const TextArea = Input.TextArea;

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
          <InputNumber onChange={handleFieldChange.bind(this, 'paddingBottom')} value={data.paddingBottom} placeholder="px"></InputNumber>
        </Col>
      </Row>
    </Item>
    <CommonForm data={data} handleFieldChange={handleFieldChange}></CommonForm>
  </Form>
}