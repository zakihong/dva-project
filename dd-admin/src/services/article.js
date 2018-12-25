import { upload, post, get } from 'request';

export async function uploadArticleImg(params) {
  return upload('/api/upload/editor', params);
}

export async function create(params) {
  return post('/api/article', params);
}

export async function query(params) {
  return get('/api/article', params);
}
