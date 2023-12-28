import { IDirectory } from '@/ts/core';
import { Modal, Button } from 'antd';
import React, { useState, useEffect } from 'react';
import { IRepository } from '@/ts/core/thing/standard/repository';
import SelectIdentity from '@/components/Common/SelectIdentity';
import ShareShowComp from '@/components/Common/ShareShowComp';
interface Iprops {
  current: IDirectory | IRepository;
  finished: () => void;
}

const WarehousePermission = (props: Iprops) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentData, setCurrentData] = useState<{ id: string; name: string }>();
  useEffect(() => {
    setCurrentData({
      id: '123',
      name: '子安小',
    });
  }, [props.current]);
  return (
    <>
      <Modal
        width={600}
        title="设立仓库管理者"
        open={true}
        destroyOnClose={true}
        cancelButtonProps={{
          style: {
            display: 'none',
          },
        }}
        onOk={() => {
          props.finished();
        }}
        onCancel={() => props.finished()}>
        <>
          <Button
            onClick={() => {
              setIsOpen(true);
            }}>
            选择角色
          </Button>
          {currentData && currentData.id != '1' && (
            <ShareShowComp
              departData={[currentData]}
              deleteFuc={(_) => {
                // props.current.destId = '';
                // props.current.destName = '';
                setCurrentData(undefined);
                // props.refresh();
              }}
            />
          )}
        </>
      </Modal>
      <SelectIdentity
        open={isOpen}
        exclude={[]}
        multiple={false}
        space={props.current.directory.target.space}
        finished={(selected) => {
          console.log(selected);
          
          setCurrentData(selected[0]);
          setIsOpen(false);
        }}
      />
    </>
  );
};

export default WarehousePermission;
