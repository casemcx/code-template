import React, { useState } from 'react';
import { Form, Input, Button, Select, DatePicker, Card, message, Divider } from 'antd';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import type { FormComponentProps } from 'antd/lib/form';

const { Option } = Select;

interface DynamicFormValues {
  users?: Array<{ name?: string; age?: string }>;
  questions?: Array<{ question?: string; answer?: string }>;
  education?: Array<{
    school?: string;
    major?: string;
    degree?: string;
    graduationYear?: any;
  }>;
}

const DynamicFormComponent: React.FC<FormComponentProps> = ({ form }) => {
  const [userKeys, setUserKeys] = useState<number[]>([0]);
  const [questionKeys, setQuestionKeys] = useState<number[]>([0]);
  const [educationKeys, setEducationKeys] = useState<number[]>([0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    form.validateFields((err, values: DynamicFormValues) => {
      if (!err) {
        console.log('表单值:', values);
        message.success('提交成功！');
      }
    });
  };

  const addUser = () => {
    const nextKey = userKeys.length > 0 ? Math.max(...userKeys) + 1 : 0;
    setUserKeys([...userKeys, nextKey]);
  };

  const removeUser = (key: number) => {
    setUserKeys(userKeys.filter((k) => k !== key));
  };

  const addQuestion = () => {
    const nextKey = questionKeys.length > 0 ? Math.max(...questionKeys) + 1 : 0;
    setQuestionKeys([...questionKeys, nextKey]);
  };

  const removeQuestion = (key: number) => {
    setQuestionKeys(questionKeys.filter((k) => k !== key));
  };

  const addEducation = () => {
    const nextKey = educationKeys.length > 0 ? Math.max(...educationKeys) + 1 : 0;
    setEducationKeys([...educationKeys, nextKey]);
  };

  const removeEducation = (key: number) => {
    setEducationKeys(educationKeys.filter((k) => k !== key));
  };

  const { getFieldDecorator } = form;

  return (
    <div>
      <h2>动态表单示例</h2>
      <p style={{ marginBottom: 24, color: '#666' }}>
        此表单展示了 Ant Design 3 中如何动态增减表单项。
      </p>

      <Form layout="vertical" onSubmit={handleSubmit}>
        {/* 示例1：动态添加用户 */}
        <Card title="示例1：动态添加用户" style={{ marginBottom: 24 }}>
          {userKeys.map((key, index) => (
            <Card
              key={key}
              size="small"
              type="inner"
              style={{ marginBottom: 16 }}
              extra={
                userKeys.length > 1 ? (
                  <MinusCircleOutlined
                    onClick={() => removeUser(key)}
                    style={{ fontSize: 20, color: '#ff4d4f', cursor: 'pointer' }}
                  />
                ) : null
              }
            >
              <Form.Item label={`用户 ${index + 1} 姓名`}>
                {getFieldDecorator(`users[${key}].name`, {
                  rules: [{ required: true, message: '请输入姓名' }],
                })(<Input placeholder="请输入姓名" style={{ width: 200 }} />)}
              </Form.Item>
              <Form.Item label={`用户 ${index + 1} 年龄`}>
                {getFieldDecorator(`users[${key}].age`, {
                  rules: [{ required: true, message: '请输入年龄' }],
                })(<Input type="number" placeholder="请输入年龄" style={{ width: 150 }} />)}
              </Form.Item>
            </Card>
          ))}
          <Button type="dashed" onClick={addUser} block>
            <PlusCircleOutlined /> 添加用户
          </Button>
        </Card>

        {/* 示例2：动态问答列表 */}
        <Card title="示例2：动态问答列表" style={{ marginBottom: 24 }}>
          {questionKeys.map((key, index) => (
            <Card
              key={key}
              size="small"
              type="inner"
              style={{ marginBottom: 16 }}
              extra={
                questionKeys.length > 1 ? (
                  <Button
                    type="link"
                    onClick={() => removeQuestion(key)}
                    style={{ color: '#ff4d4f' }}
                  >
                    <MinusCircleOutlined /> 删除
                  </Button>
                ) : null
              }
            >
              <Form.Item label={`问题 ${index + 1}`}>
                {getFieldDecorator(`questions[${key}].question`, {
                  rules: [{ required: true, message: '请输入问题' }],
                })(<Input.TextArea rows={2} placeholder="请输入问题" maxLength={200} />)}
              </Form.Item>
              <Form.Item label={`答案 ${index + 1}`}>
                {getFieldDecorator(`questions[${key}].answer`, {
                  rules: [{ required: true, message: '请输入答案' }],
                })(<Input.TextArea rows={3} placeholder="请输入答案" maxLength={500} />)}
              </Form.Item>
            </Card>
          ))}
          <Button type="dashed" onClick={addQuestion} block>
            <PlusCircleOutlined /> 添加问答
          </Button>
        </Card>

        {/* 示例3：动态教育经历 */}
        <Card title="示例3：动态教育经历" style={{ marginBottom: 24 }}>
          {educationKeys.map((key, index) => (
            <div key={key}>
              <Divider orientation="left">
                <span style={{ fontSize: 16, fontWeight: 'bold' }}>教育经历 {index + 1}</span>
                {educationKeys.length > 1 && (
                  <Button
                    type="link"
                    onClick={() => removeEducation(key)}
                    style={{ marginLeft: 16, color: '#ff4d4f' }}
                  >
                    <MinusCircleOutlined /> 删除此条
                  </Button>
                )}
              </Divider>
              <Card size="small">
                <Form.Item label="学校名称">
                  {getFieldDecorator(`education[${key}].school`, {
                    rules: [{ required: true, message: '请输入学校名称' }],
                  })(<Input placeholder="请输入学校名称" />)}
                </Form.Item>
                <Form.Item label="专业">
                  {getFieldDecorator(`education[${key}].major`, {
                    rules: [{ required: true, message: '请输入专业' }],
                  })(<Input placeholder="请输入专业" />)}
                </Form.Item>
                <Form.Item label="学历">
                  {getFieldDecorator(`education[${key}].degree`, {
                    rules: [{ required: true, message: '请选择学历' }],
                  })(
                    <Select placeholder="请选择学历">
                      <Option value="bachelor">本科</Option>
                      <Option value="master">硕士</Option>
                      <Option value="doctor">博士</Option>
                    </Select>
                  )}
                </Form.Item>
                <Form.Item label="毕业时间">
                  {getFieldDecorator(`education[${key}].graduationYear`, {
                    rules: [{ required: true, message: '请选择毕业年份' }],
                  })(<DatePicker mode="year" style={{ width: '100%' }} placeholder="请选择年份" />)}
                </Form.Item>
              </Card>
            </div>
          ))}
          <Button type="dashed" onClick={addEducation} block>
            <PlusCircleOutlined /> 添加教育经历
          </Button>
        </Card>

        {/* 按钮组 */}
        <Card>
          <Form.Item style={{ marginBottom: 0 }}>
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
        </Card>
      </Form>
    </div>
  );
};

const WrappedDynamicForm = Form.create({
  name: 'dynamic_form',
})(DynamicFormComponent);

export default function DynamicFormPage() {
  return <WrappedDynamicForm />;
}
