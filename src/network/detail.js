import { request } from './request';
export function getDetailGoodsdata(iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  });
}
export function getDetailRecommend() {
  return request({
    url: '/recommend'
  });
}
