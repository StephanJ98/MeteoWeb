import { title } from 'process'
import React from 'react'

type Props = {
    title: string
    value: string
}

const Card = ({ title, value }: Props) => {
    return (
        <div className='bg-white flex flex-col flex-1 text-center rounded-md'>
            <div className='font-bold bg-neutral-400 rounded-t-md w-full flex-1 flex flex-col justify-center py-1'>
                {title}
            </div>
            <div className='flex-1 flex flex-col justify-center py-1'>
                {value}
            </div>
        </div>
    )
}

export default Card