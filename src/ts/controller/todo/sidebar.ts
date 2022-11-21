import {
  AuditOutlined,
  DatabaseOutlined,
  FileTextOutlined,
  FundOutlined,
  HomeOutlined,
  // PlusOutlined,
  ShopOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from '@ant-design/icons';
// TODO 获取应用待办
const apps = [
  { label: '公益仓', key: '/todo/gyc', icon: HomeOutlined },
  { label: '办公OA', key: '/todo/oa', icon: FileTextOutlined },
  { label: '资产管理', key: '/todo/asset', icon: FundOutlined },
  {
    label: '资产监控',
    key: '/todo/monitor',
    icon: DatabaseOutlined,
    children: [],
  },
];
// 平台待办
const systemTodo = [
  { label: '好友申请', key: '/todo/friend', icon: UserOutlined },
  { label: '单位审核', key: '/todo/org', icon: AuditOutlined },
  {
    label: '商店审核',
    key: 'appAndStore',
    icon: ShopOutlined,
    children: [
      {
        label: '应用上架',
        key: '/todo/app',
        icon: ShopOutlined,
      },
      { label: '加入市场', key: '/todo/store', icon: ShopOutlined },
    ],
  },
  { label: '订单管理', key: '/todo/order', icon: UnorderedListOutlined },
];
const muneItems = [
  {
    type: 'group',
    label: '平台待办',
    children: systemTodo,
  },
  {
    type: 'group',
    label: '应用待办',
    children: apps,
  },
];
class SideBar {
  private _topMenu = systemTodo;
  private _bottomMenu = apps;
  public menuItems = muneItems;

  public handleClickMenu = () => {};
}

export default new SideBar();
