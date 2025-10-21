import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export function BaseAccordion(props: IBaseAccordion) {
  const { items, classNames } = props;

  if (props.type === 'multiple') {
    return (
      <Accordion
        type='multiple'
        defaultValue={props.defaultValue}
      >
        {items.map((item) => (
          <AccordionItem
            key={item.value}
            value={item.value}
            className={classNames?.item}
          >
            <AccordionTrigger className={classNames?.trigger}>{item.trigger}</AccordionTrigger>
            <AccordionContent className={classNames?.content}>{item.content}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    );
  }

  return (
    <Accordion
      type='single'
      defaultValue={props.defaultValue}
      collapsible={props.collapsible}
    >
      {items.map((item) => (
        <AccordionItem
          key={item.value}
          value={item.value}
          className={classNames?.item}
        >
          <AccordionTrigger className={classNames?.trigger}>{item.trigger}</AccordionTrigger>
          <AccordionContent className={classNames?.content}>{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

type IBaseAccordion = IBaseAccordionSingle | IBaseAccordionMultiple;

interface IBaseAccordionShared {
  items: { value: string; trigger: React.ReactNode; content: React.ReactNode }[];
  classNames?: { item?: string; trigger?: string; content?: string };
}

interface IBaseAccordionSingle extends IBaseAccordionShared {
  type?: 'single';
  defaultValue: string;
  collapsible?: boolean;
}

interface IBaseAccordionMultiple extends IBaseAccordionShared {
  type: 'multiple';
  defaultValue: string[];
  collapsible?: never;
}
