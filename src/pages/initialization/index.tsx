import React from 'react';
import { Link, useHistory } from 'umi';
import { Form, Input, Button } from 'antd';
import styles from './styles.less';
import { renderReactAmis } from '@/utils/amis';

const Index: React.FC = (props) => {
  const history = useHistory();
  return (
    <div className={styles.wrapper}>
      {renderReactAmis({
        type: 'page',
        title: 'TItle',
        remark: 'Reminder Tip',
        body: [
          '\n  <p>`initApi` page </p>',
          {
            type: 'alert',
            level: 'success',
            body: 'Warn reminder: a reminder about page functions, green is a message reminder of the form',
          },
          {
            type: 'alert',
            level: 'warning',
            body: 'Your private network has reached the quota. If you need more private networks, you can...',
          },
        ],
      })}
    </div>
  );
};

export default Index;
