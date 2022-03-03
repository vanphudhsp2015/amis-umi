import React from 'react';
import { Link, useHistory } from 'umi';
import { Form, Input, Button } from 'antd';
import styles from './styles.less';

const PrivateLayout: React.FC = (props) => {
  const history = useHistory();
  return (
    <div className={styles.wrapper}>
      <div className={styles['logo-container']}>
        <img src="/logo.png" alt="imageLogin" className={styles.logo} />
      </div>
      <Form hideRequiredMark initialValues={{}} layout="vertical">
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
          className={styles['form-text']}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
          className={styles['form-password']}
        >
          <Input.Password />
        </Form.Item>
        <div>
          <Button type="primary" htmlType="submit" className={styles.button}>
            ĐĂNG NHẬP
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default PrivateLayout;
