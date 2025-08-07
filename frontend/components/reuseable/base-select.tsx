import type { CSSProperties } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function BaseSelect({
  items,
  value,
  onValueChange,
  groupLabel,
  triggerClassName,
  placeholder,
  style,
}: IBaseSelect) {
  return (
    <Select
      value={value}
      onValueChange={onValueChange}
      indicatorPosition='right'
    >
      <SelectTrigger
        style={style}
        className={triggerClassName}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {groupLabel && <SelectLabel>{groupLabel}</SelectLabel>}
          {items.map((item) => (
            <SelectItem
              key={item.value}
              value={item.value}
            >
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

interface IBaseSelect {
  items: { value: string; label: string | React.ReactNode }[];
  value?: string;
  onValueChange?: (value: string) => void;
  groupLabel?: string;
  triggerClassName?: string;
  placeholder?: string;
  style?: CSSProperties;
}
