import React from 'react'

const CardForm = ({number, setNumber}: { number: string, setNumber: any }) => {
    return (
        <div className="w-full p-1 px-2 rounded-lg flex flex-col">
            <div className="w-full flex justify-between gap-1 mb-2">
                <div className='flex flex-col '>
                    <input
                        type="number"
                        id="number"
                        value={number}
                        className="w-full px-3 py-2 mb-1 border-2 text-white border-gray-500 rounded-md focus:outline-none focus:border-orange-500 focus:text-orange-500 bg-cartItem transition-colors"
                        placeholder="Введите номер карты"
                        autoComplete="off"
                        onChange={(e) => setNumber(e.target.value)}
                    />
                </div>
            </div>
        </div>
    )
}

export default CardForm