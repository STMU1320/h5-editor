import * as React from 'react';
import Page from '../../../../../common/components/Page';
import PhoneModel from 'components/PhoneModel';
import bhistory from '../../routeHistory';

import { Icon } from 'antd';
import { dateFormat } from 'utils/format';

import styles from './list.less';

export interface ItemProps {
  name: string;
  cover: string;
  immutable: boolean;
  pageList: Array<any>;
  _id: string;
  updateTime: string;
  onClick?: Function;
}

export default function ({ pageList = [], name, cover, immutable, _id, updateTime, onClick }: ItemProps) {
  let indexPage = pageList[0] || {};
  const handleEdit = () => {
    bhistory.push(`/editor/${_id}?mode=edit`)
  }
  const handleCopy = () => {
    bhistory.push(`/editor/${_id}?mode=copy`)
  }
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onClick && onClick({ _id, name, updateTime });
  }
  return <dl className={styles.item} >
    <dt className={styles.itemCover} onClick={handleClick}>
      {
        cover
        ? <img src={cover} alt={name}/>
        : <PhoneModel zoom={200 / 750}>
          <Page {...indexPage} ></Page>
        </PhoneModel>
      }
    </dt>
    <dd className={styles.itemInfo} >
      <h4>{name}</h4>
      <div className={styles.iconWrap}>
        <span className={styles.date}>
          {dateFormat(updateTime, 'YYYY-MM-DD')}
        </span>
        <span>
          {
            !immutable && <Icon type="edit" title="编辑" onClick={handleEdit} theme="filled" />
          }
          <Icon type="copy" title="复制" style={{ marginLeft: 10 }} onClick={handleCopy} theme="filled" />
        </span>
      </div>
    </dd>
  </dl>
}