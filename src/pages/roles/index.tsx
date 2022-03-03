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
        body: {
          type: 'crud',
          headerToolbar: [],
          syncLocation: false,
          api: 'https://3xsw4ap8wah59.cfc-execute.bj.baidubce.com/api/amis-mock/sample',
          filter: {
            title: 'Filter',
            controls: [
              {
                type: 'text',
                name: 'keywords',
                placeholder: '通过关键字搜索',
              },
              {
                type: 'text',
                name: 'keywords 2',
                placeholder: '通过关键字搜索 2',
              },
            ],
          },
          columns: [
            {
              name: 'id',
              label: 'ID',
            },
            {
              name: 'engine',
              label: 'Rendering engine',
            },
            {
              name: 'browser',
              label: 'Browser',
            },
            {
              name: 'platform',
              label: 'Platform(s)',
            },
            {
              name: 'version',
              label: 'Engine version',
            },
            {
              name: 'grade',
              label: 'CSS grade',
            },
            {
              type: 'operation',
              label: '操作',
              buttons: [
                {
                  label: '删除',
                  type: 'button',
                  actionType: 'ajax',
                  level: 'danger',
                  confirmText: '确认要删除？',
                  api: 'delete:https://3xsw4ap8wah59.cfc-execute.bj.baidubce.com/api/amis-mock/sample/${id}',
                },
              ],
            },
          ],
        },
      })}
    </div>
  );
};

export default Index;
