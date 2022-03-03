import React from 'react';
import { Link, useHistory } from 'umi';
import { Layout } from 'antd';
import styles from './styles.less';

const PublicLayout: React.FC = (props) => {
  const history = useHistory();
  return (
    <Layout className={styles.layout}>
      <Layout.Content className={styles.wrapper}>{props.children}</Layout.Content>
    </Layout>
  );
};

export default PublicLayout;
