import * as React from 'react';
import { Form, Input } from 'antd';
import FileUploader from 'components/FileUploader';
interface InfoFormProps {
  form?: any;
  defaultData?: { cover: string, name: string }
}

export default Form.create()(function ({ form, defaultData = { cover: '', name: '' } }: InfoFormProps) {
  const { getFieldDecorator } = form;
  return <Form labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}>
        <Form.Item
        label="封面"
      >
        {getFieldDecorator('cover', {
          initialValue: defaultData.cover,
        })(
          <FileUploader accept="image" showImg style={{ height: 200, width: 200 }}></FileUploader>
        )}
      </Form.Item>
      <Form.Item
        label="名称"
      >
        {getFieldDecorator('name', {
          initialValue: defaultData.name,
          rules: [{
            max: 15, message: '名称最多15个字符!',
          }, {
            required: true, message: '请输入名称!',
          }],
        })(
          <Input placeholder="最多15个字符" />
        )}
    </Form.Item>
  </Form>
}) as any;
