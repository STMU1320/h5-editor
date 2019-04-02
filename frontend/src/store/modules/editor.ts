import cloneDeep from 'lodash/cloneDeep';
const pageData = require('../../../../common/dataStructure/page.json');

interface editorState {
  checkedEle: string;
  editHistory: Array<any>;
  pageList: Array<any>;
  selectedEle: Object;
  selectedPage: Object;
}

const defaultState: editorState = {
  checkedEle: '',
  editHistory: [],
  pageList: [],
  selectedEle: {},
  selectedPage: {}
}

export default {
  namespace: 'editor',
  state: defaultState,

  reducers: {
    save(state: editorState, { payload }: any) {
      return {
        ...state,
        ...payload
      };
    },
    addPage (state: editorState) {
      const newPage = cloneDeep(pageData);
      const pageList = cloneDeep(state.pageList);
      const pageNum = pageList.length + 1;
      newPage.name = `页面${pageNum}`;
      newPage.uuid = Date.now();
      pageList.push(newPage);
      return {
        ...state,
        pageList
      }
    }
  }
};
