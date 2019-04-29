import  * as React from 'react';
import classnames from 'classnames';
import { Icon, message } from 'antd';
import request from '../../utils/request';
import { isEmpty } from '../../utils/func';
import * as styles from './style.less';
export interface FileUpladerProps {
  onSuccess?: Function;
  onError?: Function;
  showImg?: boolean;
  accept?: string | RegExp;
  errorTip?: string;
  onlySelect?: boolean;
  extraData?: object;
  style?: React.CSSProperties;
  action?: string;
  name?: string;
}

export interface FileUploaderState {
  uploading: boolean;
  file?: File;
};
export default class FileUploader extends React.Component<FileUpladerProps, FileUploaderState> {
  static defaultProps = {
    accept: '*',
    name: 'file'
  }
  state = {
    uploading: false,
  };
  fileInput: HTMLInputElement = null;
  checkFileType (file: File, accept: string | RegExp): boolean {
    let reg = accept;
    let pass = true;
    if (typeof accept === 'string') {
      reg = new RegExp(accept, 'i');
      pass = reg.test(file.type);
    } else {
      pass = (reg as RegExp).test(file.name);
    }
    return pass;
  }
  handleUploadChange = (e: React.ChangeEvent) => {
    const { accept, errorTip, onSuccess, onError, onlySelect, action } = this.props;
    let canUpload = true;
    const file = (e.target as HTMLInputElement).files[0];
    if (accept !== '*') {
      canUpload = this.checkFileType(file, accept);
    }
    if (canUpload) {
      if (onlySelect || !action) {
        onSuccess && onSuccess({ data: file });
      } else {
        this.handleUpload(file);
      }
    } else {
      message.warning(errorTip || '文件格式不对，请重新选择。');
      onError && onError('format error');
    }
  }

  handleUpload = (file: File) => {
    const { onSuccess, onError, extraData, action, name } = this.props;
    const params = { ...extraData, [name]: file, };
    this.setState({ uploading: true });
    request.post(action, params, { upload: true })
    .then((res: any) => {
      this.setState({ uploading: false });
      onSuccess && onSuccess(res);
    })
    .catch((err: any) => {
      this.setState({ uploading: false });
      onError && onError(err);
    });
  }
  triggerInputClick = () => {
    if (this.fileInput) {
      this.fileInput.click();
    }
  }
  render () {
    const { style } = this.props;
    const { uploading, file }  = this.state as any;
    return <div className={styles.imgUploaderWrap} onClick={this.triggerInputClick} style={style}>
      <input ref={(input) => { this.fileInput = input; }} onChange={this.handleUploadChange} type="file" hidden />
      {
        uploading
        ? <Icon type="loading" />
        : file
        ? <span>{file.name}</span>
        : <span>
            <i className="fa fa-plus" ></i>
            点击上传
          </span>
      }
    </div>
  }
}