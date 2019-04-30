import * as React from 'react';
import { message, Drawer } from 'antd';
import QRCode from 'qrcode.react';
import Loading from 'components/Loading';
import Header from './Header';
import PageList from './PageList';
import request from '../../utils/request';
const h5Baseurl = require('../../../../common/config/domain.json').h5;
import * as styles from './style.less';

import { ItemProps } from './PageList/Item';

interface HomePageState {
  list: Array<any>,
  pageInfo: {
    page: number,
    pageSize: number,
  },
  totalRecordNum: number;
  loading: boolean;
  selectItem: ItemProps;
  drawerVisible: boolean;
}
 

export default class HomePage extends React.Component<{}, HomePageState> {
  state = {
    list: [] as Array<any>,
    pageInfo: {
      page: 1,
      pageSize: 20
    },
    totalRecordNum: 0,
    loading: false,
    selectItem: {} as ItemProps,
    drawerVisible: false
  }

  componentDidMount () {
    this.getList();
  }

  getList () {
    const { pageInfo } = this.state;
    this.setState({ loading: true });
    request.get('/page/list', { ...pageInfo })
    .then((res: any) => {
      const { total, list } = res.data;
      this.setState({ totalRecordNum: total, list, loading: false });
    })
    .catch((err: any) => {
      this.setState({ loading: false });
      message.error(err.msg || '获取h5列表数据错误');
    })
  }

  handleItemClick = (item: ItemProps) => {
    this.setState({
      selectItem: item,
      drawerVisible: true
    });
  }

  render () {
    const { list, loading, drawerVisible, selectItem } = this.state;
    const url = selectItem._id ? `${h5Baseurl}?aid=${selectItem._id}` : '';
    return <div className={styles.contentWrap}>
      <Header></Header>
      <div className={styles.listWrap}>
        <PageList list={list} onItemClick={this.handleItemClick}></PageList>
        { loading && <div className={styles.loadingWrap}>
          <Loading></Loading>
        </div> }
      </div>
      <Drawer
        className={styles.detailDrawer}
        title="详情"
        placement="right"
        width="300px"
        closable={true}
        onClose={() => this.setState({ drawerVisible: false })}
        visible={drawerVisible}
      >
        <h2 >{selectItem.name}</h2>
        <div className={styles.qrWrap}>
          { url &&  <QRCode value={url} size={180}></QRCode> }
        </div>
        <p className={styles.link}>
          访问地址：
          <a href={url} target="_blank">{url}</a>
        </p>
      </Drawer>
    </div>
  }
}