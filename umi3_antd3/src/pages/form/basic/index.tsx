import React from 'react';
import { Form, Input, InputNumber, Button, Select, Switch, Radio, Slider, DatePicker, TimePicker, message } from 'antd';
import type { FormComponentProps } from 'antd/lib/form';

const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

interface BasicFormValues {
  username?: string;
  password?: string;
  age?: number;
  email?: string;
  phone?: string;
  website?: string;
  bio?: string;
  gender?: string;
  country?: string;
  city?: string;
  notification?: boolean;
  publicProfile?: boolean;
  subscription?: string;
  experience?: number;
  skillLevel?: number;
  birthday?: any;
  availableTime?: any;
  dateRange?: any;
}

const BasicFormComponent: React.FC<FormComponentProps> = ({ form }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    form.validateFields((err, values: BasicFormValues) => {
      if (!err) {
        console.log('表单值:', values);
        message.success('提交成功！');
      }
    });
  };

  const handleReset = () => {
    form.resetFields();
  };

  const { getFieldDecorator } = form;

  return (
    <div>
      <h2>基础表单示例</h2>
      <p style={{ marginBottom: 24, color: '#666' }}>
        此表单展示了 Ant Design 3 中最常用的表单控件，包括输入框、数字输入、选择器、开关、单选、滑块、日期选择等。
      </p>

      <Form layout="vertical" onSubmit={handleSubmit}>
        {/* 基本信息 */}
        <h3 style={{ marginBottom: 16, color: '#1890ff' }}>基本信息</h3>

        <Form.Item label="用户名">
          {getFieldDecorator('username', {
            rules: [
              { required: true, message: '请输入用户名' },
              { min: 3, max: 20, message: '用户名长度在 3 到 20 个字符' },
              { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名只能包含字母、数字和下划线' },
            ],
          })(<Input placeholder="请输入用户名" />)}
        </Form.Item>

        <Form.Item label="密码">
          {getFieldDecorator('password', {
            rules: [
              { required: true, message: '请输入密码' },
              { min: 6, message: '密码至少 6 个字符' },
            ],
          })(<Input.Password placeholder="请输入密码" />)}
        </Form.Item>

        <Form.Item label="年龄">
          {getFieldDecorator('age', {
            rules: [
              { required: true, message: '请输入年龄' },
              { type: 'number', min: 1, max: 150, message: '年龄在 1-150 之间' },
            ],
            initialValue: 25,
          })(<InputNumber placeholder="请输入年龄" style={{ width: '100%' }} min={1} max={150} />)}
        </Form.Item>

        <Form.Item label="邮箱">
          {getFieldDecorator('email', {
            rules: [
              { required: true, message: '请输入邮箱' },
              { type: 'email', message: '请输入有效的邮箱地址' },
            ],
          })(<Input placeholder="example@email.com" />)}
        </Form.Item>

        <Form.Item label="手机号">
          {getFieldDecorator('phone', {
            rules: [
              { required: true, message: '请输入手机号' },
              { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号' },
            ],
          })(<Input placeholder="请输入11位手机号" />)}
        </Form.Item>

        <Form.Item label="个人网站">
          {getFieldDecorator('website', {
            rules: [{ type: 'url', message: '请输入有效的网址' }],
          })(<Input placeholder="https://example.com" />)}
        </Form.Item>

        <Form.Item label="个人简介">
          {getFieldDecorator('bio', {
            rules: [{ max: 200, message: '简介最多200个字符' }],
          })(<TextArea rows={4} placeholder="请输入个人简介（最多200字）" maxLength={200} />)}
        </Form.Item>

        {/* 选择项 */}
        <h3 style={{ marginBottom: 16, marginTop: 32, color: '#1890ff' }}>选择项</h3>

        <Form.Item label="性别">
          {getFieldDecorator('gender', {
            initialValue: 'male',
          })(
            <Radio.Group>
              <Radio value="male">男</Radio>
              <Radio value="female">女</Radio>
              <Radio value="other">其他</Radio>
            </Radio.Group>
          )}
        </Form.Item>

        <Form.Item label="国家/地区">
          {getFieldDecorator('country', {
            initialValue: 'china',
            rules: [{ required: true, message: '请选择国家/地区' }],
          })(
            <Select placeholder="请选择国家/地区">
              <Option value="china">中国</Option>
              <Option value="usa">美国</Option>
              <Option value="uk">英国</Option>
              <Option value="japan">日本</Option>
            </Select>
          )}
        </Form.Item>

        <Form.Item label="城市">
          {getFieldDecorator('city', {
            rules: [{ required: true, message: '请选择城市' }],
          })(
            <Select mode="multiple" placeholder="请选择城市（可多选）">
              <Option value="beijing">北京</Option>
              <Option value="shanghai">上海</Option>
              <Option value="guangzhou">广州</Option>
              <Option value="shenzhen">深圳</Option>
            </Select>
          )}
        </Form.Item>

        {/* 开关 */}
        <h3 style={{ marginBottom: 16, marginTop: 32, color: '#1890ff' }}>开关设置</h3>

        <Form.Item label="接收通知">
          {getFieldDecorator('notification', {
            initialValue: true,
            valuePropName: 'checked',
          })(<Switch />)}
        </Form.Item>

        <Form.Item label="公开个人资料">
          {getFieldDecorator('publicProfile', {
            initialValue: false,
            valuePropName: 'checked',
          })(<Switch />)}
        </Form.Item>

        {/* 订阅类型 */}
        <h3 style={{ marginBottom: 16, marginTop: 32, color: '#1890ff' }}>订阅类型</h3>

        <Form.Item label="订阅计划">
          {getFieldDecorator('subscription', {
            initialValue: 'free',
          })(
            <Radio.Group>
              <Radio value="free">免费版</Radio>
              <Radio value="pro">专业版</Radio>
              <Radio value="enterprise">企业版</Radio>
            </Radio.Group>
          )}
        </Form.Item>

        {/* 滑块 */}
        <h3 style={{ marginBottom: 16, marginTop: 32, color: '#1890ff' }}>滑块控制</h3>

        <Form.Item label="工作经验（年）">
          {getFieldDecorator('experience', {
            initialValue: 3,
          })(<Slider min={0} max={20} marks={{ 0: '0年', 5: '5年', 10: '10年', 20: '20年' }} />)}
        </Form.Item>

        <Form.Item label="技能熟练度">
          {getFieldDecorator('skillLevel', {
            initialValue: 60,
          })(<Slider min={0} max={100} marks={{ 0: '初学', 50: '熟练', 100: '精通' }} />)}
        </Form.Item>

        {/* 日期时间 */}
        <h3 style={{ marginBottom: 16, marginTop: 32, color: '#1890ff' }}>日期时间</h3>

        <Form.Item label="出生日期">
          {getFieldDecorator('birthday', {
            rules: [{ required: true, message: '请选择出生日期' }],
          })(<DatePicker style={{ width: '100%' }} placeholder="请选择日期" />)}
        </Form.Item>

        <Form.Item label="可用时间段">
          {getFieldDecorator('availableTime', {
            rules: [{ required: true, message: '请选择时间段' }],
          })(<TimePicker style={{ width: '100%' }} placeholder="请选择时间" format="HH:mm" />)}
        </Form.Item>

        <Form.Item label="日期范围">
          {getFieldDecorator('dateRange', {
            rules: [{ required: true, message: '请选择日期范围' }],
          })(<RangePicker style={{ width: '100%' }} />)}
        </Form.Item>

        {/* 按钮组 */}
        <Form.Item style={{ marginTop: 48 }}>
          <Button type="primary" htmlType="submit" style={{ marginRight: 16 }}>
            提交
          </Button>
          <Button htmlType="button" onClick={handleReset} style={{ marginRight: 16 }}>
            重置
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

const WrappedBasicForm = Form.create({
  name: 'basic_form',
})(BasicFormComponent);

export default function BasicFormPage() {
  return <WrappedBasicForm />;
}
