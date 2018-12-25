import { get, post } from 'request';

export async function query(params) {
  return get('/api/user', params);
}

export async function create(params) {
  return post('/api/user', params);
}
