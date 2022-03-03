import React from 'react';
import styles from './index.css';
import { renderReactAmis } from '@/utils/amis';

export default function () {
  return (
    <div className={styles.normal}>
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
                placeholder: 'keywords',
              },
              {
                type: 'text',
                name: 'keywords 2',
                placeholder: 'keywords 2',
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
              label: 'action',
              buttons: [
                {
                  label: 'delete',
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
}
