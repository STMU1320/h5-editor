import * as React from 'react';
import styles from './style.less';

 export default class H5Editor extends React.Component<any, any> {
  constructor (props: any) {
    super(props);
  }

  render () {
    return <h1 className={styles.red}>Hello word!  </h1>
  }
}