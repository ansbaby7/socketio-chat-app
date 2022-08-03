import { useState } from "react"

const Contacts = ({contacts, currentUser, changeChat}) => {
    const [currentSelected, setCurrentSelected] = useState(undefined)

    const changeCurrentChat = (index,contact) => {
        setCurrentSelected(index)
        changeChat(contact)
    }
    return <div>
        {currentUser && <div className="container grid grid-cols-20 overflow-hidden bg-gray-500">
        <div className="col-span-2 flex items-center gap-4 justify-center">
            <h3 className="text-white uppercase">Chatty</h3>
        </div>

        <div className="contacts col-span-15 flex flex-col items-center overflow-auto gap-[0.8rem]">
            {contacts.map((contact,index) => {
                return (
                    <div
                    className={`bg-slate-800 min-h-[5rem] cursor-pointer w-[90%] rounded-[0.2rem] p-2 flex gap-4 items-center transition duration-[0.5s] ease-in-out ${index === currentSelected && " bg-slate-700"}`}
                    key={index}
                    onClick={() => changeCurrentChat(index,contact)}>
                        <div>

                        </div>
                        <div>
                            <h3 className="text-white">{contact.username}</h3>
                        </div>
                    </div>
                )
            })}
        </div>


        <div className="bg-red-300 col-span-3 flex justify-center items-center gap-8">
            <div>

            </div>
            <div>
                <h2 className="text-white">{currentUser.username}</h2>
            </div>
        </div>
    </div>}
    </div>
}

export default Contacts;