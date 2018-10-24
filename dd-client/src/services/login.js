import { post } from 'request';

export async function login(params) {
  console.log(post);
  return post('/api/login', params);
}
