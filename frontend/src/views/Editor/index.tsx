import * as React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import Icon from 'components/Icon';
import PhoneModel from 'components/PhoneModel';
import Header from './Header';
import ToolsBar from './ToolsBar';
import PageThumbnail from './PageThumbnail';

import Page from 'components/Page';
import Text from 'components/Text';
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
  selectedEle: any;
  children: JSX.Element | string;
  dispatch?: Function;
}

export interface H5EditorState {
  formCollapse: Boolean;
}
class H5Editor extends React.Component<H5EditorProps, {}> {

  state = {
    mockList: generateList(80),
    selectedElement: {
      type: 'img',
    },
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
    this.props.dispatch({ type: 'editor/save', payload: { selectedPage: page } });
  }
  handleToggleFormVisible =  () => {
    this.setState({
      formCollapse: !this.state.formCollapse
    });
  }
  handleElementDataChange = (data: any) => {
    this.setState({ selectedElement: data })
  }
  render () {
    const {
      children,
      pageList,
      selectedPage
    } = this.props;

    const { mockList, selectedElement, formCollapse }: any = this.state;
    return <div className={styles.layoutWrap}>
      <Header onPreview={this.handlePreview} onPublish={this.handlePublish} />
      <ToolsBar onElementTypeChange={this.handleCheckedElementChange} />
      <div className={styles.main}>
        <div className={styles.pagePanel}>
            {
              pageList.map((page: any, index: number) => <PageThumbnail name={page.name} onClick={this.handleSelectPage.bind(this, page)} checked={selectedPage.uuid === page.uuid} className={styles.pageItem} key={page.name || `${index}`}>
                <PhoneModel title={page.name} zoom={160 / 750}>
                  {
                    mockList.map((item: any) => <p key={item.text}>{item.text}</p>)
                  }
                </PhoneModel>
              </PageThumbnail>
              )}
            <div>
              <button className={classnames(styles.addPageBtn, styles.pageItem)} onClick={this.handleAddPage}>
                <Icon type="plus"></Icon>
              </button>
            </div>
        </div>
        <div className={styles.stage}>
          <PhoneModel title="test" zoom={0.5}>
            <Page>
              <Text {...selectedElement}   />
            </Page>
          </PhoneModel>
          <div className={classnames(styles.attrForm, { [styles.collapse]: formCollapse })}>
            <div className={styles.formToolsBar}><i className={`fa ${formCollapse ? 'fa-angle-double-left' : 'fa-angle-double-right'}`} onClick={this.handleToggleFormVisible}></i></div>
            <div className={styles.formContent}>
              <ElementForm data={selectedElement} onChange={this.handleElementDataChange}></ElementForm>
            </div>
          </div>
        </div>
      </div>
  </div>
  }
}

export default connect((state: any) => ({...state.editor}))(H5Editor);