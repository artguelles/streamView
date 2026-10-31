import { Header } from '../../src/components/Header/Header'
import { SideBar } from '../../src/components/SideBar/SideBar'
import { useContext } from 'react'
import { UserContext } from '../../src/App'
import { useNavigate } from 'react-router-dom'
import './Profile.css'

export const Profile = () => {
    const { patchUser, putUser, deleteUser, formEditProfile, user, logoutUser } = useContext(UserContext)
    const navigate = useNavigate()

    return (
        <div className="Profile">
            <Header />

            <div className="Container">
                <SideBar />

                <div className="Content">
                    <h2 className="Profile-h2">Edit Profile</h2>
                    <span className="Profile-span">Manage your account settings</span>

                    <form className='Profile-form' ref={formEditProfile}>

                        <div className="Profile-form--divider">
                            <label htmlFor="fullName">Edit full name</label>
                            <div className="Profile-input--wrapper">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M367-527q-47-47-47-113t47-113q47-47 113-47t113 47q47 47 47 113t-47 113q-47 47-113 47t-113-47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm296.5-343.5Q560-607 560-640t-23.5-56.5Q513-720 480-720t-56.5 23.5Q400-673 400-640t23.5 56.5Q447-560 480-560t56.5-23.5ZM480-640Zm0 400Z" /></svg>
                                <input type='text' name='fullName' placeholder={user?.fullName || 'Enter your full name'} />
                            </div>
                        </div>

                        <div className="Profile-form--divider">
                            <label htmlFor="email">Change email address</label>
                            <div className="Profile-input--wrapper">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" /></svg>
                                <input type='email' name='email' placeholder={user?.email || 'name@example.com'} />
                            </div>
                        </div>

                        <div className="Profile-form--divider">
                            <label htmlFor="password">Change password</label>
                            <div className="Profile-input--wrapper">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm296.5-143.5Q560-327 560-360t-23.5-56.5Q513-440 480-440t-56.5 23.5Q400-393 400-360t23.5 56.5Q447-280 480-280t56.5-23.5ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z" /></svg>
                                <input type='password' name='password' placeholder='Type in your new password here' />
                            </div>
                        </div>

                        <div className="Profile-form--divider">
                            <label htmlFor="passwordConfirm">Confirm Password</label>
                            <div className="Profile-input--wrapper">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm296.5-143.5Q560-327 560-360t-23.5-56.5Q513-440 480-440t-56.5 23.5Q400-393 400-360t23.5 56.5Q447-280 480-280t56.5-23.5ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z" /></svg>
                                <input type='password' name='passwordConfirm' placeholder='Confirm your new password' />
                            </div>
                        </div>

                        <div className="Profile-form--divider">
                            <label htmlFor="image">Profile picture</label>
                            <div className="Profile-input--wrapper">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="24px" width="24px" fill="#e3e3e3"><path d="M5,21q-0.83,0-1.41-0.59T3,19V5Q3,4.17 3.59,3.59T5,3H19q0.83,0 1.41,0.59T21,5V19q0,0.82-0.59,1.41T19,21H5Zm0-2H19V5H5V19Zm1-2H18l-3.75-5l-3,4L9,13L6,17ZM5,19V5V19Z" /></svg>                                <input type='text' name='image' placeholder='Insert the copied link of the image' />
                            </div>
                        </div>

                        <div className="Profile-form--divider Profile-image">
                            <img src={user.image} alt="image" />
                        </div>

                        <div className="Profile-submit--divider">

                            <div className="Profile-form--divider Profile-input--submit">
                                <button type="button" onClick={patchUser}>
                                    Update info
                                </button>
                            </div>

                            <div className="Profile-form--divider Profile-input--submit">
                                <button type="button" onClick={putUser}>
                                    Replace info
                                </button>
                            </div>

                            <div className="Profile-form--divider Profile-input--submit">
                                <button type="button" onClick={() => deleteUser(navigate)}>
                                    Delete user
                                </button>
                            </div>

                            <div className="Profile-form--divider Profile-input--submit">
                                <button type="button" onClick={() => logoutUser(navigate)}>
                                    Log out
                                </button>
                            </div>



                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}