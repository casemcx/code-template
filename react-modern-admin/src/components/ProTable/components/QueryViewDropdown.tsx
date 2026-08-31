import { IconClose, IconListView, IconPlus } from '@douyinfe/semi-icons';
import { Button, Dropdown } from '@douyinfe/semi-ui';
import type { ProTableSearchView } from '../types';
import { ALL_VIEW_KEY } from '../utils/queryConditions';

type QueryViewDropdownProps = {
  views: ProTableSearchView[];
  activeKey?: string;
  canSave: boolean;
  onSelect: (view: ProTableSearchView) => void;
  onSave: () => void;
  onRemove: (key: string) => void;
};

const ALL_VIEW: ProTableSearchView = {
  key: ALL_VIEW_KEY,
  label: '全部',
};

const QueryViewDropdown = ({
  views,
  activeKey,
  canSave,
  onSelect,
  onSave,
  onRemove,
}: QueryViewDropdownProps) => {
  const items = views.some(item => item.key === ALL_VIEW_KEY)
    ? views
    : [ALL_VIEW, ...views];
  const active = items.find(item => item.key === activeKey);

  return (
    <Dropdown
      trigger="click"
      position="bottomRight"
      motion={false}
      clickToHide
      render={
        <Dropdown.Menu className="min-w-44">
          <Dropdown.Title>快捷视图</Dropdown.Title>
          {items.map(view => (
            <Dropdown.Item
              key={view.key}
              active={view.key === activeKey}
              onClick={() => onSelect(view)}
            >
              <span className="flex min-w-40 items-center justify-between gap-3">
                <span>{view.label}</span>
                {view.closable ? (
                  <Button
                    theme="borderless"
                    type="tertiary"
                    size="small"
                    icon={<IconClose />}
                    onClick={event => {
                      event.stopPropagation();
                      onRemove(view.key);
                    }}
                  />
                ) : null}
              </span>
            </Dropdown.Item>
          ))}
          <Dropdown.Divider />
          <Dropdown.Item
            disabled={!canSave}
            icon={<IconPlus />}
            onClick={onSave}
          >
            保存当前查询为视图
          </Dropdown.Item>
        </Dropdown.Menu>
      }
    >
      <Button theme="light" type="primary" icon={<IconListView />}>
        {active?.label ?? '视图'}
      </Button>
    </Dropdown>
  );
};

export default QueryViewDropdown;
