import { useState } from "react"

const Contacts = ({contacts, currentUser, changeChat}) => {
    const [currentSelected, setCurrentSelected] = useState(undefined)

    const changeCurrentChat = (index,contact) => {
        setCurrentSelected(index)
        changeChat(contact)
    }
    return <div className="col-span-1">
        {currentUser && <div className="container grid grid-rows-[10] overflow-hidden h-screen bg-gray-500">
        <div className="row-span-2 flex items-center gap-4 justify-center">
            <h3 className="text-white uppercase">Chatty</h3>
        </div>

        <div className="contacts row-span-6 flex flex-col items-center overflow-auto gap-[0.8rem]">
            {contacts.map((contact,index) => {
                return (
                    <div
                    className={`bg-slate-800 min-h-[5rem] cursor-pointer w-[90%] rounded-[0.2rem] p-2 flex gap-4 items-center transition duration-[0.5s] ease-in-out ${index === currentSelected && " bg-gray-900"}`}
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


        <div className="bg-violet-800 row-span-2 flex justify-center items-center gap-8">
            <div>

            </div>
            <div>
                <h2 className="text-gray-200">{currentUser.username}</h2>
            </div>
        </div>
    </div>}
    </div>
}

export default Contacts;