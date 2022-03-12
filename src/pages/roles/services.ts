import { request } from '@/utils/request';

export async function getJsonRole(options?: Record<string, any>) {
  return request<Record<string, any>>('/api/json/roles', {
    method: 'GET',
    data: options,
  });
}
