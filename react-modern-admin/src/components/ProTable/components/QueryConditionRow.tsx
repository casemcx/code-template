import {
  Button,
  DatePicker,
  Input,
  InputNumber,
  Select,
} from '@douyinfe/semi-ui';
import { IconMinusCircle } from '@douyinfe/semi-icons';
import type {
  QueryCondition,
  QueryFieldOption,
  QueryOperator,
} from '../utils/queryConditions';
import {
  getDefaultOperator,
  getOperatorLabel,
  getOperatorsByType,
} from '../utils/queryConditions';

type QueryConditionRowProps = {
  condition: QueryCondition;
  fields: QueryFieldOption[];
  getPopupContainer?: () => HTMLElement;
  onChange: (next: QueryCondition) => void;
  onRemove: () => void;
};

const QueryConditionRow = ({
  condition,
  fields,
  getPopupContainer,
  onChange,
  onRemove,
}: QueryConditionRowProps) => {
  const popupContainer = getPopupContainer ?? (() => document.body);
  const field = fields.find(item => item.name === condition.field);
  const operators = getOperatorsByType(field?.type ?? 'text');

  const handleFieldChange = (name: string) => {
    const nextField = fields.find(item => item.name === name);
    const type = nextField?.type ?? 'text';
    onChange({
      ...condition,
      field: name,
      operator: getDefaultOperator(type),
      value: undefined,
    });
  };

  const handleOperatorChange = (operator: QueryOperator) => {
    onChange({
      ...condition,
      operator,
      value: undefined,
    });
  };

  const renderValue = () => {
    const type = field?.type ?? 'text';
    const optionList = field?.optionList ?? [];
    const commonClass = 'min-w-[180px] flex-1';

    if ((type === 'select' || type === 'status') && optionList.length > 0) {
      const multiple = condition.operator === 'in';
      return (
        <Select
          className={commonClass}
          filter
          multiple={multiple}
          maxTagCount={1}
          showClear
          placeholder="请选择"
          getPopupContainer={popupContainer}
          optionList={optionList.map(item => ({
            label: item.label,
            value: item.value,
          }))}
          value={condition.value as string | string[] | undefined}
          onChange={value => onChange({ ...condition, value })}
        />
      );
    }

    if (type === 'number') {
      return (
        <InputNumber
          className={commonClass}
          hideButtons
          placeholder="请输入"
          value={condition.value as number | undefined}
          onChange={value => onChange({ ...condition, value })}
        />
      );
    }

    if (type === 'date') {
      return (
        <DatePicker
          className={commonClass}
          style={{ width: '100%' }}
          getPopupContainer={() => document.body}
          zIndex={1100}
          value={condition.value as Date | string | undefined}
          onChange={value => onChange({ ...condition, value })}
        />
      );
    }

    return (
      <Input
        className={commonClass}
        placeholder="请输入"
        value={(condition.value as string | undefined) ?? ''}
        onChange={value => onChange({ ...condition, value })}
      />
    );
  };

  return (
    <div className="flex items-center gap-2">
      <Select
        className="w-35 shrink-0"
        placeholder="选择字段"
        getPopupContainer={popupContainer}
        optionList={fields.map(item => ({
          label: item.label,
          value: item.name,
        }))}
        value={condition.field}
        onChange={value => handleFieldChange(String(value))}
      />
      <Select
        className="w-27 shrink-0"
        getPopupContainer={popupContainer}
        optionList={operators.map(item => ({
          label: getOperatorLabel(item),
          value: item,
        }))}
        value={condition.operator}
        onChange={value => handleOperatorChange(value as QueryOperator)}
      />
      {renderValue()}
      <Button
        theme="borderless"
        type="danger"
        icon={<IconMinusCircle />}
        onClick={onRemove}
      />
    </div>
  );
};

export default QueryConditionRow;
