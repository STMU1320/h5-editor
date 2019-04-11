import * as React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import Icon from 'components/Icon';
import PhoneModel from 'components/PhoneModel';
import Header from './Header';
import ToolsBar from './ToolsBar';
import PageThumbnail from './PageThumbnail';

import Page, { ElementProps } from 'components/Page';
import ElementForm from 'components/ElementForm';

import * as styles from './style.less';

function generateList (length: number) {
  let out = [];
  while (length > 0) {
    length--;
    out.push({
      text: `row-${length}`
    });
  }
  return out;
}

export interface H5EditorProps {
  pageList?: Array<any>;
  selectedPage: any;
  selectedElement: any;
  children: JSX.Element | string;
  dispatch?: Function;
}

export interface H5EditorState {
  formCollapse: Boolean;
}
class H5Editor extends React.Component<H5EditorProps, {}> {

  state = {
    formCollapse: false
  }

  handlePreview = (e: React.MouseEvent) => {
    console.log(e);
  }
  handlePublish = (e: React.MouseEvent) => {
    console.log(e);
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
      children,
      pageList,
      selectedPage,
      selectedElement
    } = this.props;

    const { formCollapse }: any = this.state;
    return <div className={styles.layoutWrap}>
      <Header onPreview={this.handlePreview} onPublish={this.handlePublish} />
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
                <Page {...selectedPage} zoom={0.5} painting selectedElement={selectedElement && selectedElement.uuid} onEditElement={this.handleElementDataChange} onAddElement={this.handleAddElement}></Page>
              </PhoneModel>
            }
          </div>
          <div className={classnames(styles.elePanel, { [styles.collapse]: formCollapse })}>
            <div className={styles.eleToolsBar}><i className={`fa ${formCollapse ? 'fa-angle-double-left' : 'fa-angle-double-right'}`} onClick={this.handleToggleFormVisible}></i></div>
            <div className={styles.formContent}>
              <ElementForm data={selectedElement} onChange={this.handleElementDataChange}></ElementForm>
            </div>
            <div className={styles.elePanelFooter}>
              <Icon type="trash" disabled={!selectedElement} onClick={this.handleDeleteElement}></Icon>
            </div>
          </div>
        </div>
      </div>
  </div>
  }
}

export default connect((state: any) => ({...state.editor}))(H5Editor);