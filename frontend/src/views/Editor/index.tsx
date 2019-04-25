import * as React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import AntMessage from 'antd/lib/message';
import Drawer from 'antd/lib/Drawer';
import QRCode from 'qrcode.react';

import Icon from 'components/Icon';
import PhoneModel from 'components/PhoneModel';
import Header from './Header';
import ToolsBar from './ToolsBar';
import PageThumbnail from './PageThumbnail';

import Page, { ElementProps } from '../../../../common/components/Page';
import PaintingPage from 'components/PaintingPage';
import ElementForm from 'components/ElementForm';

import request from '../../utils/request';

import * as styles from './style.less';

const h5Baseurl = require('../../../../common/config/domain.json').h5;
export interface H5EditorProps {
  pageList?: Array<any>;
  selectedPage: any;
  selectedElement: any;
  match: any;
  children: JSX.Element | string;
  dispatch?: Function;
}

// export interface H5EditorState {
//   formCollapse: Boolean;
// }
class H5Editor extends React.Component<H5EditorProps, {}> {

  state = {
    formCollapse: false,
    preLoading: false,
    pubLoading: false,
    previewVisible: false,
    previewId: '',
    previewTime: '',
    previewUrl: ''
  }

  componentWillMount () {
    const { dispatch, match } = this.props;
    if (match.params.id) {

    } else {
      // dispatch({ type: 'editor/generateUUID', payload: {} });
    }
  }

  handlePreview = () => {
    const { pageList } = this.props;
    const { previewId } = this.state;
    this.setState({ preLoading: true });
    request.post('/page/preview', { pageList, previewId })
    .then((res: any) => {
      const { id, updateTime } = res.data;
      const previewUrl = `${h5Baseurl}h5?aid=${id}&mode=preview`;
      this.setState({ preLoading: false, previewId: id, previewUrl, previewTime: updateTime, previewVisible: true });
    })
    .catch((err: any) => {
      AntMessage.error(err.msg || '预览失败，请稍后重试！');
      this.setState({ preLoading: false });
    })
  }
  handlePublish = () => {
    const { pageList } = this.props;
    request.post('/page/add', { pageList })
    .then((res: any) => {
      console.log(res);
    })
    .catch((err: any) => {
      AntMessage.error(err.msg || '发布失败，请稍后重试！');
    })
  }

  handleToggleVisbile = (visible: boolean) => {
    this.setState({ previewVisible: visible });
  }

  handleCheckedElementChange = (e: React.MouseEvent) => {
    console.log(e);
  }
  handleAddPage = () => {
    const { dispatch } = this.props;
    dispatch({type: 'editor/addPage'});
  }
  handleSelectPage = (page: object) => {
    this.props.dispatch({ type: 'editor/selectPage', payload: { page } });
  }
  handleAddElement = (pageId: string, eleData?: ElementProps) => {
    this.props.dispatch({ type: 'editor/addElement', payload: { pageId, eleData } });
  };
  handleDeleteElement = () => {
    const { selectedElement, dispatch } = this.props;
    if (selectedElement.type === 'page') {
      dispatch({ type: 'editor/deletePage', payload: { page: { ...selectedElement } } });
    } else {
      dispatch({ type: 'editor/deleteElement', payload: { element: { ...selectedElement } } });
    }
  }
  handleToggleFormVisible =  () => {
    this.setState({
      formCollapse: !this.state.formCollapse
    });
  }
  handleElementDataChange = (data: any) => {
    if (data.type === 'page') {
      this.props.dispatch({ type: 'editor/pageAttrChange', payload: { page: data } });
    } else {
      this.props.dispatch({ type: 'editor/eleAttrChange', payload: { eleData: data } });
    }
  }
  render () {
    const {
      pageList,
      selectedPage,
      selectedElement
    } = this.props;

    const { formCollapse, previewVisible, previewTime, previewId, previewUrl, ...headerProps }: any = this.state;
    return <div className={styles.layoutWrap}>
      <Header onPreview={this.handlePreview} onPublish={this.handlePublish} {...headerProps} />
      <ToolsBar onElementTypeChange={this.handleCheckedElementChange} />
      <div className={styles.main}>
        <div className={styles.pagePanel}>
            {
              pageList.map((page: any, index: number) => <PageThumbnail name={page.name} onClick={this.handleSelectPage.bind(this, page)} checked={selectedPage && selectedPage.uuid === page.uuid} className={styles.pageItem} key={page.name || `${index}`}>
                <PhoneModel title={page.name} zoom={160 / 750}>
                  <Page {...page}></Page>
                </PhoneModel>
              </PageThumbnail>
              )}
            <div>
              <button className={classnames(styles.addPageBtn, styles.pageItem)} onClick={this.handleAddPage}>
                <Icon type="plus"></Icon>
              </button>
            </div>
        </div>
        <div className={styles.mainContent}>
          <div className={styles.stage}>
            {
              selectedPage
              && <PhoneModel title={selectedPage.name} zoom={0.5} showHeader >
                <PaintingPage {...selectedPage} zoom={0.5} selectedElement={selectedElement && selectedElement.uuid} onEditElement={this.handleElementDataChange} onAddElement={this.handleAddElement}></PaintingPage>
              </PhoneModel>
            }
          </div>
          <div className={classnames(styles.elePanel, { [styles.collapse]: formCollapse })}>
            <div className={styles.eleToolsBar}><i className={`fa ${formCollapse ? 'fa-angle-double-left' : 'fa-angle-double-right'}`} onClick={this.handleToggleFormVisible}></i></div>
            <div className={styles.formContent}>
              <ElementForm data={selectedElement} onChange={this.handleElementDataChange}></ElementForm>
            </div>
            <div className={styles.elePanelFooter}>
              <Icon type="delete-fill" disabled={!selectedElement} onClick={this.handleDeleteElement}></Icon>
            </div>
          </div>
        </div>
      </div>
      <Drawer
        className={styles.previewWrap}
        title="预览"
        placement="right"
        width="100%"
        closable={true}
        onClose={() => this.setState({ previewVisible: false })}
        visible={previewVisible}
      >
        <p>扫描屏幕二维码预览<br/>有效时间10分钟<br/><small>上次更新时间: {previewTime}</small></p>
        <div className={styles.qrWrap}>
          { previewUrl &&  <QRCode value={previewUrl} size={180}></QRCode> }
        </div>
      </Drawer>
  </div>
  }
}

export default connect((state: any) => ({...state.editor}))(H5Editor);