import * as React from 'react';
import { Form, InputNumber, Select } from 'antd';
import Row from './Row';
import Col from './Col';

const Item = Form.Item;
const Option = Select.Option;

export interface CommonFormProps {
  name?: string;
  data?: any;
  handleFieldChange?: Function;
}

export default function ConmonForm ({
  data = {},
  handleFieldChange,
  }: CommonFormProps) {
    const positionDisabled = !data.position || data.position === 'static';

  return <>
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
        <Col label="R">
          <InputNumber onChange={handleFieldChange.bind(this, 'radius')} style={{ width: '220px' }} value={data.radius} placeholder="圆角尺寸"></InputNumber>
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
      label="外边距"
    >
      <Row>
        <Col labelWidth={15} label="L">
          <InputNumber onChange={handleFieldChange.bind(this, 'marginLeft')} value={data.marginLeft} placeholder="px"></InputNumber>
        </Col>
        <Col labelWidth={15} label="T">
          <InputNumber onChange={handleFieldChange.bind(this, 'marginTop')} value={data.marginTop} placeholder="px"></InputNumber>
        </Col>
      </Row>
      <Row>
        <Col labelWidth={15} label="R">
          <InputNumber onChange={handleFieldChange.bind(this, 'marginRight')} value={data.marginRight} placeholder="px"></InputNumber>
        </Col>
        <Col labelWidth={15} label="B">
          <InputNumber onChange={handleFieldChange.bind(this, 'marginBottom')} value={data.marginBottom} placeholder="px"></InputNumber>
        </Col>
      </Row>
    </Item>  
  </>
}