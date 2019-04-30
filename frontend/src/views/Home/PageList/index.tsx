import * as React from 'react';
import Item from './Item';
import styles from './list.less';

interface ListProps {
  list: Array<any>;
  onItemClick: Function;
}

export default function ({ list = [], onItemClick }: ListProps) {
  return <div className={styles.content}>
    {
      list.length
      ? list.map((item: any) => <Item key={item._id} {...item } onClick={onItemClick}></Item>)
      : <p style={{ textAlign: 'center', width: '100%' }}>无数据</p>
    }
  </div>
}