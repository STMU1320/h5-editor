import * as React from 'react';
import classnames from 'classnames';

import { Input, Form, InputNumber } from 'antd';

import FileUploader from '../FileUploader';
import ColorInput from '../ColorInput';
import { PageProps } from '../../../../common/components/Page';
import Row from './Row';
import Col from './Col';
const Item = Form.Item;

export interface PageFormProps {
  data?: PageProps;
  onChange?: Function;
}

export default function PageForm ({
  data,
  onChange,
  }: PageFormProps) {

    const handleFieldChange = function (key: string, e: React.FormEvent | string) {
      let value: any = '';
      if (['string', 'number'].includes(typeof e)) {
        value = e;
      } else {
        value = ((e as React.FormEvent).target as HTMLInputElement).value
      }
      const next = { ...data, [key]: value };
      onChange && onChange(next);
    };

    const handleImgUpload = function (res: any) {
      let data = res.data;
      if (data instanceof File) {
        let reader = new FileReader();
        reader.readAsDataURL(data);
        reader.onload = function (e) {
          handleFieldChange('bgImg', reader.result as string);
        }
      } else {
        handleFieldChange('bgImg', data);
      }
    }


  return <Form layout="vertical" className="element-editor-form">
    <Item
      label="页面名称"
    >
      <Row>
        <Input autoFocus onChange={handleFieldChange.bind(this, 'name')} value={data.name} placeholder="不操过15个字符"></Input>
      </Row>
    </Item>
    <Item
      label="页面背景和颜色"
    >
      <Row>
        <Input onChange={handleFieldChange.bind(this, 'src')} value={data.bgImg} placeholder="背景图片"></Input>
      </Row>
      <Row>
        <FileUploader accept="image" onSuccess={handleImgUpload} ></FileUploader>
      </Row>
      <Row>
        <ColorInput onChange={handleFieldChange.bind(this, 'backgroundColor')} value={data.backgroundColor} placeholder="背景颜色：默认白色"></ColorInput>
      </Row>
      <Row>
        <ColorInput onChange={handleFieldChange.bind(this, 'color')} value={data.color} defaultValue="#666666" placeholder="文字颜色：默认#666666"></ColorInput>
      </Row>
    </Item>
    <Item
      label="页面高度"
    >
      <Row>
        <InputNumber className="width100" onChange={handleFieldChange.bind(this, 'height')} value={data.paddingLeft} placeholder="不设置为内容高度"></InputNumber>
      </Row>
    </Item>
    <Item
      label="页面内边距"
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
  </Form>
}