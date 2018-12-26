import { post, get, del } from 'request';

export async function create(params) {
  return post('/api/category', params);
}

export async function query(params) {
  return get('/api/category', params);
}

export async function delcategory(params) {
  return del(`/api/category/${params}`);
}

export async function queryCategorys() {
  return get('/api/categorys');
}
