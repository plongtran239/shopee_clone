import { Link } from 'react-router-dom';
import paths from 'src/constants/paths';

export default function NotFound() {
    return (
        <div className='flex h-screen w-screen items-center bg-gray-100'>
            <div className='container flex flex-col items-center justify-center px-5 text-gray-700 md:flex-row'>
                <div className='max-w-md'>
                    <div className='font-dark text-5xl font-bold'>
                        Uppsss...
                        <strong className='text-orange'> 404 </strong>
                    </div>
                    <br />
                    <br />
                    <p className='text-2xl font-light leading-normal md:text-3xl'>
                        <strong>Page Not Found!</strong>
                    </p>
                    <br />
                    <br />
                    <p className='mb-8'>
                        Check if the search term is correct. If you think this is an error, contact support{' '}
                        <strong className='text-orange'>Thanks!</strong>
                        <br />
                    </p>
                    <style dangerouslySetInnerHTML={{ __html: '\n      \n      .pointer {cursor: pointer;}\n    ' }} />
                    <Link
                        to={paths.home}
                        className='focus:shadow-outline-blue pointer inline rounded-lg border border-transparent bg-orange px-4 py-2 text-sm font-medium leading-5 text-white shadow transition-colors duration-150 hover:bg-orange/60 focus:outline-none active:bg-red-600'
                    >
                        Trở về trang chủ
                    </Link>
                </div>
            </div>
        </div>
    );
}
