// power = { 1: "查看菜单", 2: "查看详情", 3: "新增", 4: "修改", 5: "删除", 6: "审核", 7: "上传" }
// options = { MENU: "查看菜单", DETAIL: "查看详情", ADD: "新增", UPDATE: "修改", DELETE: "删除", CHECK: "审核", UPLOAD: "上传" }
import _ from 'lodash';

const menu = [
  // dashboard
  {
    id: _.uniqueId(),
    key: 'home',
    name: '管理平台',
    icon: 'laptop'
  },
  // account
  {
    id: _.uniqueId(),
    key: 'articles',
    name: '用户管理',
    icon: 'inbox',
    clickable: false,
    children: []
  }
];

export default menu;
