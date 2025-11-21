import Image from 'next/image';

export function CreateDialogPlaceholder({ image, text }: IPlaceholder) {
  return (
    <div className='w-full flex items-center gap-3'>
      <Image
        src={image}
        alt='placeholder'
        width={32}
        height={32}
      />
      <p className='text-xs font-medium leading-[160%] text-grey-500'>{text}</p>
    </div>
  );
}

interface IPlaceholder {
  image: string;
  text: string;
}
