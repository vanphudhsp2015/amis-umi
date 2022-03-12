import { Request, Response } from 'express';
import moment from 'moment';

// mock tableListDataSource
const genRoles = (current: number, pageSize: number) => {
  const items: any[] = [
    {
      id: 1,
      name: 'Admin',
      code: 'ADMIN',
      description: 'admin',
      updatedAt: moment().format('YYYY-MM-DD'),
      createdAt: moment().format('YYYY-MM-DD'),
    },
    {
      id: 2,
      name: 'Super admin',
      code: 'SUPER_ADMIN',
      description: 'super admin',
      updatedAt: moment().format('YYYY-MM-DD'),
      createdAt: moment().format('YYYY-MM-DD'),
    },
    {
      id: 3,
      name: 'user',
      code: 'USER',
      description: 'user',
      updatedAt: moment().format('YYYY-MM-DD'),
      createdAt: moment().format('YYYY-MM-DD'),
    },
  ];
  return items;
};

// Data users
let roles = genRoles(1, 100);

const JSON_ROLE = {
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
};

function getRoles(req: Request, res: Response, u: string, b: Request) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }

  const { keywords } = req.query;

  if (roles) {
    let items = roles;
    if (keywords) {
      items = items.filter((item) => item.name?.indexOf(keywords) >= 0);
    }
    return res.json({
      data: {
        rows: items,
      },
      status: 200,
    });
  }
  return res.json({ status: 400, message: 'Failed' });
}

function deleteRoles(req: Request, res: Response, u: string, b: Request) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }

  const { id } = req.params;

  if (roles) {
    roles = roles.filter((item) => Number(item.id) !== Number(id));
    return res.json({
      data: {
        rows: roles.filter((item) => Number(item.id) !== Number(id)),
      },
      status: 200,
    });
  }
  return res.json({ status: 400, message: 'Failed' });
}

function getJSONRoles(req: Request, res: Response, u: string, b: Request) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }

  return res.json({
    data: {
      json: JSON_ROLE,
    },
    status: 200,
  });
}

export default {
  'GET /api/roles': getRoles,
  'POST /api/roles/:id': deleteRoles,
  'GET /api/json/roles': getJSONRoles,
};
