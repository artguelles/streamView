import { useNavigate } from 'react-router-dom'
import { SearchBar } from '../SearchBar/SearchBar'
import './Header.css'
import { useContext, useState } from 'react'
import { UserContext } from '../../App'


export const Header = () => {

    const navigate = useNavigate()
    const goHomepage = () => navigate('/home')
    const goProfile = () => navigate('/profile')
    const goUpload = () => navigate('/upload')

    const { VITE_EXPRESS, toggleMenu } = useContext(UserContext)
    const API_URL = import.meta.env.VITE_EXPRESS;
    const [isNotificationsActive, setIsNotificationsActive] = useState(false);


    // useEffect(()=>{
    //     let getUser = async () => {
    //         try {
    //             let options = { method: `get` }
    //             let request = await fetch(`${VITE_EXPRESS}/user`, options)
    //         } catch (error) {
    //             console.log("Error fetching users", error)
    //         }
    //     }
    //     if (VITE_EXPRESS) getUser()
    // }, [VITE_EXPRESS])

    return (
        <div className="Header">
            <div className="Header-div">
                <div className="Header-menu" onPointerDown={toggleMenu}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" /></svg>
                </div>
                <h1 className="Header-logo" onPointerDown={goHomepage}>StreamView</h1>
            </div>
            <SearchBar />
            <div className="Header-div">
                <div className="Header-upload" onPointerDown={goUpload}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z" /></svg>
                </div>
                <div className="Header-notifications">
                    <button className="Header-notifications-btn" onPointerDown={() => setIsNotificationsActive(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z" /></svg>
                    </button>
                    <div className={`Header-notifications-popup ${isNotificationsActive ? 'isActive' : ''}`}>
                        <div className="Header-notifications-top">
                            Notifications
                            <button className="Header-notifications-close" onPointerDown={() => setIsNotificationsActive(false)}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m336-280-56-56 144-144-144-143 56-56 144 144 143-144 56 56-144 143 144 144-56 56-143-144-144 144Z" /></svg>
                            </button>
                        </div>

                        <div className="Header-notifications-show">
                            You have no notifications
                        </div>

                    </div>
                </div>
                <div className="Header-profile" onPointerDown={goProfile}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm146.5-204.5Q340-521 340-580t40.5-99.5Q421-720 480-720t99.5 40.5Q620-639 620-580t-40.5 99.5Q539-440 480-440t-99.5-40.5ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm100-95.5q47-15.5 86-44.5-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160q53 0 100-15.5ZM523-537q17-17 17-43t-17-43q-17-17-43-17t-43 17q-17 17-17 43t17 43q17 17 43 17t43-17Zm-43-43Zm0 360Z" /></svg>
                </div>
            </div>
        </div>
    )
}