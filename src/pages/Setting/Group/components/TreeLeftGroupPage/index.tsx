import { Button } from 'antd';
import type { TreeProps } from 'antd/es/tree';
import React, { useState, useEffect } from 'react';
import cls from './index.module.less';
import { IGroup } from '@/ts/core/target/itarget';
import useCtrlUpdate from '@/hooks/useCtrlUpdate';
import userCtrl from '@/ts/controller/setting/userCtrl';
import { getUuid } from '@/utils/tools';
import MarketClassifyTree from '@/components/CustomTreeComp';
import { PlusOutlined } from '@ant-design/icons';

type CreateGroupPropsType = {
  currentKey: string;
  setCurrent: (current: IGroup | undefined) => void;
  handleMenuClick: (key: string, item: any) => void; // 点击操作触发的事件
  [key: string]: any;
};

const Creategroup: React.FC<CreateGroupPropsType> = ({ handleMenuClick, setCurrent }) => {
  const [key] = useCtrlUpdate(userCtrl);
  const [treeData, setTreeData] = useState<any[]>([]);

  useEffect(() => {
    if (userCtrl.isCompanySpace) {
      initData(true);
    }
  }, [key]);

  const initData = async (reload: boolean) => {
    const data = await userCtrl?.company.getJoinedGroups(reload);
    // 创建的集团， 加入的集团
    if (data?.length) {
      setCurrent(data[0]);
      const tree = data.map((n: any) => {
        return createTreeDom(n);
      });
      setTreeData(tree);
    } else {
      setCurrent(undefined);
      setTreeData([]);
    }
  };
  /** 创建节点 */
  const createTreeDom = (n: IGroup) => {
    const { target } = n;
    return {
      key: target.id + getUuid(),
      title: target.name,
      icon: target.avatar,
      // children: [],
      isLeaf: false,
      target: n,
    };
  };

  const updateTreeData = (list: any[], key: React.Key, children: any[]): any[] =>
    list.map((node) => {
      if (node.key === key) {
        return {
          ...node,
          children,
          isLeaf: children.length == 0,
        };
      }
      if (node.children) {
        return {
          ...node,
          children: updateTreeData(node.children, key, children),
        };
      }
      return node;
    });

  const loadDept = async ({ key, children, target }: any) => {
    if (children) {
      return;
    }
    const deptChild: IGroup[] = await target.loadSubTeam(false);
    setTreeData((origin) =>
      updateTreeData(
        origin,
        key,
        deptChild.map((n) => createTreeDom(n)),
      ),
    );
  };

  const onSelect: TreeProps['onSelect'] = (selectedKeys, info: any) => {
    selectedKeys;
    if (info.selected) {
      setCurrent(info.node.target);
    }
  };

  const menu = ['新增集团', '刷新'];

  return (
    <div>
      <div className={cls.topMes}>
        <Button
          className={cls.creatgroup}
          type="text"
          icon={<PlusOutlined className={cls.addIcon} />}
          onClick={() => handleMenuClick('new', {})}
        />

        <MarketClassifyTree
          className={cls['docTree']}
          id={key}
          showIcon
          searchable
          handleMenuClick={handleMenuClick}
          treeData={treeData}
          title={'集团管理'}
          menu={menu}
          loadData={loadDept}
          onSelect={onSelect}
        />
      </div>
    </div>
  );
};

export default Creategroup;
