import type {
  FormInstance,
  SchemaFormProps,
  SchemaProps,
} from '@/components/ProForm';
import type { BasicRecord } from '@/types';
import type { ColumnProps, TableProps } from '@douyinfe/semi-ui/lib/es/table';
import type { ReactNode, Ref } from 'react';

/**
 * 扩展的值类型（在 SchemaProps 的 type 基础上增加表格专用类型）
 */
export type ProColumnExtraType =
  | 'dateTime' // 日期时间 YYYY-MM-DD HH:mm:ss
  | 'money' // 金额 ¥1,234.56
  | 'percent' // 百分比 12.34%
  | 'status' // 状态标签（基于 optionList 渲染 Tag）
  | 'option'; // 操作列

/**
 * 搜索配置
 */
export interface ProColumnSearchConfig {
  /**
   * 搜索字段名（默认使用 name）
   */
  name?: string;
  /**
   * 搜索表单项类型（默认根据 type 推断）
   */
  type?: SchemaProps<BasicRecord>['type'];
  /**
   * 表单项属性（如 optionList 等，直接透传给表单控件）
   */
  fieldProps?: Record<string, unknown>;
  /**
   * 栅格配置
   */
  colProps?: { span?: number };
  /**
   * 是否转换值（如日期范围转为 startTime/endTime）
   */
  transform?: (value: unknown) => Record<string, unknown>;
}

/**
 * 操作列 action 引用
 */
export interface ProTableActionRef {
  /**
   * 重新加载数据
   */
  reload: () => Promise<void>;
  /**
   * 重置并刷新
   */
  reset: () => Promise<void>;
}

/**
 * ProColumns 列配置
 * 继承 SchemaProps，复用表单项的所有配置（name、label、fieldProps 等）
 * 同时扩展表格专用属性
 */
export type ProColumns<
  T extends BasicRecord,
  Name extends keyof T & string = keyof T & string,
> = Omit<SchemaProps<T, Name>, 'render' | 'type'> &
  Omit<ColumnProps<T>, 'render' | 'title' | 'dataIndex'> & {
    /**
     * 值类型（继承 SchemaProps + 表格专用扩展类型）
     */
    type?: SchemaProps<T, Name>['type'] | ProColumnExtraType;

    /**
     * 自定义表格列渲染
     */
    render?: (
      text: unknown,
      record: T,
      index: number,
      action: ProTableActionRef,
    ) => ReactNode;

    /**
     * 是否启用搜索（设置为 false 可禁用该列的搜索）
     * @default true
     */
    search?: boolean | ProColumnSearchConfig;

    /**
     * 是否在表格中隐藏
     * @default false
     */
    hideInTable?: boolean;

    /**
     * 是否在搜索表单中隐藏
     * @default false
     */
    hideInSearch?: boolean;

    /**
     * 是否可复制
     * @default false
     */
    copyable?: boolean;

    /**
     * 是否显示省略号
     * @default false
     */
    ellipsis?: boolean;

    /**
     * 排序字段（如果与 name 不同）
     */
    sortKey?: string;

    /**
     * 筛选选项（Semi Table 原生属性）
     */
    filters?: { text: string; value: unknown }[];
  };

/**
 * 请求参数
 */
export interface ProTableRequestParams<T extends BasicRecord> {
  /**
   * 搜索参数
   */
  params: Record<string, unknown>;
  /**
   * 分页信息
   */
  pagination: {
    current: number;
    pageSize: number;
  };
  /**
   * 排序信息
   */
  sorter?: {
    field: keyof T;
    order: 'ascend' | 'descend';
  };
  /**
   * 筛选信息
   */
  filter?: Record<string, unknown[]>;
}

/**
 * 请求返回结果
 */
export interface ProTableRequestResult<T> {
  /**
   * 数据列表
   */
  data: T[];
  /**
   * 总数
   */
  total: number;
  /**
   * 是否成功
   * @default true
   */
  success?: boolean;
}

/**
 * ProTable 实例方法
 */
export interface ProTableInstance<T extends BasicRecord> {
  /**
   * 重新加载数据（保持当前搜索条件）
   */
  reload: () => Promise<void>;
  /**
   * 重置搜索条件并刷新
   */
  reset: () => Promise<void>;
  /**
   * 获取选中行数据
   */
  getSelectedRows: () => T[];
  /**
   * 获取选中行 keys
   */
  getSelectedRowKeys: () => (string | number)[];
  /**
   * 清空选中状态
   */
  clearSelected: () => void;
  /**
   * 获取当前搜索参数
   */
  getSearchParams: () => Record<string, unknown>;
  /**
   * 设置搜索参数（不触发请求）
   */
  setSearchParams: (params: Record<string, unknown>) => void;
  /**
   * 获取表单实例
   */
  getFormInstance: () => FormInstance<Record<string, unknown>> | undefined;
}

/**
 * 工具栏配置
 */
export interface ProTableToolbarConfig {
  /**
   * 标题
   */
  title?: ReactNode;
  /**
   * 副标题
   */
  subTitle?: ReactNode;
  /**
   * 操作区域
   */
  actions?: ReactNode[];
  /**
   * 是否显示表格设置
   * @default false
   */
  settings?:
    | boolean
    | {
        columns?: boolean;
        density?: boolean;
        refresh?: boolean;
      };
  /**
   * 完全自定义渲染
   */
  render?: (props: ProTableToolbarConfig, defaultDom: ReactNode) => ReactNode;
}

/**
 * 搜索表单 Props
 */
export interface ProTableSearchProps<T extends BasicRecord>
  extends Omit<SchemaFormProps<T>, 'columns'> {
  /**
   * 搜索列配置（从 ProColumns 提取）
   */
  columns: ProColumns<T>[];
  /**
   * 是否折叠
   */
  collapsed?: boolean;
  /**
   * 是否默认折叠
   * @default true
   */
  defaultCollapsed?: boolean;
  /**
   * 折叠时显示的字段数量
   * @default 3
   */
  collapseCount?: number;
  /**
   * 折叠切换回调
   */
  onCollapsedChange?: (collapsed: boolean) => void;
  /**
   * 搜索回调
   */
  onSearch?: (values: Record<string, unknown>) => void;
  /**
   * 重置回调
   */
  onReset?: () => void;
  /**
   * 表单引用
   */
  formRef?: Ref<FormInstance<Record<string, unknown>>>;
}

/**
 * 工具栏 Props
 */
export interface ProTableToolbarProps {
  /**
   * 标题
   */
  title?: ReactNode;
  /**
   * 副标题
   */
  subTitle?: ReactNode;
  /**
   * 操作区域
   */
  actions?: ReactNode[];
  /**
   * 设置区域
   */
  settings?: ReactNode;
  /**
   * 自定义类名
   */
  className?: string;
}

/**
 * 表格内容 Props
 */
export interface ProTableContentProps<T extends BasicRecord>
  extends Omit<TableProps<T>, 'columns'> {
  /**
   * 列配置
   */
  columns: ProColumns<T>[];
  /**
   * action 引用（传递给 render 函数）
   */
  actionRef: ProTableActionRef;
}

/**
 * ProTable 主组件 Props
 */
export interface ProTableProps<T extends BasicRecord>
  extends Omit<TableProps<T>, 'columns' | 'dataSource'> {
  /**
   * 列配置，同时驱动表格和搜索表单
   */
  columns: ProColumns<T>[];

  /**
   * 静态数据源（与 request 二选一）
   */
  dataSource?: T[];

  /**
   * 数据请求函数
   */
  request?: (
    params: ProTableRequestParams<T>,
  ) => Promise<ProTableRequestResult<T>>;

  /**
   * 额外的请求参数（变化时会重新请求）
   */
  params?: Record<string, unknown>;

  /**
   * 工具栏配置
   */
  toolbar?: ProTableToolbarConfig;

  /**
   * 是否隐藏搜索表单
   * @default false
   */
  hiddenSearch?: boolean;

  /**
   * 是否可折叠
   * @default false
   */
  collapsed?: boolean;

  /**
   * 折叠时显示的字段数量
   * @default 3
   */
  collapseCount?: number;
  /**
   * 搜索表单配置
   */
  searchProps?: Partial<ProTableSearchProps<T>>;

  /**
   * 表格实例引用
   */
  tableRef?: Ref<ProTableInstance<T>>;

  /**
   * 搜索回调
   */
  onSearch?: (params: Record<string, unknown>) => void;

  /**
   * 重置回调
   */
  onReset?: () => void;

  /**
   * 数据加载完成回调
   */
  onLoad?: (data: T[]) => void;

  /**
   * 请求错误回调
   */
  onRequestError?: (error: Error) => void;
}
