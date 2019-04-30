import cloneDeep from 'lodash/cloneDeep';
import uuid from 'uuid/v4';
const pageData = require('../../../../common/dataStructure/page.json');
const imgData = require('../../../../common/dataStructure/img.json');
const textData = require('../../../../common/dataStructure/text.json');
const btnData = require('../../../../common/dataStructure/btn.json');

interface editorState {
  checkedEleType: string;
  editHistory: Array<any>;
  pageList: Array<any>;
  selectedElement: any;
  selectedPage: any;
  cover: string;
  name: string;
}

const defaultState: editorState = {
  checkedEleType: 'img',
  editHistory: [],
  pageList: [],
  selectedElement: null,
  selectedPage: null,
  cover: '',
  name: ''
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
    reset(state: editorState, ) {
      return {
        ...defaultState
      };
    },
    selectPage (state: editorState, { payload }: any) {
      return {
        ...state,
        selectedPage: payload.page,
        selectedElement: payload.page
      }
    },
    addPage (state: editorState) {
      const newPage = cloneDeep(pageData);
      const pageList = cloneDeep(state.pageList);
      const pageNum = pageList.length + 1;
      newPage.name = `页面${pageNum}`;
      newPage.uuid = uuid();
      pageList.push(newPage);
      return {
        ...state,
        pageList,
        selectedPage: newPage,
        selectedElement: newPage
      }
    },
    deletePage (state: editorState, { payload: { page } }: any) {
      const uuid = page.uuid;
      const pages = cloneDeep(state.pageList);
      const nextPages = pages.filter((item: any) => item.uuid !== uuid);
      return {
        ...state,
        pageList: nextPages,
        selectedPage: null,
        selectedElement: null,
      } as editorState
    },
    pageAttrChange (state: editorState, { payload: { page } }: any) {
      let pageIndex = state.pageList.findIndex((item) => item.uuid === page.uuid);
      const newPageList = [...state.pageList];
      newPageList[pageIndex] = page;
      return {
        ...state,
        pageList: newPageList,
        selectedPage: page,
        selectedElement: page
      }
    },
    addElement (state: editorState, { payload: { pageId, eleData } }: any) {
      const type = state.checkedEleType;
      const pageIndex = state.pageList.findIndex((item) => item.uuid === pageId);
      const page = cloneDeep(state.pageList[pageIndex]);
      switch (type) {
        case 'img':
          eleData = {...imgData, ...eleData}
          break;
        case 'text':
          eleData = {...textData, ...eleData}
          break;
        case 'btn':
          eleData = {...btnData, ...eleData}
          break;
      }
      eleData.uuid = uuid();
      eleData.pid = pageId;
      if (page.elements) {
        page.elements.push(eleData);
      } else {
        page.elements = [eleData];
      }
      const newPageList = [...state.pageList];
      newPageList[pageIndex] = page;
      return {
        ...state,
        pageList: newPageList,
        selectedPage: page,
        selectedElement: eleData
      }
    },
    deleteElement (state: editorState, { payload: { element } }: any) {
      const pid = element.pid;
      const uuid = element.uuid;
      const pageIndex = state.pageList.findIndex((item) => item.uuid === pid);
      const page = cloneDeep(state.pageList[pageIndex]);
      const nextEles = page.elements.filter((item: any) => item.uuid !== uuid);
      page.elements = nextEles;
      const newPageList = [...state.pageList];
      newPageList[pageIndex] = page;
      return {
        ...state,
        pageList: newPageList,
        selectedPage: page,
        selectedElement: null,
      } as editorState
    },
    selectElement (state: editorState, { payload: { element } }: any) {
      return {
        ...state,
        selectedElement: element
      }
    },
    eleAttrChange (state: editorState, { payload: { eleData } }: any) {
      const pageId = eleData.pid;
      const pageIndex = state.pageList.findIndex((item) => item.uuid === pageId);
      const page = cloneDeep(state.pageList[pageIndex]);
      const eleIndex = page.elements.findIndex((item: any) => item.uuid === eleData.uuid);
      const nextEle = {...page.elements[eleIndex], ...eleData};
      if (nextEle.position === 'static') {
        nextEle.left = 0;
        nextEle.top = 0;
      }
      page.elements[eleIndex] = nextEle;
      const newPageList = [...state.pageList];
      newPageList[pageIndex] = page;
      return {
        ...state,
        pageList: newPageList,
        selectedPage: page,
        selectedElement: nextEle
      }
    }
  }
};
