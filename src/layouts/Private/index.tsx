import React from 'react';
import { Link, useHistory } from 'umi';
import styles from './index.less';

const PrivateLayout: React.FC = props => {
  const history = useHistory();
  console.log('history',history)
  return (
    <div className={styles.normal}>
      private
      {props.children}
    </div>
  );
};

export default PrivateLayout;
