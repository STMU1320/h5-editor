import * as React from 'react';
import { Input, Form, InputNumber, Select } from 'antd';
import FileUploader from '../FileUploader';
import Row from './Row';
import Col from './Col';
import ColorInput from '../ColorInput';
import CommonForm from './CommonForm';
import { BtnProps } from '../../../../common/components/Btn';

import { PagesOptions } from './index';
const Item = Form.Item;
const Option = Select.Option;

export interface BtnFormProps {
  pages?: Array<PagesOptions>;
  name?: string;
  data?: BtnProps;
  onChange?: Function;
}

export default function BtnForm ({
  data = {},
  pages = [],
  onChange,
  }: BtnFormProps) {

    const handleFieldChange = function (key: string, e: React.FormEvent | string) {
      let value: any = '';
      if (['string', 'number'].includes(typeof e)) {
        value = e;
      } else {
        value = ((e as React.FormEvent).target as HTMLInputElement).value
      }
      const next = { ...data, [key]: value };
      if (key === 'actionType') {
        next.action = '';
      }
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

    const positionDisabled = !data.position || data.position === 'static';
    let actionLabel = '动作参数';
    switch (data.actionType) {
      case 0:
        actionLabel = '页面名称'
        break;
      case 1:
        actionLabel = '链接地址'
        break;
    }

  return <Form layout="vertical" className="element-editor-form">
    <Item
      label="按钮文字"
    >
      <Row>
        <Col label="文字内容">
          <Input onChange={handleFieldChange.bind(this, 'text')} autoFocus value={data.text} placeholder="不操过15个字符"></Input>
        </Col>
      </Row>
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
    </Item>
    <Item
      label="按钮动作"
    >
      <Row>
        <Col label="动作类型">
          <Select dropdownClassName="editor-select" value={data.actionType} style={{ width: '100%' }} placeholder="选择动作类型" onChange={handleFieldChange.bind(this, 'actionType')}>
            {/* 动作类型需提取到公用的枚举 */}
            <Option value={0}>跳转页面</Option>
            <Option value={1}>打开第三方链接</Option>
            <Option value={2} disabled>发送API请求</Option>
            <Option value={3} disabled>切换元素显示</Option>
          </Select>
        </Col>
      </Row>
      <Row>
        <Col label={actionLabel}>
          {
            data.actionType === 0
            ? <Select dropdownClassName="editor-select" value={data.action} style={{ width: '100%' }} placeholder="选择跳转页面" onChange={handleFieldChange.bind(this, 'action')}>
                {
                  pages.map((item: PagesOptions) => <Option key={item.value} value={item.value}>{item.label}</Option>)
                }
              </Select>
            : <Input onChange={handleFieldChange.bind(this, 'action')} value={data.action} placeholder="请输入完整链接"></Input>
          }
        </Col>
      </Row>
    </Item>
    <Item
      label="背景样式和颜色"
    >
      <Row>
        <Input onChange={handleFieldChange.bind(this, 'bgImg')} value={data.bgImg} placeholder="背景图片"></Input>
      </Row>
      <Row>
        <FileUploader accept="image" onSuccess={handleImgUpload} ></FileUploader>
      </Row>
      <Row>
        <ColorInput onChange={handleFieldChange.bind(this, 'backgroundColor')} value={data.backgroundColor} placeholder="背景颜色"></ColorInput>
      </Row>
    </Item>
    <CommonForm data={data} handleFieldChange={handleFieldChange}></CommonForm>
  </Form>
}