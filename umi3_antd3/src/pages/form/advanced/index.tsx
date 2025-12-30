import React, { useState } from 'react';
import { Form, Input, InputNumber, Button, Select, Checkbox, DatePicker, Upload, message, Card, Row, Col } from 'antd';
import { UploadOutlined, PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import type { FormComponentProps } from 'antd/lib/form';

const { Option } = Select;
const { TextArea } = Input;

interface AdvancedFormValues {
  name?: string;
  employeeId?: string;
  department?: string;
  level?: string;
  skills?: string[];
  address?: {
    province?: string;
    city?: string;
    district?: string;
    detail?: string;
  };
  avatar?: any;
  attachments?: any;
  workHistory?: Array<{
    company?: string;
    position?: string;
    description?: string;
  }>;
  agreement?: boolean;
  newsletter?: boolean;
}

const AdvancedFormComponent: React.FC<FormComponentProps> = ({ form }) => {
  const [workHistoryKeys, setWorkHistoryKeys] = useState<number[]>([0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    form.validateFields((err, values: AdvancedFormValues) => {
      if (!err) {
        console.log('表单值:', values);
        message.success('提交成功！');
      }
    });
  };

  const addWorkHistory = () => {
    const nextKey = workHistoryKeys.length > 0 ? Math.max(...workHistoryKeys) + 1 : 0;
    setWorkHistoryKeys([...workHistoryKeys, nextKey]);
  };

  const removeWorkHistory = (key: number) => {
    if (workHistoryKeys.length === 1) {
      message.warning('至少保留一条工作经历');
      return;
    }
    setWorkHistoryKeys(workHistoryKeys.filter((k) => k !== key));
  };

  const { getFieldDecorator } = form;

  const uploadProps = {
    name: 'file',
    action: '/api/upload',
    onChange: (info: any) => {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} 文件上传成功`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 文件上传失败`);
      }
    },
  };

  return (
    <div>
      <h2>高级表单示例</h2>
      <p style={{ marginBottom: 24, color: '#666' }}>
        此表单展示了 Ant Design 3 中的复杂表单场景，包括网格布局、省市联动、文件上传、动态表单项等。
      </p>

      <Form layout="vertical" onSubmit={handleSubmit}>
        {/* 个人信息卡片 */}
        <Card title="个人信息" style={{ marginBottom: 24 }}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="姓名">
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: '请输入姓名' }],
                })(<Input placeholder="请输入姓名" />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="工号">
                {getFieldDecorator('employeeId', {
                  rules: [{ required: true, message: '请输入工号' }],
                })(<Input placeholder="请输入工号" />)}
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="部门">
                {getFieldDecorator('department', {
                  rules: [{ required: true, message: '请选择部门' }],
                })(
                  <Select placeholder="请选择部门">
                    <Option value="tech">技术部</Option>
                    <Option value="product">产品部</Option>
                    <Option value="design">设计部</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="职级">
                {getFieldDecorator('level', {
                  rules: [{ required: true, message: '请选择职级' }],
                })(
                  <Select placeholder="请选择职级">
                    <Option value="p5">P5</Option>
                    <Option value="p6">P6</Option>
                    <Option value="p7">P7</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="技能标签">
            {getFieldDecorator('skills', {
              initialValue: ['javascript'],
              rules: [{ required: true, message: '请选择技能' }],
            })(
              <Select mode="multiple" placeholder="请选择技能（可多选）">
                <Option value="javascript">JavaScript</Option>
                <Option value="typescript">TypeScript</Option>
                <Option value="react">React</Option>
                <Option value="vue">Vue</Option>
                <Option value="nodejs">Node.js</Option>
              </Select>
            )}
          </Form.Item>
        </Card>

        {/* 联系地址卡片 */}
        <Card title="联系地址" style={{ marginBottom: 24 }}>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="省份">
                {getFieldDecorator('address.province', {
                  initialValue: 'zhejiang',
                  rules: [{ required: true, message: '请选择省份' }],
                })(
                  <Select placeholder="请选择省份">
                    <Option value="zhejiang">浙江省</Option>
                    <Option value="jiangsu">江苏省</Option>
                    <Option value="guangdong">广东省</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="城市">
                {getFieldDecorator('address.city', {
                  rules: [{ required: true, message: '请选择城市' }],
                })(
                  <Select placeholder="请选择城市">
                    <Option value="hangzhou">杭州</Option>
                    <Option value="ningbo">宁波</Option>
                    <Option value="nanjing">南京</Option>
                    <Option value="suzhou">苏州</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="区县">
                {getFieldDecorator('address.district')(<Input placeholder="请输入区县" />)}
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="详细地址">
            {getFieldDecorator('address.detail', {
              rules: [{ required: true, message: '请输入详细地址' }],
            })(<TextArea rows={3} placeholder="请输入详细地址" />)}
          </Form.Item>
        </Card>

        {/* 文件上传卡片 */}
        <Card title="文件上传" style={{ marginBottom: 24 }}>
          <Form.Item label="头像上传">
            {getFieldDecorator('avatar', {
              valuePropName: 'fileList',
              getValueFromEvent: (e: any) => {
                if (Array.isArray(e)) {
                  return e;
                }
                return e && e.fileList;
              },
            })(<Upload {...uploadProps} listType="picture-card">
                  <div>
                    <PlusCircleOutlined />
                    <div style={{ marginTop: 8 }}>上传</div>
                  </div>
                </Upload>)}
          </Form.Item>

          <Form.Item label="附件上传">
            {getFieldDecorator('attachments', {
              valuePropName: 'fileList',
              getValueFromEvent: (e: any) => {
                if (Array.isArray(e)) {
                  return e;
                }
                return e && e.fileList;
              },
            })(<Upload {...uploadProps}>
                  <Button><UploadOutlined /> 点击上传</Button>
                </Upload>)}
          </Form.Item>
        </Card>

        {/* 工作经历卡片 - 动态表单 */}
        <Card title="工作经历（动态增减）" style={{ marginBottom: 24 }}>
          {workHistoryKeys.map((key, index) => (
            <Card
              key={key}
              size="small"
              style={{ marginBottom: 16 }}
              extra={
                workHistoryKeys.length > 1 ? (
                  <Button
                    type="link"
                    onClick={() => removeWorkHistory(key)}
                  >
                    <MinusCircleOutlined /> 删除
                  </Button>
                ) : null
              }
            >
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label={`公司名称 ${index + 1}`}>
                    {getFieldDecorator(`workHistory[${key}].company`, {
                      rules: [{ required: true, message: '请输入公司名称' }],
                    })(<Input placeholder="请输入公司名称" />)}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label={`职位 ${index + 1}`}>
                    {getFieldDecorator(`workHistory[${key}].position`, {
                      rules: [{ required: true, message: '请输入职位' }],
                    })(<Input placeholder="请输入职位" />)}
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item label={`工作描述 ${index + 1}`}>
                {getFieldDecorator(`workHistory[${key}].description`)(
                  <TextArea rows={3} placeholder="请输入工作描述" />
                )}
              </Form.Item>
            </Card>
          ))}
          <Button type="dashed" onClick={addWorkHistory} block>
            <PlusCircleOutlined /> 添加工作经历
          </Button>
        </Card>

        {/* 其他信息卡片 */}
        <Card title="其他信息" style={{ marginBottom: 24 }}>
          <Form.Item>
            {getFieldDecorator('agreement', {
              valuePropName: 'checked',
              rules: [
                {
                  validator: (_: any, value: boolean) =>
                    value ? Promise.resolve() : Promise.reject(new Error('请同意用户协议')),
                },
              ],
            })(<Checkbox>我已阅读并同意 <a href="#">用户协议</a> 和 <a href="#">隐私政策</a></Checkbox>)}
          </Form.Item>

          <Form.Item>
            {getFieldDecorator('newsletter', {
              valuePropName: 'checked',
              initialValue: true,
            })(<Checkbox>订阅我们的新闻通讯</Checkbox>)}
          </Form.Item>
        </Card>

        {/* 按钮组 */}
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ marginRight: 16 }}>
            提交表单
          </Button>
          <Button htmlType="button" onClick={() => form.resetFields()} style={{ marginRight: 16 }}>
            重置表单
          </Button>
          <Button
            type="link"
            onClick={() => {
              const values = form.getFieldsValue();
              console.log('当前表单值:', values);
              message.info('请查看控制台获取表单数据');
            }}
          >
            查看数据
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const WrappedAdvancedForm = Form.create({
  name: 'advanced_form',
})(AdvancedFormComponent);

export default function AdvancedFormPage() {
  return <WrappedAdvancedForm />;
}
