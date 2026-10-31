import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../../src/App'
import './Login.css'

export const Login = ()=>{

    const { logUser, formPostLogin } = useContext(UserContext)

    const navigate = useNavigate()

    const goRegister = () => navigate('/register')

    return(
        <div className="Login">
            <a href="#" className="Login-logo">StreamView</a>
            <span className="Login-span">Stream everything you love in one place</span>

            <div className="Login-container">
                <h1 className="Login-h1">Sign in</h1>
                <span className="Login-span">to continue to StreamView</span>

                <form className='Login-form' 
                // onSubmit={logUser} ref={formPostLogin}
                onSubmit={(e) => logUser(e, navigate)} 
                    ref={formPostLogin}
                >
                    <div className="Login-form--divider">
                        <label htmlFor="email">Email</label>
                        <div className="Login-input--wrapper">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" /></svg>
                            <input type='text' name='email' placeholder='name@email.com' />
                        </div>
                    </div>

                    <div className="Login-form--divider">
                        <label htmlFor="password">Password</label>
                        <div className="Login-input--wrapper">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm296.5-143.5Q560-327 560-360t-23.5-56.5Q513-440 480-440t-56.5 23.5Q400-393 400-360t23.5 56.5Q447-280 480-280t56.5-23.5ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z" /></svg>
                            <input type='password' name='password' placeholder='········' />
                        </div>
                    </div>

                    {/* TODO MAYBE */}
                    {/* <div className="Login-form--divider Login-remember">
                        <input type='checkbox' name='check' />
                        <label htmlFor="check">Remember me for 30 days</label>
                    </div> */}

                    <div className="Login-form--divider Login-input--submit">
                        <input type="submit" value="Sign in" />
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" /></svg>
                    </div>
                </form>

                <button className="LoginToRegister" 
                onPointerDown={goRegister} 
                >Don't have an account? <span className="Login-highlight"></span>Create an account</button>
            </div>

            <ul className="Login-terms">
                {/* TODO ADD 404 PAGE */}
                <li className="Login-term">
                    <a href="#" className="Login-term--a">Privacy Policy</a>
                </li>
                <li className="Login-term">
                    <a href="#" className="Login-term--a">Terms of Service</a>
                </li>
                <li className="Login-term">
                    <a href="#" className="Login-term--a">Help Center</a>
                </li>
            </ul>

            <span className="Login-span">© 2026 StreamView Inc. All Rights Reserved.</span>

        </div>
    )
}