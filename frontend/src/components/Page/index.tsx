import  * as React from 'react';
import classnames from 'classnames';
import * as styles from './style.less';
import Img, { ImgProps } from '../Img';
import Text, { TextProps } from '../Text';
import AssistBox from '../AssistBox';

export interface ElementProps extends TextProps, ImgProps {
  type: string;
  uuid: string;
};
export interface PageProps {
  uuid: string;
  elements?: Array<ElementProps>;
  backgroundColor?: string;
  bgImg?: string;
  color?: string;
  name?: string;
  painting?: boolean;
  onAddElement?: Function;
  selectedElement?: string;
}

const renderElement = (eleData: ElementProps, painting: boolean, selectedElement: string): React.ReactNode => {
  let type = eleData && eleData.type;
  let Ele: React.ReactElement = null;
  switch (type) {
    case 'img':
      Ele = <Img key={eleData.uuid} {...eleData}></Img>
      break;
    case 'text':
      Ele = <Text key={eleData.uuid} {...eleData}></Text>
      break;
  }

  if (painting) {
    return <AssistBox key={eleData.uuid} eleData={eleData} showBox={eleData.uuid === selectedElement}>
      {Ele}
    </AssistBox>
  }
  return Ele;
}

export default function Page (props: PageProps) {
  let {
    backgroundColor = 'white',
    color = '#666',
    bgImg,
    elements,
    painting,
    onAddElement,
    uuid,
    selectedElement
  } = props;
  let style: React.CSSProperties = { backgroundColor, color };
  if (bgImg) {
    style.backgroundImage = `url(${bgImg})`;
  }

  const pageClick = () => {};
  const pageDbClick = () => {
    onAddElement && onAddElement(uuid)
  };

  return <div
    className={classnames(styles.pageWrap, { [styles.noSelect]: painting })} 
    style={style}
    onClick={painting && pageClick}
    onDoubleClick={painting && pageDbClick}
    >
      {
        elements && elements.map((item) => renderElement(item, painting, selectedElement))
      }
  </div>
}