import { post } from 'request';

export async function login(params) {
  return post('/api/login', params);
}
