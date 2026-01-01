import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Typography, Button } from 'antd';
import { history } from 'umi';
import {
  FormOutlined,
  CheckCircleOutlined,
  PlusCircleOutlined,
  SafetyOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';
import styles from './index.less';

const { Title, Paragraph } = Typography;

export default function IndexPage() {
  const handleNavigate = (path: string) => {
    history.push(path);
  };
  const formExamples = [
    {
      title: '基础表单',
      description: '包含常用的表单控件示例，如输入框、选择器、日期选择等',
      icon: <FormOutlined style={{ fontSize: 32, color: '#1890ff' }} />,
      path: '/form/basic',
      color: '#1890ff',
      features: ['输入框、密码框', '数字输入、邮箱、手机号', '单选、多选、下拉选择', '开关、滑块', '日期时间选择'],
    },
    {
      title: '高级表单',
      description: '复杂布局和联动示例，包括省市联动、文件上传、嵌套数据等',
      icon: <CheckCircleOutlined style={{ fontSize: 32, color: '#52c41a' }} />,
      path: '/form/advanced',
      color: '#52c41a',
      features: ['网格布局（Row/Col）', '省市联动选择', '文件上传', '嵌套数据结构', '动态工作经历'],
    },
    {
      title: '动态表单',
      description: '动态增减表单项，支持动态添加用户、问答、教育经历等',
      icon: <PlusCircleOutlined style={{ fontSize: 32, color: '#faad14' }} />,
      path: '/form/dynamic',
      color: '#faad14',
      features: ['动态添加用户', '动态问答列表', '动态教育经历', '动态联系方式', 'Form.List 使用'],
    },
    {
      title: '表单验证',
      description: '各种验证规则示例，包括同步验证、异步验证、自定义验证器等',
      icon: <SafetyOutlined style={{ fontSize: 32, color: '#f5222d' }} />,
      path: '/form/validation',
      color: '#f5222d',
      features: ['基础验证规则', '自定义验证器', '异步验证', '条件验证', '嵌套字段验证'],
    },
  ];

  const [value, setValue] = useState('');

  useEffect(() => {
    console.log('value is change')

    return () => {
      console.log('value is update')
    }
  }, [value])

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <input value={value} onChange={(e) => setValue(e.target.value)} />
        <Title level={1} className={styles.title}>
          Ant Design 表单示例集
        </Title>
        <Paragraph className={styles.subtitle}>
          基于 Umi 3 + Ant Design 3 + TypeScript 构建的完整表单示例系统
        </Paragraph>
      </div>

      <div className={styles.content}>
        <Title level={2} style={{ marginBottom: 24 }}>
          快速导航
        </Title>
        <Row gutter={[24, 24]}>
          {formExamples.map((example) => (
            <Col xs={24} sm={12} lg={6} key={example.path}>
              <Card
                hoverable
                className={styles.card}
                style={{ borderTop: `3px solid ${example.color}` }}
              >
                <div className={styles.cardIcon}>{example.icon}</div>
                <Title level={4} style={{ marginTop: 16, marginBottom: 8 }}>
                  {example.title}
                </Title>
                <Paragraph className={styles.cardDescription}>
                  {example.description}
                </Paragraph>
                <div className={styles.features}>
                  {example.features.map((feature, index) => (
                    <div key={index} className={styles.featureItem}>
                      • {feature}
                    </div>
                  ))}
                </div>
                <Button
                  type="primary"
                  size="small"
                  style={{ marginTop: 16 }}
                  onClick={() => handleNavigate(example.path)}
                >
                  查看示例 <ArrowRightOutlined />
                </Button>
              </Card>
            </Col>
          ))}
        </Row>

        <Card style={{ marginTop: 32 }}>
          <Title level={3} style={{ marginBottom: 16 }}>
            使用说明
          </Title>
          <Paragraph>
            本示例展示了 Ant Design Form 的各种常见用法，包括：
          </Paragraph>
          <ul style={{ lineHeight: 2 }}>
            <li>基础表单控件的使用方法</li>
            <li>复杂布局和表单联动</li>
            <li>动态增减表单项</li>
            <li>自定义验证规则</li>
            <li>嵌套数据结构处理</li>
          </ul>
          <Paragraph>
            每个示例都是独立的页面，包含完整的代码和注释，可以直接复制使用。
            点击上方的卡片或使用侧边栏菜单可以快速切换不同的表单示例。
          </Paragraph>
        </Card>
      </div>
    </div>
  );
}
