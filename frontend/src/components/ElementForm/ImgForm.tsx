import * as React from 'react';
import classnames from 'classnames';

import Input from 'antd/lib/input';
import InputNumber from 'antd/lib/input-number';
import Form from 'antd/lib/form';
import Select from 'antd/lib/select';
import FileUploader from '../FileUploader';
import Row from './Row';
import Col from './Col';
import { ImgProps } from '../../../../common/components/Img';
const Item = Form.Item;
const Option = Select.Option;

export interface ImgFormProps {
  name?: string;
  data?: ImgProps;
  onChange?: Function;
}

export default function ImgForm ({
  data = { src: '' },
  onChange,
  }: ImgFormProps) {

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
          handleFieldChange('src', reader.result as string);
        }
      } else {
        handleFieldChange('src', data);
      }
    }

    const positionDisabled = !data.position || data.position === 'static';

  return <Form layout="vertical" className="element-editor-form">
    <Item
      label="图片地址"
    >
      <Row>
        <Input autoFocus onChange={handleFieldChange.bind(this, 'src')} value={data.src} placeholder="图片地址"></Input>
      </Row>
      <Row>
        <FileUploader accept="image" onSuccess={handleImgUpload} ></FileUploader>
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
  </Form>
}