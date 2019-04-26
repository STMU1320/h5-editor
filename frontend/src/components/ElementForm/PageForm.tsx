import * as React from 'react';
import classnames from 'classnames';

import Input from 'antd/lib/input';
import Form from 'antd/lib/form';
import FileUploader from '../FileUploader';
import Row from './Row';
import ColorInput from '../ColorInput';
import { PageProps } from '../../../../common/components/Page';

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
        <Input onChange={handleFieldChange.bind(this, 'name')} value={data.name} placeholder="不操过15个字符"></Input>
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
  </Form>
}