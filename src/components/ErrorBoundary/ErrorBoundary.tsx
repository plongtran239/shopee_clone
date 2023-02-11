import { Component, ErrorInfo, ReactNode } from 'react';
import paths from 'src/constants/paths';

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public static getDerivedStateFromError(_: Error): State {
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error: ', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className='flex h-screen w-screen items-center bg-gray-100'>
                    <div className='container flex flex-col items-center justify-center px-5 text-gray-700 md:flex-row'>
                        <div className='max-w-md'>
                            <div className='font-dark text-5xl font-bold'>
                                Uppsss...
                                <strong className='text-orange'> 500 </strong>
                            </div>
                            <br />
                            <br />
                            <p className='text-2xl font-light leading-normal md:text-3xl'>
                                <strong>Error!</strong>
                            </p>
                            <br />
                            <br />
                            <p className='mb-8'>
                                Check if the search term is correct. If you think this is an error, contact support{' '}
                                <strong className='text-orange'>Thanks!</strong>
                                <br />
                            </p>
                            <style
                                dangerouslySetInnerHTML={{
                                    __html: '\n      \n      .pointer {cursor: pointer;}\n    '
                                }}
                            />
                            <a
                                href={paths.home}
                                className='focus:shadow-outline-blue pointer inline rounded-lg border border-transparent bg-orange px-4 py-2 text-sm font-medium leading-5 text-white shadow transition-colors duration-150 hover:bg-orange/60 focus:outline-none active:bg-red-600'
                            >
                                Trở về trang chủ
                            </a>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
