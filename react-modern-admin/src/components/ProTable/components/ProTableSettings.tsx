import type { BasicRecord } from '@/types';
import { clsx } from '@/utils';
import {
  IconRefresh,
  IconSettingStroked,
  IconTick,
} from '@douyinfe/semi-icons';
import { Button, ButtonGroup, Popover, Tooltip } from '@douyinfe/semi-ui';
import { useMemo, useState } from 'react';
import '../styles/settings.css';
import type { ProColumns } from '../types';

export type ProTableSize = 'default' | 'small';

type ProTableSettingsProps<T extends BasicRecord> = {
  columns: ProColumns<T>[];
  hiddenColumnKeys: string[];
  onHiddenColumnKeysChange: (keys: string[]) => void;
  size: ProTableSize;
  onSizeChange: (size: ProTableSize) => void;
  onRefresh: () => void;
  loading?: boolean;
  showColumns?: boolean;
  showDensity?: boolean;
  showRefresh?: boolean;
};

const iconButtonClass =
  'text-semi-color-text-2 hover:bg-semi-color-bg-0 hover:text-semi-color-text-0';

const getColumnKey = <T extends BasicRecord>(column: ProColumns<T>) =>
  column.name ? String(column.name) : '';

const getColumnLabel = <T extends BasicRecord>(
  column: ProColumns<T>,
  fallback: string,
) =>
  typeof column.label === 'string' || typeof column.label === 'number'
    ? String(column.label)
    : fallback;

const ProTableSettings = <T extends BasicRecord>(
  props: ProTableSettingsProps<T>,
) => {
  const {
    columns,
    hiddenColumnKeys,
    onHiddenColumnKeysChange,
    size,
    onSizeChange,
    onRefresh,
    loading,
    showColumns = true,
    showDensity = true,
    showRefresh = true,
  } = props;

  const [open, setOpen] = useState(false);

  const settingColumns = useMemo(
    () =>
      columns.filter(
        column =>
          !column.hideInTable &&
          column.type !== 'option' &&
          Boolean(getColumnKey(column)),
      ),
    [columns],
  );

  const visibleCount = settingColumns.filter(
    column => !hiddenColumnKeys.includes(getColumnKey(column)),
  ).length;

  const showPanel = showColumns || showDensity;
  if (!showRefresh && !showPanel) {
    return null;
  }

  const handleColumnToggle = (key: string, checked: boolean) => {
    if (checked) {
      onHiddenColumnKeysChange(hiddenColumnKeys.filter(item => item !== key));
      return;
    }
    if (visibleCount <= 1) {
      return;
    }
    onHiddenColumnKeysChange([...hiddenColumnKeys, key]);
  };

  const settingsPanel = (
    <div className="pro-table-settings-panel">
      {showDensity ? (
        <div>
          <div className="mb-2 text-xs font-medium text-semi-color-text-2">
            表格密度
          </div>
          <div className="pro-table-density-switch">
            <button
              type="button"
              className={size === 'default' ? 'is-active' : undefined}
              onClick={() => onSizeChange('default')}
            >
              默认
            </button>
            <button
              type="button"
              className={size === 'small' ? 'is-active' : undefined}
              onClick={() => onSizeChange('small')}
            >
              紧凑
            </button>
          </div>
        </div>
      ) : null}
      {showDensity && showColumns ? (
        <div className="pro-table-settings-divider" />
      ) : null}
      {showColumns ? (
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-xs font-medium text-semi-color-text-2">
              列显示
            </span>
            <span className="text-xs text-semi-color-text-2">
              {visibleCount}/{settingColumns.length}
            </span>
          </div>
          <div className="pro-table-column-list">
            {settingColumns.map(column => {
              const key = getColumnKey(column);
              const checked = !hiddenColumnKeys.includes(key);
              return (
                <button
                  key={key}
                  type="button"
                  disabled={checked && visibleCount <= 1}
                  className={clsx(
                    'pro-table-column-item',
                    checked && 'is-checked',
                  )}
                  onClick={() => handleColumnToggle(key, !checked)}
                >
                  <span className="pro-table-column-check" aria-hidden>
                    <IconTick />
                  </span>
                  <span className="min-w-0 truncate">
                    {getColumnLabel(column, key)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );

  return (
    <ButtonGroup className="pro-table-tools">
      {showRefresh ? (
        <Tooltip content="刷新">
          <Button
            theme="borderless"
            type="tertiary"
            size="small"
            icon={<IconRefresh />}
            loading={loading}
            className={iconButtonClass}
            onClick={onRefresh}
          />
        </Tooltip>
      ) : null}
      {showPanel ? (
        <Popover
          trigger="click"
          position="bottomRight"
          motion={false}
          spacing={6}
          visible={open}
          onVisibleChange={setOpen}
          className="pro-table-settings-popover"
          content={settingsPanel}
        >
          <span className="inline-flex">
            <Button
              theme="borderless"
              type="tertiary"
              size="small"
              icon={<IconSettingStroked />}
              className={clsx(
                iconButtonClass,
                open && 'pro-table-settings-trigger is-open',
              )}
            />
          </span>
        </Popover>
      ) : null}
    </ButtonGroup>
  );
};

ProTableSettings.displayName = 'ProTableSettings';

export default ProTableSettings;
