import { useContext } from 'react'
import './SideBar.css'
import { UserContext } from '../../App'
import { NavLink, useNavigate } from 'react-router-dom'

export const SideBar = () => {

    const { setUser , isOpen , setIsOpen } = useContext(UserContext)
    const navigate = useNavigate()
    // const goLogin = () => navigate('/')
    // const goHomepage = () => navigate('/home')
    // const goRegister = () => navigate('/register')
    // const goLibrary = () => navigate('/library')
    // const goYourVideos = () => navigate('/your-videos')
    // const goLiked = () => navigate('/liked')

    const signOut = () => {
        setUser(null)
        navigate('/')
    }

    const handleLinkClick = () => {
        if (window.innerWidth <= 492) {
            setIsOpen(false);
        }
    }

    return (
        <div className={`SideBar ${isOpen ? 'isOpen' : ''}`}>
            <nav className="SideBar-nav">
                <ul className="SideBar-ul">
                    <li className="SideBar-li">
                        <NavLink to="/home" className={NavLink} onPointerDown={handleLinkClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" /></svg>
                            Home
                        </NavLink>
                    </li>
                    {/* <li className="SideBar-li">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m422-232 207-248H469l29-227-185 267h139l-30 208ZM320-80l40-280H160l360-520h80l-40 320h240L400-80h-80Zm151-390Z"/></svg>
                        Shorts
                    </li> */}
                    {/* <li className="SideBar-li">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M160-80q-33 0-56.5-23.5T80-160v-400q0-33 23.5-56.5T160-640h640q33 0 56.5 23.5T880-560v400q0 33-23.5 56.5T800-80H160Zm0-80h640v-400H160v400Zm240-40 240-160-240-160v320ZM160-680v-80h640v80H160Zm120-120v-80h400v80H280ZM160-160v-400 400Z"/></svg>
                        Subscriptions
                    </li> */}
                    {/* <li className="SideBar-li">
                        <NavLink to="/library" className={NavLink} onPointerDown={handleLinkClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m460-380 280-180-280-180v360ZM320-240q-33 0-56.5-23.5T240-320v-480q0-33 23.5-56.5T320-880h480q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H320Zm0-80h480v-480H320v480ZM160-80q-33 0-56.5-23.5T80-160v-560h80v560h560v80H160Zm160-720v480-480Z" /></svg>
                            Library
                        </NavLink>
                    </li> */}
                    {/* <li className="SideBar-li">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-120q-138 0-240.5-91.5T122-440h82q14 104 92.5 172T480-200q117 0 198.5-81.5T760-480q0-117-81.5-198.5T480-760q-69 0-129 32t-101 88h110v80H120v-240h80v94q51-64 124.5-99T480-840q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-480q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-120Zm112-192L440-464v-216h80v184l128 128-56 56Z"/></svg>
                        History
                    </li> */}
                    <li className="SideBar-li">
                        <NavLink to="/your-videos" className={NavLink} onPointerDown={handleLinkClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m380-300 280-180-280-180v360ZM160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm0-80h640v-480H160v480Zm0 0v-480 480Z" /></svg>
                            Your videos
                        </NavLink>
                    </li>
                    {/* <li className="SideBar-li">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z"/></svg>
                        Watch Later
                    </li> */}
                    {/* <li className="SideBar-li">
                        <NavLink to="/liked" className={NavLink} onPointerDown={handleLinkClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M720-120H280v-520l280-280 50 50q7 7 11.5 19t4.5 23v14l-44 174h258q32 0 56 24t24 56v80q0 7-2 15t-4 15L794-168q-9 20-30 34t-44 14Zm-360-80h360l120-280v-80H480l54-220-174 174v406Zm0-406v406-406Zm-80-34v80H160v360h120v80H80v-520h200Z" /></svg>
                            Liked Videos
                        </NavLink>
                    </li> */}
                </ul>
            </nav>
        </div>
    )
}