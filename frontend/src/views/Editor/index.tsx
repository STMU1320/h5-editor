import * as React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Drawer, Modal, message as AntMessage } from 'antd';
import Button from 'components/Button';
import QRCode from 'qrcode.react';

import Icon from 'components/Icon';
import PhoneModel from 'components/PhoneModel';
import Header from './Header';
import ToolsBar from './ToolsBar';
import PageThumbnail from './PageThumbnail';
import InfoForm from './InfoForm';

import Page, { ElementProps } from '../../../../common/components/Page';
import PaintingPage from 'components/PaintingPage';
import ElementForm from 'components/ElementForm';

import request from 'utils/request';
import { isEmpty, parseUrlParams } from 'utils/func';
import browserHistory from '../routeHistory';

import * as styles from './style.less';

const h5Baseurl = require('../../../../common/config/domain.json').h5;
export interface H5EditorProps {
  pageList?: Array<any>;
  selectedPage: any;
  selectedElement: any;
  cover: string;
  name: string;
  match: any;
  children: JSX.Element | string;
  dispatch?: Function;
}

// export interface H5EditorState {
//   formCollapse: Boolean;
// }

interface h5Info {
  cover: string;
  name: string;
}
class H5Editor extends React.Component<H5EditorProps, {}> {

  state = {
    formCollapse: false,
    preLoading: false,
    pubLoading: false,
    drawerVisible: false,
    drawerType: 1, // 1 预览 0 发布
    previewId: '',
    previewTime: '',
    previewUrl: '',
    modalVisible: false,
    modalKey: Date.now(),
    sending: false,
    publishResult: { url: '', state: 'success' },
    isEdit: false
  }

  infoForm: any = null;

  componentWillMount () {
    const { dispatch, match } = this.props;
    if (match.params.id) {
      const params = parseUrlParams(location.href);
      if (params.mode && (params.mode === 'edit')) {
        this.setState({ isEdit: true });
      }
      request.get('/page/detail', { id: match.params.id })
      .then((res: any) => {
        const { data } = res;
        const { pageList, cover, name } = data;
        dispatch({ type: 'editor/save', payload: { pageList, selectedElement: pageList[0], selectedPage: pageList[0], cover, name } });
      })
      .catch((err: any) => {
        AntMessage.error(err.msg || '记录不存在');
      })
    } else {
      dispatch({ type: 'editor/reset' });
    }
  }

  updateH5 = (newInfoData?: h5Info) => {
    this.setState({ pubLoading: true });
    const { pageList, match, cover, name } = this.props;
    const infoData = { cover, name };
    request.post('/page/update', { ...infoData, ...newInfoData, pageList, id: match.params.id })
    .then((res: any) => {
      const url = `${h5Baseurl}?aid=${res.data}`;
      this.setState({ pubLoading: false, modalVisible: false, drawerType: 0, drawerVisible: true,  publishResult: { url, state: 'success' } });
    })
    .catch((err: any) => {
      AntMessage.error(err.msg || '发布失败，请稍后重试！');
      this.setState({ pubLoading: false });
    })
  }

  addH5 = (infoData: h5Info) => {
    this.setState({ sending: true });
    const { pageList } = this.props;
    request.post('/page/add', { ...infoData, pageList })
    .then((res: any) => {
      const url = `${h5Baseurl}?aid=${res.data}`;
      this.setState({ sending: false, modalVisible: false, drawerType: 0, drawerVisible: true,  publishResult: { url, state: 'success' } });
    })
    .catch((err: any) => {
      AntMessage.error(err.msg || '发布失败，请稍后重试！');
      this.setState({ sending: false });
    })
  }

  handlePreview = () => {
    const { pageList } = this.props;
    if (isEmpty(pageList)) {
      return AntMessage.warning('h5页面数据为空，请编辑后再预览');
    }
    const { previewId } = this.state;
    this.setState({ preLoading: true });
    request.post('/page/preview', { pageList, previewId })
    .then((res: any) => {
      const { id, updateTime } = res.data;
      const previewUrl = `${h5Baseurl}?aid=${id}&mode=preview`;
      this.setState({ preLoading: false, previewId: id, previewUrl, previewTime: updateTime, drawerVisible: true, drawerType: 1 });
    })
    .catch((err: any) => {
      AntMessage.error(err.msg || '预览失败，请稍后重试！');
      this.setState({ preLoading: false });
    })
  }
  handleModalOk = () => {
    if (this.infoForm) {
      this.infoForm.validateFieldsAndScroll((err: boolean, values: any) => {
        if (!err) {
          const { cover, name } = values;
          const getFormData = () => {
            const formData = { name, cover: '' };
            return new Promise((resolve) => {
              if (cover instanceof File) {
                let reader = new FileReader();
                reader.readAsDataURL(cover);
                reader.onload = (e) => {
                  formData.cover = reader.result as string;
                  resolve(formData)
                }
              } else {
                formData.cover = cover;
                resolve(formData);
              }
            })
          }
          getFormData()
          .then((data: h5Info) => {
            if (this.state.isEdit) {
              this.updateH5(data);
            } else {
              this.addH5(data);
            }
          })
          
        }
      })
    }
  }
  handlePublish = () => {
    const { pageList } = this.props;
    const { isEdit } = this.state;
    if (isEmpty(pageList)) {
      return AntMessage.warning('h5页面数据为空，请编辑后再发布');
    }
    if (isEdit) {
      this.openConfirm();
    } else {
      this.openModal();
    }
  }

  openConfirm = () => {
    let _this = this;
    Modal.confirm({
      title: '您需要编辑此H5的名称和封面吗?',
      okText: '去编辑',
      cancelText: '直接发布',
      onOk() {
        _this.openModal();
      },
      onCancel() {
        _this.updateH5();
      },
    });
  }

  openModal = () => {
    this.setState({ modalVisible: true, modalKey: Date.now() });
  }

  handleModalCancel = () => {
    this.setState({ modalVisible: false });
  }

  handleToggleVisbile = (visible: boolean) => {
    this.setState({ drawerVisible: visible });
  }

  // handleCheckedElementChange = (e: React.MouseEvent) => {
  //   console.log(e);
  // }
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
  handleContinue = () => {
    const { match } = this.props;
    this.props.dispatch({ type: 'editor/reset' });
    this.setState({ drawerVisible: false, isEdit: false });
    if (match.params.id) {
      browserHistory.push('/editor');
    }
  }
  handleGotoHomePage = () => {
    browserHistory.push('/');
  }
  render () {
    const {
      pageList,
      selectedPage,
      selectedElement,
      cover,
      name
    } = this.props;

    const {
      formCollapse, drawerVisible, previewTime, previewId, previewUrl, drawerType, modalKey,
      publishResult, modalVisible, sending, formData, ...headerProps }: any = this.state;
    const pageOptions = pageList.map((item) => ({ label: item.name, value: item.uuid }));
    return <div className={styles.layoutWrap}>
      <Header onPreview={this.handlePreview} onPublish={this.handlePublish} {...headerProps} />
      <ToolsBar />
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
          <div className={classnames(styles.stage, { [styles.maxStage]: formCollapse })}>
            {
              selectedPage
              && <PhoneModel title={selectedPage.name} zoom={0.5} showHeader >
                <PaintingPage {...selectedPage} zoom={0.5} selectedElement={selectedElement && selectedElement.uuid} onEditElement={this.handleElementDataChange} onAddElement={this.handleAddElement}></PaintingPage>
              </PhoneModel>
            }
          </div>
          <div className={classnames(styles.elePanel, { [styles.collapse]: formCollapse })}>
            <div className={styles.eleToolsBar}><Icon type={ formCollapse ? 'double-left' : 'double-right' } antd onClick={this.handleToggleFormVisible} /></div>
            <div className={styles.formContent}>
              <ElementForm pages={pageOptions} data={selectedElement} onChange={this.handleElementDataChange}></ElementForm>
            </div>
            <div className={styles.elePanelFooter}>
              <Icon type="delete-fill" disabled={!selectedElement} onClick={this.handleDeleteElement}></Icon>
            </div>
          </div>
        </div>
      </div>
      <Drawer
        className={styles.previewWrap}
        title={ drawerType ? '预览' : '发布' }
        placement="right"
        width="100%"
        closable={true}
        onClose={() => this.setState({ drawerVisible: false })}
        visible={drawerVisible}
      >
        {
          drawerType ?
          <>
            <p>扫描屏幕二维码预览<br/>有效时间10分钟<br/><small>上次更新时间: {previewTime}</small></p>
            <div className={styles.qrWrap}>
              { previewUrl &&  <QRCode value={previewUrl} size={180}></QRCode> }
            </div>
          </>
          : <>
            <h2>发布成功</h2>
            <div className={styles.qrWrap}>
              { publishResult.url &&  <QRCode value={publishResult.url} size={180}></QRCode> }
            </div>
            <p className={styles.publishSuccessBtn}>
              <Button onClick={this.handleContinue}>继续添加</Button>
              <Button type="primary" onClick={this.handleGotoHomePage}>回首页</Button>
            </p>
            <p>
              访问地址：
              <a href={publishResult.url} target="_blank">{publishResult.url}</a>
            </p>
          </>
        }
      </Drawer>
      <Modal
        width={480}
        title="活动信息"
        visible={modalVisible}
        onOk={this.handleModalOk}
        confirmLoading={sending}
        onCancel={this.handleModalCancel}
        >
          <InfoForm key={modalKey} defaultData={{ cover, name }} ref={(ele: React.Component) => { this.infoForm = ele }}></InfoForm>
        </Modal>
  </div>
  }
}

export default connect((state: any) => ({...state.editor}))(H5Editor);