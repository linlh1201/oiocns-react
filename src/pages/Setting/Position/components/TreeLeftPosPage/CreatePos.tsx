import { Button } from 'antd';
import type { DataNode } from 'antd/es/tree';
import React, { useState, useEffect } from 'react';
import { UserOutlined } from '@ant-design/icons';

import { schema } from '@/ts/base';
import MarketClassifyTree from '@/components/CustomTreeComp';
import cls from './index.module.less';
import userCtrl from '@/ts/controller/setting/userCtrl';
import { IAuthority } from '@/ts/core/target/authority/iauthority';

type CreateGroupPropsType = {
  createTitle: string;
  currentKey: string;
  setCurrent: (current: schema.XTarget) => void;
  handleMenuClick: (key: string, item: any) => void;
  // 点击操作触发的事件
  authTree: IAuthority;
};

const items: DataNode[] = [
  {
    title: '管理员',
    key: 'super-manager',
    icon: <UserOutlined />,
    children: [],
  },
  {
    title: '管理员2',
    key: 'super-manager2',
    icon: <UserOutlined />,
    children: [],
  },
];

const CreatePosition: React.FC<CreateGroupPropsType> = (prop) => {
  useEffect(() => {
    getDataDetail();
  }, []);

  const getDataDetail = async () => {
    console.log('111111111', await userCtrl.Company.selectAuthorityTree(false));
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {};
  const [selectMenu, setSelectMenu] = useState<string>('');

  const handleMenuClick = (key: string, data: any) => {
    // 触发内容去变化
    console.log('点击', key, data);
  };

  const handleTitleClick = (item: any) => {
    // 触发内容去变化
    console.log('点击', item);
    // StoreContent.changeMenu(item);
  };

  const menu = ['更改岗位名称', '删除'];
  const positionList = (
    <MarketClassifyTree
      searchable
      childIcon={<UserOutlined />}
      key={selectMenu}
      handleMenuClick={handleMenuClick}
      handleTitleClick={handleTitleClick}
      treeData={[]}
      menu={menu}
      title={'全部岗位'}
    />
  );

  return (
    <div>
      <div className={cls.topMes}>
        <Button className={cls.creatgroup} type="primary" onClick={() => {}}>
          新增岗位
        </Button>

        {positionList}
      </div>
    </div>
  );
};

export default CreatePosition;
