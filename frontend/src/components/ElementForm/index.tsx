import * as React from 'react';
import TextForm from './TextForm';
import ImgForm from './ImgForm';
import PageForm from './PageForm';
import BtnForm from './BtnForm';

import { TextProps } from '../../../../common/components/Text';
import { ImgProps } from '../../../../common/components/Img';
import { PageProps } from '../../../../common/components/Page';
import { BtnProps } from '../../../../common/components/Btn';

interface DataProps extends TextProps, ImgProps, PageProps, BtnProps {
  type: string
}

export interface PagesOptions {
  value: string;
  label: string;
}

export interface ElementFormProps {
  disabled?: Boolean;
  onChange?: Function;
  data: DataProps;
  pages?: Array<PagesOptions>
}

export default function ElementForm ({ disabled, onChange, data, pages }: ElementFormProps) {
  let form = <p style={{ textAlign: 'center' }}>无数据</p>;
  if (data) {
    switch (data.type) {
      case 'text':
        form = <TextForm onChange={onChange} data={data}></TextForm>;
        break;
      case 'img':
        form = <ImgForm onChange={onChange} data={data}></ImgForm>;
        break;
      case 'page':
        form = <PageForm onChange={onChange} data={data}></PageForm>;
        break;
      case 'btn':
        form = <BtnForm onChange={onChange} data={data} pages={pages}></BtnForm>;
        break;
    }
  }
  return form;
}