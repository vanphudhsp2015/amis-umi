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
        title: 'Form Page',
        body: [
          {
            type: 'form',
            mode: 'vertical',
            api: '/amis/api/mock2/form/saveForm',
            title: 'Form account',
            body: [
              {
                label: 'Name',
                type: 'input-text',
                name: 'name',
                placeholder: 'Please enter your name',
                required: true
              },
              {
                label: 'Email',
                type: 'input-email',
                placeholder: 'Please enter your email address',
                name: 'email',
                required: true
              },
            ],
            actions: [
              {
                type: 'reset',
                label: 'Reset',
              },
              {
                type: 'submit',
                label: 'Submit',
                level: 'primary',
              },
            ],
          },
        ],
      })}
    </div>
  );
};

export default Index;
