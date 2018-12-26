import { upload, post, get, del } from 'request';

export async function uploadArticleImg(params) {
  return upload('/api/upload/editor', params);
}

export async function create(params) {
  return post('/api/article', params);
}

export async function query(params) {
  return get('/api/article', params);
}

export async function delArticle(params) {
  return del(`/api/article/${params}`);
}
