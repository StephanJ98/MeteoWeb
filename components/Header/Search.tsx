import React from 'react'

type Props = {}

const Search = ({ }: Props) => {
    return (
        <div className='flex flex-row justify-center text-center w-full md:mt-3 md:w-1/2'>
            <input
                type="text"
                placeholder='Location'
                className='flex flex-col justify-center text-center text-neutral-900 font-bold rounded-lg w-[95vw] mt-2 md:mt-0 md:w-4/5 h-[3rem] focus:outline-none focus-visible:outline-none outline-none shadow-xl'
            />
        </div>
    )
}

export default Search