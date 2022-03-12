import { Request, Response } from 'express';
import moment from 'moment';

// mock tableListDataSource
const genUsers = (current: number, pageSize: number) => {
  const items: any[] = [
    {
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
      fullName: 'Admin',
      username: 'admin',
      password: '1q2w3E*',
      updatedAt: moment().format('YYYY-MM-DD'),
      createdAt: moment().format('YYYY-MM-DD'),
    },
  ];
  items.reverse();
  return items;
};

// Data users
let users = genUsers(1, 100);

function login(req: Request, res: Response, u: string, b: Request) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }

  const body = (b && b.body) || req.body;

  const { username, password } = body;

  const userCurrent = users.find(
    (item) => item.username === username && item.password === password,
  );
  if (userCurrent) {
    return res.json({ ...userCurrent, status: 200 });
  }
  return res.json({ status: 400, message: 'Failed' });
}

export default {
  'POST /api/login': login,
};
