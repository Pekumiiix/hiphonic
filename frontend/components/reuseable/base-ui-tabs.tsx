import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/base-tabs';
import { cn } from '@/lib/utils';

export function BaseUITabs({
  defaultValue,
  variant = 'default',
  tabs,
  classNames,
  children,
}: IBaseUITabs) {
  return (
    <Tabs
      defaultValue={defaultValue}
      className={classNames?.container}
    >
      <div className={cn('flex items-center justify-between', classNames?.wrapper)}>
        <TabsList
          variant={variant}
          className={classNames?.list}
        >
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className={classNames?.trigger}
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {children}
      </div>
      {tabs.map((tab) => (
        <TabsContent
          key={tab.value}
          value={tab.value}
          className={classNames?.content}
        >
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}

interface IBaseUITabs {
  defaultValue: string;
  variant?: 'button' | 'default' | 'line';
  tabs: { value: string; label: string; content: React.ReactNode }[];
  classNames?: {
    container?: string;
    list?: string;
    trigger?: string;
    content?: string;
    wrapper?: string;
  };
  children?: React.ReactNode;
}
