import { get } from 'request';

export async function getHotNews() {
  return get('/api/article', params);
}
