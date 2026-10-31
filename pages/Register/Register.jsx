import { useEffect, useRef, useState } from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import './Register.css'
import { UserContext } from '../../src/App'

export const Register = () => {

    const { addUser, formPostRegister } = useContext(UserContext)

    const navigate = useNavigate()
    const goLogin = () => navigate('/')

    return (
        <div className="Register">
            <a href='#' className="Register-logo">StreamView</a>
            <span className="Register-span">Elevate your cinematic experience</span>
            <div className="Register-container">
                <h1 className="Register-h1">
                    Create Account
                </h1>
                <span className="Register-span">Join thousands of viewers worldwide</span>
                <form className='Register-form'
                    onSubmit={(e) => addUser(e, navigate)}
                    ref={formPostRegister}
                >
                    <div className="Register-form--divider">
                        <label htmlFor="fullName">Full Name</label>
                        <div className="Register-input--wrapper">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M367-527q-47-47-47-113t47-113q47-47 113-47t113 47q47 47 47 113t-47 113q-47 47-113 47t-113-47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm296.5-343.5Q560-607 560-640t-23.5-56.5Q513-720 480-720t-56.5 23.5Q400-673 400-640t23.5 56.5Q447-560 480-560t56.5-23.5ZM480-640Zm0 400Z" /></svg>
                            <input type='text' name='fullName' placeholder='Enter your full name' />
                        </div>
                    </div>

                    <div className="Register-form--divider">
                        <label htmlFor="email">Email</label>
                        <div className="Register-input--wrapper">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" /></svg>
                            <input type='email' name='email' placeholder='name@example.com' />
                        </div>
                    </div>

                    <div className="Register-form--divider">
                        <label htmlFor="password">Password</label>
                        <div className="Register-input--wrapper">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm296.5-143.5Q560-327 560-360t-23.5-56.5Q513-440 480-440t-56.5 23.5Q400-393 400-360t23.5 56.5Q447-280 480-280t56.5-23.5ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z" /></svg>
                            <input type='password' name='password' placeholder='········' />
                        </div>
                    </div>

                    <div className="Register-form--divider">
                        <label htmlFor="passwordConfirm">Confirm Password</label>
                        <div className="Register-input--wrapper">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480h80q0 66 25 124.5t68.5 102q43.5 43.5 102 69T480-159q134 0 227-93t93-227q0-134-93-227t-227-93q-89 0-161.5 43.5T204-640h116v80H80v-240h80v80q55-73 138-116.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-80-240q-17 0-28.5-11.5T360-360v-120q0-17 11.5-28.5T400-520v-40q0-33 23.5-56.5T480-640q33 0 56.5 23.5T560-560v40q17 0 28.5 11.5T600-480v120q0 17-11.5 28.5T560-320H400Zm40-200h80v-40q0-17-11.5-28.5T480-600q-17 0-28.5 11.5T440-560v40Z" /></svg>
                            <input type='password' name='passwordConfirm' placeholder='········' />
                        </div>
                    </div>
                    {/* TODO LINK A TO 404 PAGE */}
                    <div className="Register-form--divider Register-terms">
                        <input type="checkbox" id='agreeTerms' />
                        <label htmlFor="agreeTerms">I agree to the <a href='#' className="Register-highlight">Terms of Service</a> and <a href="#" className="Register-highlight">Privacy Policy</a></label>
                    </div>

                    <div className="Register-form--divider Register-input--submit">
                        <input type="submit" value="Create Account" />
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" /></svg>
                    </div>
                </form>

                <button className="RegisterToLogin"
                onPointerDown={goLogin} 
                >Already have an account? <span className="Register-highlight">Sign in</span>
                </button>
            </div>

            <span className="Register-span">© 2026 StreamView Inc. All Rights Reserved.</span>

        </div>
    )
}