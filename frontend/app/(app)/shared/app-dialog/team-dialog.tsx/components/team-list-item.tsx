import { BaseAvatar } from '@/components/reuseable/base-avatar';
import { BaseSelect } from '@/components/reuseable/base-select';
import { RemoveMemberDialog } from '../sections/remove-member-dialog';

export function TeamListItem() {
  function handleRoleChange(role: TRole) {
    console.log(role);
  }

  return (
    <div className='flex items-center justify-between p-3 border border-border rounded-lg shadow-sm'>
      <div className='flex items-center gap-2.5'>
        <BaseAvatar
          username='Pelumi Amao'
          avatar='https://github.com/shadcn.png'
        />
        <div className='flex flex-col'>
          <p className='text-sm font-medium text-grey-900'>Pelumi Amao</p>
          <p className='text-xs text-muted-foreground'>Amaopelumi96@gmail.com</p>
        </div>
      </div>

      <div className='flex items-center gap-5'>
        <SelectRole
          value='admin'
          onValueChange={handleRoleChange}
        />

        <RemoveMemberDialog onConfirm={() => console.log('Member has been removed')} />
      </div>
    </div>
  );
}

function SelectRole({ value, onValueChange }: ISelectRole) {
  return (
    <BaseSelect
      items={[
        { value: 'admin', label: 'Admin' },
        { value: 'member', label: 'Member' },
      ]}
      triggerClassName='w-[110px]'
      value={value}
      onValueChange={(value) => onValueChange(value as TRole)}
    />
  );
}

type TRole = 'admin' | 'member';

interface ISelectRole {
  value: TRole;
  onValueChange: (value: TRole) => void;
}
