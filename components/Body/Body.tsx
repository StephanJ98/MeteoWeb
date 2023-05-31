import React from 'react'

type Props = {
    darkTheme: boolean
}

export default function Body({ darkTheme }: Props) {
    return (
        <div className='flex flex-col justify-center text-center h-full'>
            <div className='flex flex-row justify-center text-center'>
                aaa
            </div>
        </div>
    )
}