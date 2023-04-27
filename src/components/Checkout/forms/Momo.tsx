const MomoForm = ({setNumber}: { number: string, setNumber: any }) => {

    return (
        <div className="w-full p-1 px-2 rounded-lg flex flex-col">
            <div className="w-full flex flex-col mb-2">
                <input
                    type="number"
                    id="number"
                    className="w-full px-3 py-2 mb-1 border-2 text-white border-gray-500 rounded-md focus:outline-none focus:border-orange-500 focus:text-orange-500 bg-cartItem transition-colors"
                    placeholder="Введите номер карты"
                    autoComplete="off"
                    onChange={(e) => setNumber(e.target.value)}
                />
            </div>
        </div>
    )
}

export default MomoForm