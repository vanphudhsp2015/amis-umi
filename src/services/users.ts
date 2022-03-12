import { request } from '@/utils/request';

export async function login(options?: Record<string, any>) {
  return request<Record<string, any>>('/api/login', {
    method: 'POST',
    data: options,
  });
}
