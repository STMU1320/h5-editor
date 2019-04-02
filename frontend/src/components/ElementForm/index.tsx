import * as React from 'react';
import { TextProps } from '../Text';
import TextForm from './TextForm';

interface DataProps extends TextProps {
  type: string
}

export interface ElementFormProps {
  disabled?: Boolean;
  onChange?: Function;
  data: DataProps
}

export default function ElementForm ({ disabled, onChange, data }: ElementFormProps) {
  switch (data.type) {
    case 'text':
      return <TextForm onChange={onChange} data={data}></TextForm>
  
    default:
      return <span>-</span>
  }
}