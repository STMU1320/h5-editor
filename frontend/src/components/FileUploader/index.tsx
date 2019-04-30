import  * as React from 'react';
import classnames from 'classnames';
import { Icon, message } from 'antd';
import request from '../../utils/request';
import { isEmpty } from '../../utils/func';
import * as styles from './style.less';
export interface FileUpladerProps {
  onSuccess?: Function;
  onError?: Function;
  onChange?: Function;
  showImg?: boolean;
  accept?: string | RegExp;
  errorTip?: string;
  onlySelect?: boolean;
  extraData?: object;
  style?: React.CSSProperties;
  action?: string;
  name?: string;
  value?: string;
}

export interface FileUploaderState {
  uploading: boolean;
  file?: File | { name: string };
  base64Src?: string;
};
export default class FileUploader extends React.Component<FileUpladerProps, FileUploaderState> {
  static defaultProps = {
    accept: '*',
    name: 'file'
  }
  state = {
    uploading: false,
    base64Src: ''
  };
  fileInput: HTMLInputElement = null;
  componentDidMount () {
    const { showImg, value } = this.props;
    if (value) {
      if (showImg) {
        this.setState({ base64Src: value, file: { name: '图片', defaultValue: value } });
      } else {
        this.setState({ file: { name: '文件', defaultValue: value } });
      }
    }
  }
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
  handleImgToBase64 = (file: File) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      this.setState({ base64Src: reader.result as string });
    }
  }
  handleUploadChange = (e: React.ChangeEvent) => {
    const { accept, errorTip, onSuccess, onError, onlySelect, action, showImg, onChange } = this.props;
    let canUpload = true;
    const file = (e.target as HTMLInputElement).files[0];
    if (accept !== '*') {
      canUpload = this.checkFileType(file, accept);
    }
    if (canUpload) {
      this.setState({ file });
      if (onlySelect || !action) {
        onSuccess && onSuccess({ data: file });
        onChange && onChange(file);
        showImg && this.handleImgToBase64(file);
      } else {
        this.handleUpload(file);
      }
    } else {
      message.warning(errorTip || '文件格式不对，请重新选择。');
      onError && onError('format error');
    }
  }

  handleUpload = (file: File) => {
    const { onSuccess, onError, extraData, action, name, showImg, onChange } = this.props;
    const params = { ...extraData, [name]: file, };
    this.setState({ uploading: true });
    request.post(action, params, { upload: true })
    .then((res: any) => {
      this.setState({ uploading: false });
      onSuccess && onSuccess(res);
      onChange && onChange(res);
      showImg && this.handleImgToBase64(file);
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
    const { style, showImg } = this.props;
    const { uploading, file, base64Src }  = this.state as any;
    const renderContent = () => {
      if (uploading) return <Icon type="loading" />
      if (file) {
        if (showImg && base64Src) {
          return <img className={styles.thumbnail} src={base64Src} />
        }
        return <span>{file.name}</span>
      }

      return <span>
          <i className="fa fa-plus" ></i>
         点击上传
      </span>
    }
    return <div className={styles.imgUploaderWrap} onClick={this.triggerInputClick} style={style}>
      <input ref={(input) => { this.fileInput = input; }} onChange={this.handleUploadChange} type="file" hidden />
      {
        renderContent()
      }
    </div>
  }
}