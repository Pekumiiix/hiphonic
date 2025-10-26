import type { CSSProperties } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/base-select';

export function BaseUISelect({
  group,
  value,
  onValueChange,
  renderValue,
  multiple = false,
  classNames,
  indicatorPosition = 'right',
  indicatorVisibility = true,
  placeholder,
  icon,
  triggerStyle,
}: IBaseUISelect) {
  return (
    <Select
      items={group.flatMap((g) => g.item)}
      value={value}
      onValueChange={(val) => onValueChange?.(val as string | string[])}
      multiple={multiple}
      indicatorPosition={indicatorPosition}
      indicatorVisibility={indicatorVisibility}
      icon={icon}
    >
      <SelectTrigger
        style={triggerStyle}
        className={classNames?.trigger}
      >
        <SelectValue className={classNames?.value}>
          {(value) => {
            const hasValue = multiple ? Array.isArray(value) && value.length > 0 : !!value;

            if (!hasValue) {
              return placeholder || '';
            }

            if (renderValue) return renderValue(value);

            const item = group.flatMap((g) => g.item).find((item) => item.value === value);
            return item ? item.label : placeholder || '';
          }}
        </SelectValue>
      </SelectTrigger>
      <SelectContent className={classNames?.content}>
        {group.map((groupItem) => (
          <SelectGroup
            key={groupItem.label || 'group'}
            className={classNames?.group}
          >
            {groupItem.label && (
              <SelectLabel className={classNames?.label}>{groupItem?.label}</SelectLabel>
            )}
            {groupItem.item.map((item) => (
              <SelectItem
                key={item.value}
                value={item.value}
                className={classNames?.item}
              >
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  );
}

interface IBaseUISelect {
  group: { label?: string; item: { value: string; label: string | React.ReactNode }[] }[];
  renderValue?: (
    selectedItems: { value: string; label: string | React.ReactNode }[],
  ) => React.ReactNode;
  value?: string[] | string;
  onValueChange?: (value: string[] | string) => void;
  multiple?: boolean;
  classNames?: {
    trigger?: string;
    value?: string;
    content?: string;
    group?: string;
    label?: string;
    item?: string;
  };
  indicatorVisibility?: boolean;
  indicatorPosition?: 'left' | 'right';
  placeholder?: string | React.ReactNode;
  icon?: React.ReactNode;
  triggerStyle?: CSSProperties;
}
