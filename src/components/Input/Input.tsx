import type { RegisterOptions, UseFormRegister } from 'react-hook-form';

interface Props {
    className?: string;
    type: React.HTMLInputTypeAttribute;
    placeholder?: string;
    autoComplete?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register: UseFormRegister<any>;
    name: string;
    rules?: RegisterOptions;
    errorMessage?: string;
}

export default function Input({
    className,
    type,
    placeholder,
    autoComplete,
    register,
    name,
    rules,
    errorMessage
}: Props) {
    return (
        <div className={className}>
            <input
                type={type}
                className='w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm'
                placeholder={placeholder}
                autoComplete={autoComplete}
                {...register(name, rules)}
            />
            <div className='mt-1 min-h-[1.25rem] text-sm text-red-600'>{errorMessage}</div>
        </div>
    );
}
