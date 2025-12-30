import React from 'react';
import { Form, Input, Button, Select, Card, Row, Col, message } from 'antd';
import type { FormComponentProps } from 'antd/lib/form';

const { Option } = Select;
const { TextArea } = Input;

interface ValidationFormValues {
  required?: string;
  length?: string;
  email?: string;
  alphanumeric?: string;
  username?: string;
  newPassword?: string;
  confirmPassword?: string;
  phone?: string;
  type?: string;
  personName?: string;
  companyName?: string;
  creditCode?: string;
  'address.province'?: string;
  'address.city'?: string;
  'address.street'?: string;
  realtime?: string;
  onblur?: string;
}

const ValidationFormComponent: React.FC<FormComponentProps> = ({ form }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    form.validateFields((err, values: ValidationFormValues) => {
      if (!err) {
        console.log('表单值:', values);
        message.success('提交成功！');
      } else {
        message.error('请检查表单填写是否正确');
      }
    });
  };

  // 自定义验证器
  const validatePassword = (_: any, value: string, callback: any) => {
    if (!value) {
      callback('请确认密码');
    } else if (value !== form.getFieldValue('newPassword')) {
      callback('两次输入的密码不一致');
    } else {
      callback();
    }
  };

  const validatePhone = (_: any, value: string, callback: any) => {
    if (!value) {
      callback('请输入手机号');
    } else if (!/^1[3-9]\d{9}$/.test(value)) {
      callback('请输入有效的手机号');
    } else {
      callback();
    }
  };

  const checkUsername = async (_: any, value: string, callback: any) => {
    if (!value) {
      callback('请输入用户名');
      return;
    }
    if (value.length < 3) {
      callback('用户名至少3个字符');
      return;
    }
    // 模拟异步验证
    await new Promise((resolve) => setTimeout(resolve, 500));
    const existingUsers = ['admin', 'root', 'test'];
    if (existingUsers.includes(value)) {
      callback('该用户名已被使用');
    } else {
      callback();
    }
  };

  const { getFieldDecorator } = form;

  return (
    <div>
      <h2>表单验证示例</h2>
      <p style={{ marginBottom: 24, color: '#666' }}>
        此表单展示了 Ant Design 3 中的各种验证规则。
      </p>

      <Form layout="vertical" onSubmit={handleSubmit}>
        {/* 基础验证 */}
        <Card title="基础验证规则" style={{ marginBottom: 24 }}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="必填项">
                {getFieldDecorator('required', {
                  rules: [{ required: true, message: '此项为必填项' }],
                })(<Input placeholder="请输入内容" />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="长度限制">
                {getFieldDecorator('length', {
                  rules: [
                    { required: true },
                    { min: 3, message: '至少3个字符' },
                    { max: 10, message: '最多10个字符' },
                  ],
                })(<Input placeholder="请输入3-10个字符" />)}
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="邮箱格式">
                {getFieldDecorator('email', {
                  rules: [
                    { required: true },
                    { type: 'email', message: '邮箱格式不正确' },
                  ],
                })(<Input placeholder="请输入邮箱" />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="正则验证（仅字母数字）">
                {getFieldDecorator('alphanumeric', {
                  rules: [
                    { required: true },
                    { pattern: /^[a-zA-Z0-9]+$/, message: '只能包含字母和数字' },
                  ],
                })(<Input placeholder="请输入字母和数字" />)}
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {/* 自定义验证器 */}
        <Card title="自定义验证器" style={{ marginBottom: 24 }}>
          <Form.Item label="用户名（异步验证）">
            {getFieldDecorator('username', {
              rules: [{ validator: checkUsername }],
            })(<Input placeholder="admin/root/test已存在" />)}
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="新密码">
                {getFieldDecorator('newPassword', {
                  rules: [
                    { required: true, message: '请输入密码' },
                    { min: 6, message: '密码至少6位' },
                  ],
                })(<Input.Password placeholder="请输入密码" />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="确认密码">
                {getFieldDecorator('confirmPassword', {
                  rules: [{ validator: validatePassword }],
                })(<Input.Password placeholder="请再次输入密码" />)}
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="手机号">
            {getFieldDecorator('phone', {
              rules: [{ validator: validatePhone }],
            })(<Input placeholder="请输入11位手机号" />)}
          </Form.Item>
        </Card>

        {/* 条件验证 */}
        <Card title="条件验证" style={{ marginBottom: 24 }}>
          <Form.Item label="类型">
            {getFieldDecorator('type', {
              initialValue: 'individual',
              rules: [{ required: true }],
            })(
              <Select placeholder="请选择类型">
                <Option value="individual">个人</Option>
                <Option value="company">企业</Option>
              </Select>
            )}
          </Form.Item>

          {form.getFieldValue('type') === 'individual' && (
            <Form.Item label="姓名">
              {getFieldDecorator('personName', {
                rules: [{ required: true, message: '请输入姓名' }],
              })(<Input placeholder="请输入姓名" />)}
            </Form.Item>
          )}

          {form.getFieldValue('type') === 'company' && (
            <div>
              <Form.Item label="公司名称">
                {getFieldDecorator('companyName', {
                  rules: [{ required: true, message: '请输入公司名称' }],
                })(<Input placeholder="请输入公司名称" />)}
              </Form.Item>
              <Form.Item label="统一社会信用代码">
                {getFieldDecorator('creditCode', {
                  rules: [
                    { required: true, message: '请输入代码' },
                    { pattern: /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/, message: '格式不正确' },
                  ],
                })(<Input placeholder="18位统一社会信用代码" />)}
              </Form.Item>
            </div>
          )}
        </Card>

        {/* 嵌套验证 */}
        <Card title="嵌套字段验证" style={{ marginBottom: 24 }}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="省份">
                {getFieldDecorator('address.province', {
                  initialValue: 'zhejiang',
                  rules: [{ required: true, message: '请选择省份' }],
                })(
                  <Select>
                    <Option value="zhejiang">浙江</Option>
                    <Option value="jiangsu">江苏</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="城市">
                {getFieldDecorator('address.city', {
                  rules: [{ required: true, message: '请选择城市' }],
                })(
                  <Select>
                    <Option value="hangzhou">杭州</Option>
                    <Option value="nanjing">南京</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="街道地址">
            {getFieldDecorator('address.street', {
              rules: [
                { required: true, message: '请输入地址' },
                { min: 5, message: '地址至少5个字符' },
              ],
            })(<TextArea rows={3} placeholder="请输入详细地址" />)}
          </Form.Item>
        </Card>

        {/* 验证时机 */}
        <Card title="验证时机" style={{ marginBottom: 24 }}>
          <Form.Item label="实时验证">
            {getFieldDecorator('realtime', {
              validateTrigger: 'onChange',
              rules: [{ required: true, message: '必填' }],
            })(<Input placeholder="输入时验证" />)}
          </Form.Item>

          <Form.Item label="失焦验证">
            {getFieldDecorator('onblur', {
              validateTrigger: 'onBlur',
              rules: [{ required: true, message: '必填' }],
            })(<Input placeholder="失焦时验证" />)}
          </Form.Item>
        </Card>

        {/* 按钮组 */}
        <Card>
          <Form.Item style={{ marginBottom: 0 }}>
            <Button type="primary" htmlType="submit" style={{ marginRight: 16 }}>
              提交
            </Button>
            <Button htmlType="button" onClick={() => form.resetFields()} style={{ marginRight: 16 }}>
              重置
            </Button>
            <Button
              type="link"
              onClick={() => {
                form.validateFields((err: unknown) => {
                  if (!err) {
                    message.success('表单验证通过！');
                  } else {
                    message.error('表单验证失败');
                  }
                });
              }}
            >
              手动触发验证
            </Button>
            <Button
              type="link"
              onClick={() => {
                form.resetFields();
                message.info('已清除验证信息');
              }}
            >
              清除验证
            </Button>
          </Form.Item>
        </Card>
      </Form>
    </div>
  );
};

const WrappedValidationForm = Form.create({
  name: 'validation_form',
})(ValidationFormComponent);

export default function ValidationFormPage() {
  return <WrappedValidationForm />;
}
