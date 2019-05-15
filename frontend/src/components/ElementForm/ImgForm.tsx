import * as React from 'react';
import { Input, Form } from 'antd';
import FileUploader from '../FileUploader';
import Row from './Row';
import CommonForm from './CommonForm';
import { ImgProps } from '../../../../common/components/Img';
const Item = Form.Item;

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
      let data = res.url || res.data;
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
        <FileUploader action="/upload/img" name="img" accept="image" showName={false} onSuccess={handleImgUpload} ></FileUploader>
      </Row>
    </Item>
    <CommonForm data={data} handleFieldChange={handleFieldChange}></CommonForm>
  </Form>
}