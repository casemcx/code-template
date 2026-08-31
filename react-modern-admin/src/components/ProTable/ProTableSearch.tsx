import type { BasicRecord } from '@/types';
import { clsx } from '@/utils';
import { IconFilter, IconPlus, IconSearch } from '@douyinfe/semi-icons';
import { Button, Input, Modal, Popover, Space, Toast } from '@douyinfe/semi-ui';
import { useEffect, useMemo, useRef, useState } from 'react';
import QueryConditionRow from './components/QueryConditionRow';
import QueryViewDropdown from './components/QueryViewDropdown';
import './styles/querySearch.css';
import type { ProTableSearchProps, ProTableSearchView } from './types';
import {
  ALL_VIEW_KEY,
  type QueryCondition,
  buildSearchParams,
  getActiveConditions,
  getDefaultOperator,
  getQueryFields,
  hydrateViewConditions,
  isQueryOverlayOpen,
  toViewConditions,
} from './utils/queryConditions';

let conditionSeed = 0;

const createCondition = (
  operator: QueryCondition['operator'] = 'contains',
) => ({
  id: `query-${Date.now()}-${conditionSeed++}`,
  operator,
});

/**
 * ProTable 搜索：关键字 + 查询条件构建器
 */
const ProTableSearch = <T extends BasicRecord>(
  props: ProTableSearchProps<T>,
) => {
  const {
    columns,
    onSearch,
    className,
    keywordPlaceholder = '输入关键字搜索',
    before,
    after,
    views = [],
    onViewSave,
    onViewRemove,
    onViewChange,
  } = props;

  const fields = useMemo(() => getQueryFields(columns), [columns]);
  const [keyword, setKeyword] = useState('');
  const [conditions, setConditions] = useState<QueryCondition[]>([]);
  const [visible, setVisible] = useState(false);
  const [appliedCount, setAppliedCount] = useState(0);
  const [activeViewKey, setActiveViewKey] = useState<string>();
  const [localViews, setLocalViews] = useState<ProTableSearchView[]>([]);
  const [saveVisible, setSaveVisible] = useState(false);
  const [viewName, setViewName] = useState('');
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement>(null);

  const getPopupContainer = () => panelRef.current ?? document.body;

  useEffect(() => {
    if (!visible) {
      return;
    }
    const onMouseDown = (event: MouseEvent) => {
      const path = event.composedPath();
      if (
        path.includes(triggerRef.current as EventTarget) ||
        path.includes(panelRef.current as EventTarget)
      ) {
        return;
      }
      if (isQueryOverlayOpen()) {
        return;
      }
      setVisible(false);
    };
    window.addEventListener('mousedown', onMouseDown, true);
    return () => window.removeEventListener('mousedown', onMouseDown, true);
  }, [visible]);

  const createDefaultCondition = (): QueryCondition | undefined => {
    if (!fields[0]) {
      return undefined;
    }
    return {
      ...createCondition(getDefaultOperator(fields[0].type)),
      field: fields[0].name,
    };
  };

  const mergedViews = useMemo(
    () => [
      ...views,
      ...localViews.filter(item => !views.some(view => view.key === item.key)),
    ],
    [views, localViews],
  );

  const canSaveView =
    Boolean(keyword.trim()) || getActiveConditions(conditions).length > 0;

  const applySearch = (
    nextKeyword: string,
    nextConditions: QueryCondition[],
  ) => {
    onSearch?.(buildSearchParams(nextKeyword, nextConditions));
    setAppliedCount(getActiveConditions(nextConditions).length);
    setVisible(false);
  };

  const handleSearch = () => {
    applySearch(keyword, conditions);
  };

  const applyView = (view: ProTableSearchView) => {
    const nextKeyword = view.keyword ?? '';
    const first = createDefaultCondition();
    const nextConditions =
      view.key === ALL_VIEW_KEY
        ? first
          ? [first]
          : []
        : hydrateViewConditions(
            view.conditions,
            fields,
            () => createCondition().id,
          );
    setKeyword(nextKeyword);
    setConditions(nextConditions);
    setActiveViewKey(view.key);
    applySearch(nextKeyword, nextConditions);
    onViewChange?.(view);
  };

  const handleSaveView = () => {
    const label = viewName.trim();
    if (!label) {
      Toast.warning('请输入视图名称');
      return;
    }
    const view: ProTableSearchView = {
      key: `view-${Date.now()}`,
      label,
      keyword: keyword.trim() || undefined,
      conditions: toViewConditions(conditions),
      closable: true,
    };
    onViewSave?.(view);
    if (!onViewSave) {
      setLocalViews(prev => [...prev, view]);
    }
    setActiveViewKey(view.key);
    setSaveVisible(false);
    setViewName('');
    Toast.success('已保存视图');
  };

  const handleRemoveView = (key: string) => {
    onViewRemove?.(key);
    if (!onViewRemove) {
      setLocalViews(prev => prev.filter(item => item.key !== key));
    }
    if (activeViewKey === key) {
      applyView({ key: ALL_VIEW_KEY, label: '全部' });
    }
  };

  const updateConditions = (next: QueryCondition[]) => {
    setConditions(next);
    setActiveViewKey(undefined);
  };

  const handleKeywordChange = (value: string) => {
    setKeyword(value);
    setActiveViewKey(undefined);
  };

  const handleVisibleChange = (nextVisible: boolean) => {
    if (!nextVisible && isQueryOverlayOpen()) {
      return;
    }
    setVisible(nextVisible);
    if (nextVisible && conditions.length === 0) {
      const first = createDefaultCondition();
      if (first) {
        setConditions([first]);
      }
    }
  };

  const openQuery = () => handleVisibleChange(true);
  const closeQuery = () => handleVisibleChange(false);

  const handleAdd = () => {
    const nextField =
      fields.find(
        item => !conditions.some(condition => condition.field === item.name),
      ) ?? fields[0];
    if (!nextField) {
      return;
    }
    setConditions(prev => [
      ...prev,
      {
        ...createCondition(getDefaultOperator(nextField.type)),
        field: nextField.name,
      },
    ]);
    setActiveViewKey(undefined);
  };

  const handleClear = () => {
    const first = createDefaultCondition();
    setConditions(first ? [first] : []);
    setActiveViewKey(undefined);
  };

  return (
    <Space
      spacing="medium"
      align="center"
      className={clsx('pro-table-search', className)}
    >
      {before}
      <Input
        className="w-64"
        prefix={<IconSearch />}
        showClear
        placeholder={keywordPlaceholder}
        value={keyword}
        onChange={handleKeywordChange}
        onClear={() => handleKeywordChange('')}
        onEnterPress={handleSearch}
      />
      <QueryViewDropdown
        views={mergedViews}
        activeKey={activeViewKey}
        canSave={canSaveView}
        onSelect={applyView}
        onSave={() => setSaveVisible(true)}
        onRemove={handleRemoveView}
      />
      {fields.length > 0 ? (
        <Popover
          trigger="custom"
          visible={visible}
          position="bottomRight"
          onClickOutSide={closeQuery}
          motion={false}
          zIndex={1050}
          className="pro-table-query-popover"
          content={
            <div
              ref={panelRef}
              className="pro-table-query-panel w-140 overflow-visible px-4 py-3.5"
            >
              <div className="mb-3 text-sm font-medium text-semi-color-text-0">
                设置查询条件
              </div>
              <div className="flex flex-col gap-2">
                {conditions.map(condition => (
                  <QueryConditionRow
                    key={condition.id}
                    condition={condition}
                    fields={fields}
                    getPopupContainer={getPopupContainer}
                    onChange={next => {
                      updateConditions(
                        conditions.map(item =>
                          item.id === next.id ? next : item,
                        ),
                      );
                    }}
                    onRemove={() => {
                      updateConditions(
                        conditions.filter(item => item.id !== condition.id),
                      );
                    }}
                  />
                ))}
              </div>
              <div className="mt-3 flex items-center justify-between">
                <Button
                  theme="borderless"
                  type="primary"
                  icon={<IconPlus />}
                  onClick={handleAdd}
                >
                  添加条件
                </Button>
                <div className="flex items-center gap-2">
                  <Button
                    theme="borderless"
                    type="tertiary"
                    onClick={handleClear}
                  >
                    清空全部条件
                  </Button>
                  <Button
                    theme="light"
                    type="primary"
                    icon={<IconSearch />}
                    onClick={handleSearch}
                  >
                    搜索
                  </Button>
                </div>
              </div>
            </div>
          }
        >
          <span ref={triggerRef} className="inline-flex">
            <Button
              theme="light"
              type="primary"
              icon={<IconFilter />}
              onClick={() => (visible ? closeQuery() : openQuery())}
            >
              {appliedCount > 0 ? `${appliedCount} 查询` : '查询'}
            </Button>
          </span>
        </Popover>
      ) : null}
      <Button
        theme="light"
        type="primary"
        icon={<IconSearch />}
        onClick={handleSearch}
      >
        搜索
      </Button>
      {after}
      <Modal
        title="保存为视图"
        visible={saveVisible}
        onCancel={() => {
          setSaveVisible(false);
          setViewName('');
        }}
        onOk={handleSaveView}
        okText="保存"
        cancelText="取消"
      >
        <Input
          autoFocus
          placeholder="请输入视图名称，例如：待审核用户"
          value={viewName}
          onChange={setViewName}
          onEnterPress={handleSaveView}
        />
      </Modal>
    </Space>
  );
};

ProTableSearch.displayName = 'ProTableSearch';

export default ProTableSearch;
