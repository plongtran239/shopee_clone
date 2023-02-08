import { useRef } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import config from 'src/constants/config';

interface Props {
    onChange?: (file?: File) => void;
}

export default function InputFile({ onChange }: Props) {
    const { t } = useTranslation('user');

    const fileInputRef = useRef<HTMLInputElement>(null);

    const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileFromLocal = event.target.files?.[0];

        if (
            fileFromLocal &&
            (fileFromLocal.size >= config.maxUploadAvatarSize || !fileFromLocal.type.includes('image'))
        ) {
            toast.error(`Dung lượng file tối đa 1 MB. Định dạng:.JPEG, .PNG`, {
                autoClose: 1500,
                position: 'top-center'
            });
        } else {
            onChange && onChange(fileFromLocal);
        }
    };

    const handleUpload = () => {
        fileInputRef.current?.click();
    };

    return (
        <>
            <input
                className='hidden'
                type='file'
                accept='.jpg,.jpeg,.png'
                ref={fileInputRef}
                onChange={onFileChange}
                onClick={(event) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (event.target as any).value = null;
                }}
            />
            <button
                className='flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm'
                type='button'
                onClick={handleUpload}
            >
                {t('profile.select image')}
            </button>
        </>
    );
}
