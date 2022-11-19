/*
 * @Author: zhangqiang 1196217890@qq.com
 * @Date: 2022-11-14 16:43:05
 * @LastEditors: zhangqiang 1196217890@qq.com
 * @LastEditTime: 2022-11-19 17:21:02
 * @FilePath: /oiocns-react/src/pages/Setting/Dept/components/EditCustomModal/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect } from 'react';
import { Modal, Form, Input, Row, Col, Space, Button } from 'antd';
import cls from './index.module.less';
import UploadAvatar from '../UploadAvatar';
/* 
  编辑
*/
interface Iprops {
  title: string;
  open: boolean;
  onOk: () => void;
  handleOk: () => void;
  handleCancel: ()=> void;
}

const { TextArea } = Input;

const EditCustomModal = (props: Iprops) => {
  const { open, title, onOk, handleOk, handleCancel } = props;
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      name: '顶顶保安公司',
      code: '91310000MA1H3NAH64',
      describe: '顶顶顶顶顶顶顶',
    });
  }, []);
  
  return (
    <div className={cls['edit-custom-modal']}>
      <Modal
        title={title}
        open={open}
        onOk={handleOk}
        onCancel={()=>handleCancel()}
        getContainer={false}
        footer={null}>
        <Form form={form} name="control-hooks">
          <Row>
            <Col span={12}>
              <Form.Item label="头像" name="avatar">
                <UploadAvatar />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item name="name" label="单位名称2">
                <Input placeholder="请输入单位名称" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="code" label="单位编号">
                <Input placeholder="请输入单位编号" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item name="name" label="单位名称">
                <Input placeholder="请输入单位名称" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="code" label="单位编号">
                <Input placeholder="请输入单位编号" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item name="describe" label="单位描述">
                <TextArea
                  // value={value}
                  // onChange={(e) => setValue(e.target.value)}
                  placeholder="请输入单位描述"
                  autoSize={{ minRows: 1, maxRows: 1 }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row justify="end">
            <Space>
              <Button
                type="primary"
                onClick={() => {
                  onOk();
                }}>
                完成
              </Button>
            </Space>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default EditCustomModal;
