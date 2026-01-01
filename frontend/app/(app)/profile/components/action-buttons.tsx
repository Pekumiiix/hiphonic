import { Button } from '@/components/ui/button';

export function ActionButtons({ onCancel, onSave }: IActionButtons) {
  return (
    <div className='flex items-center gap-2.5'>
      <Button
        variant='destructive'
        onClick={onCancel}
      >
        Cancel
      </Button>
      <Button onClick={onSave}>Save Changes</Button>
    </div>
  );
}

interface IActionButtons {
  onCancel: () => void;
  onSave: () => void;
}
