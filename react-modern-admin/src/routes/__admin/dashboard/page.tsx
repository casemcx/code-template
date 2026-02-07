import { ProTable } from '@/components/ProTable';
import type { ProColumns, ProTableRequestParams } from '@/components/ProTable';
import { IconDelete, IconEdit, IconRefresh } from '@douyinfe/semi-icons';
import { Button, Modal, Space, Toast } from '@douyinfe/semi-ui';

/**
 * 用户数据类型
 */
interface UserRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  status: 'active' | 'inactive' | 'pending';
  role: 'admin' | 'user' | 'guest';
  department: string;
  salary: number;
  lastLoginTime: string;
  createTime: string;
  avatar: string;
  description: string;
  action?: never;
}

/**
 * 模拟数据请求
 */
const mockRequest = async (params: ProTableRequestParams<UserRecord>) => {
  const { current, pageSize } = params.pagination;
  const keyword = params.params.keyword as string | undefined;
  const status = params.params.status as string | undefined;
  const role = params.params.role as string | undefined;

  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 500));

  // 模拟数据
  const allData: UserRecord[] = Array.from({ length: 100 }, (_, i) => ({
    id: `user-${i + 1}`,
    name: `用户${i + 1}`,
    email: `user${i + 1}@example.com`,
    phone: `138${String(i).padStart(8, '0')}`,
    age: 20 + (i % 40),
    status: ['active', 'inactive', 'pending'][i % 3] as UserRecord['status'],
    role: ['admin', 'user', 'guest'][i % 3] as UserRecord['role'],
    department: ['技术部', '产品部', '运营部', '市场部'][i % 4],
    salary: 5000 + i * 1000,
    lastLoginTime: new Date(Date.now() - i * 3600000).toISOString(),
    createTime: new Date(Date.now() - i * 86400000).toISOString(),
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`,
    description: `这是用户${i + 1}的详细描述信息，可能包含很长的文本内容`,
  }));

  // 过滤数据
  let filteredData = allData;
  if (keyword) {
    filteredData = filteredData.filter(
      item =>
        item.name.includes(keyword) ||
        item.email.includes(keyword) ||
        item.phone.includes(keyword),
    );
  }
  if (status) {
    filteredData = filteredData.filter(item => item.status === status);
  }
  if (role) {
    filteredData = filteredData.filter(item => item.role === role);
  }

  // 分页
  const start = (current - 1) * pageSize;
  const end = start + pageSize;
  const data = filteredData.slice(start, end);

  return {
    data,
    total: filteredData.length,
    success: true,
  };
};

/**
 * ProTable 完整示例
 */
const Dashboard = () => {
  const handleDelete = (record: UserRecord) => {
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除用户 "${record.name}" 吗？`,
      onOk: () => {
        Toast.success(`已删除用户: ${record.name}`);
      },
    });
  };

  const handleEdit = (record: UserRecord) => {
    Toast.info(`编辑用户: ${record.name}`);
  };

  const columns: ProColumns<UserRecord>[] = [
    {
      name: 'id',
      label: 'ID',
      width: 120,
      copyable: true,
      hideInSearch: true,
    },
    {
      name: 'name',
      label: '姓名',
      width: 120,
      copyable: true,
    },
    {
      name: 'email',
      label: '邮箱',
      width: 200,
      copyable: true,
      ellipsis: true,
    },
    {
      name: 'phone',
      label: '手机号',
      width: 140,
      type: 'text',
      fieldProps: {
        placeholder: '请输入手机号',
      },
    },
    {
      name: 'age',
      label: '年龄',
      width: 100,
      type: 'number',
      fieldProps: {
        placeholder: '请输入年龄',
        min: 0,
        max: 100,
      },
      hideInSearch: true,
    },
    {
      name: 'status',
      label: '状态',
      width: 100,
      type: 'status',
      fieldProps: {
        optionList: [
          { label: '启用', value: 'active', type: 'success' },
          { label: '禁用', value: 'inactive', type: 'danger' },
          { label: '待审核', value: 'pending', type: 'warning' },
        ],
      },
    },
    {
      name: 'role',
      label: '角色',
      width: 100,
      type: 'select',
      fieldProps: {
        optionList: [
          { label: '管理员', value: 'admin' },
          { label: '普通用户', value: 'user' },
          { label: '访客', value: 'guest' },
        ],
        placeholder: '请选择角色',
      },
    },
    {
      name: 'department',
      label: '部门',
      width: 120,
      type: 'select',
      fieldProps: {
        optionList: [
          { label: '技术部', value: '技术部' },
          { label: '产品部', value: '产品部' },
          { label: '运营部', value: '运营部' },
          { label: '市场部', value: '市场部' },
        ],
        placeholder: '请选择部门',
      },
      hideInSearch: true,
    },
    {
      name: 'salary',
      label: '薪资',
      width: 120,
      type: 'money',
      hideInSearch: true,
    },
    {
      name: 'lastLoginTime',
      label: '最后登录',
      width: 180,
      type: 'dateTime',
      hideInSearch: true,
    },
    {
      name: 'createTime',
      label: '创建时间',
      width: 180,
      type: 'date',
      fieldProps: {
        placeholder: '请选择日期',
      },
      hideInSearch: true,
    },
    {
      name: 'description',
      label: '描述',
      width: 200,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      name: 'avatar',
      label: '头像',
      width: 80,
      hideInSearch: true,
      render: (_text, record) => (
        <img
          src={record.avatar}
          alt={record.name}
          style={{ width: 40, height: 40, borderRadius: '50%' }}
        />
      ),
    },
    {
      name: 'action',
      type: 'option',
      label: '操作',
      width: 150,
      fixed: 'right',
      render: (_text, record, _index, _action) => (
        <Space>
          <Button
            theme="borderless"
            icon={<IconEdit />}
            onClick={() => handleEdit(record)}
          />
          <Button
            theme="borderless"
            icon={<IconDelete />}
            type="danger"
            onClick={() => handleDelete(record)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <ProTable<UserRecord>
        columns={columns}
        request={mockRequest}
        rowKey="id"
        toolbar={{
          title: '用户管理',
          subTitle: '共 100 条数据',
          actions: [
            <Button key="add" theme="solid" type="primary">
              新增用户
            </Button>,
            <Button
              key="batch"
              theme="solid"
              type="tertiary"
              icon={<IconRefresh />}
            >
              批量操作
            </Button>,
          ],
          settings: {
            columns: true,
            density: true,
            refresh: true,
          },
        }}
        pagination={{
          showSizeChanger: true,
          pageSizeOpts: [10, 20, 50, 100],
        }}
        onSearch={params => {
          console.log('搜索参数:', params);
        }}
        onLoad={data => {
          console.log('数据加载完成:', data.length);
        }}
      />
    </div>
  );
};

export default Dashboard;
