import React from 'react';
import TypeSelector from './type';
import AreaSelector from './area';
import FilterSelector from './filter';
import ResultFood from './result';

const Page: React.FC = async ({searchParams}: any) => {
    const {keyword, category_id} = searchParams;
    const response = await fetch(`http://localhost:8080/foods/search?keyword=${keyword ?? ''}&category_id=${category_id ?? ''}`);
    const data = await response.json();
    const searchList = (data || []).map((item: any) => ({
        ...item,
        address: '102/12 Cống Quỳnh, Quận 1, TP. HCM',
        img: '/food/ga1.jpg',
    }))
    return (
        <>
            <div className='w-full flex flex-row justify-between items-center border-b border-solid'>
                <div className='flex flex-row gap-3'>
                    <AreaSelector />
                    <TypeSelector />
                </div>
                <div className='flex items-center justify-center '>
                    <FilterSelector></FilterSelector>
                </div>

            </div>
            <ResultFood items={searchList} />
        </>
    )
}
export default Page;