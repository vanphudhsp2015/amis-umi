import React, { useEffect, useState } from 'react';
import { useHistory } from 'umi';
import { useDispatch } from 'dva';
import styles from './styles.less';
import { renderReactAmis } from '@/utils/amis';
import { isEmpty } from 'lodash';

const Index: React.FC = (props) => {
  const [json, setJson] = useState({});
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: 'roles/GET_JSON',
      payload: {},
      callback: (response: any) => {
        if (response) {
          setJson(response.data.json);
        }
      },
    });
  }, []);

  if (isEmpty(json)) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      {renderReactAmis({
        type: 'page',
        body: {
          type: 'crud',
          headerToolbar: [],
          syncLocation: false,
          api: '/api/roles',
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
              name: 'code',
              label: 'CODE',
            },
            {
              name: 'name',
              label: 'Name',
            },
            {
              name: 'description',
              label: 'Description',
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
                  api: 'DELETE:/api/roles/${id}',
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
