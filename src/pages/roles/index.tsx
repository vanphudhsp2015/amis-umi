import React from 'react';
import { useHistory } from 'umi';
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
                placeholder: 'Search...',
              },
            ],
            actions: [
              {
                type: 'reset',
                label: 'Reset',
              },
              {
                type: 'submit',
                label: 'Search',
                level: 'primary',
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
              label: 'Action',
              buttons: [
                {
                  label: 'Delete',
                  type: 'button',
                  actionType: 'ajax',
                  level: 'danger',
                  confirmText: 'Confirm',
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
