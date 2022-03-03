import React from 'react';
import styles from './index.css';
import { renderReactAmis } from '@/utils/amis';
import 'amis/lib/locale/en-US';
import CustomRenderer from './CustomRenderer';

export default function () {
  return (
    <div className={styles.normal}>
      {renderReactAmis(
        {
          type: 'my-renderer',
        },
        CustomRenderer,
      )}
    </div>
  );
}
