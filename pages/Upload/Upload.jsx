import { Header } from '../../src/components/Header/Header'
import { SideBar } from '../../src/components/SideBar/SideBar'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../src/App'
import './Upload.css'

export const Upload = () => {

    const { addVideo, formPostUpload } = useContext(UserContext)
    const navigate = useNavigate()

    return (
        <div className="Upload">
            <Header />

            <div className="Container">
                <SideBar />

                <div className="Content">
                    <h2 className="Upload-h2">Upload a video</h2>
                    <span className="Upload-span">In this page you can upload a video to StreamView</span>

                    <form className='Upload-form'
                        onSubmit={(e) => addVideo(e, navigate)}
                        ref={formPostUpload}
                    >
                        <div className="Upload-form--divider">
                            <label htmlFor="title">Title (Required)</label>
                            <div className="Upload-input--wrapper">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="24px" width="24px" fill="#e3e3e3"><path d="M10.5,20V7H5V4H19V7H13.5V20h-3Z" /></svg>                                
                                <input type='text' name='title' placeholder='Enter the title you want the video to have' required />
                            </div>
                        </div>

                        {/* <div className="Upload-form--divider">
                            <label htmlFor="publishDate">Publish date</label>
                            <div className="Upload-input--wrapper">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="24px" width="24px" fill="#e3e3e3"><path d="M7.23,15.78Q6.5,15.05 6.5,14t0.73-1.78T9,11.5t1.78,0.72T11.5,14t-0.72,1.78T9,16.5T7.23,15.78ZM5,22q-0.83,0-1.41-0.59T3,20V6Q3,5.18 3.59,4.59T5,4H6V2H8V4h8V2h2V4h1q0.83,0 1.41,0.59Q21,5.18 21,6V20q0,0.82-0.59,1.41T19,22H5Zm0-2H19V10H5V20ZM5,8H19V6H5V8ZM5,8V6V8Z" /></svg>                                <input type='date' name='publishDate' placeholder='Add the date published' />
                            </div>
                        </div> */}

                        {/* <div className="Upload-form--divider">
                            <label htmlFor="views">Views</label>
                            <div className="Upload-input--wrapper">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="24px" width="24px" fill="#e3e3e3"><path d="M15.19,14.69q1.31-1.31 1.31-3.19T15.19,8.31T12,7T8.81,8.31T7.5,11.5t1.31,3.19T12,16t3.19-1.31Zm-5.1-1.28Q9.3,12.63 9.3,11.5t0.79-1.91T12,8.8t1.91,0.79q0.79,0.79 0.79,1.91t-0.79,1.91T12,14.2t-1.91-0.79ZM5.35,16.96Q2.35,14.93 1,11.5Q2.35,8.07 5.35,6.04T12,4t6.65,2.04T23,11.5q-1.35,3.42-4.35,5.46T12,19T5.35,16.96ZM12,11.5Zm5.19,4.01q2.36-1.49 3.61-4.01q-1.25-2.53-3.61-4.01T12,6Q9.18,6 6.81,7.49T3.2,11.5q1.25,2.52 3.61,4.01T12,17t5.19-1.49Z" /></svg>                                <input type='number' name='views' placeholder='Add the views the video has' />
                            </div>
                        </div> */}

                        <div className="Upload-form--divider">
                            <label htmlFor="youtubeUrl">Video link (Required)</label>
                            <div className="Upload-input--wrapper">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="24px" width="24px" fill="#e3e3e3"><path d="M11,17H7q-2.07,0-3.54-1.46T2,12Q2,9.92 3.46,8.46T7,7h4V9H7Q5.75,9 4.88,9.88T4,12t0.88,2.13T7,15h4v2ZM8,13V11h8v2H8Zm5,4V15h4q1.25,0 2.13-0.88T20,12T19.13,9.88T17,9H13V7h4q2.07,0 3.54,1.46T22,12t-1.46,3.54T17,17H13Z"/></svg>                                
                                <input type='text' name='youtubeUrl' placeholder='Paste the link of the video you want to upload' required/>
                            </div>
                        </div>

                        {/* <div className="Upload-form--divider">
                            <label htmlFor="likes">Likes</label>
                            <div className="Upload-input--wrapper">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm296.5-143.5Q560-327 560-360t-23.5-56.5Q513-440 480-440t-56.5 23.5Q400-393 400-360t23.5 56.5Q447-280 480-280t56.5-23.5ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z" /></svg>
                                <input type='number' name='likes' placeholder='Add the likes the video has' />
                            </div>
                        </div> */}

                        {/* <div className="Upload-form--divider">
                            <label htmlFor="subscribers">Subscribers</label>
                            <div className="Upload-input--wrapper">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm296.5-143.5Q560-327 560-360t-23.5-56.5Q513-440 480-440t-56.5 23.5Q400-393 400-360t23.5 56.5Q447-280 480-280t56.5-23.5ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z" /></svg>
                                <input type='number' name='subscribers' placeholder='Add the subscribe count the channel has' />
                            </div>
                        </div> */}

                        <div className="Upload-form--divider">
                            <label htmlFor="category">Category</label>
                            <div className="Upload-input--wrapper">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="24px" width="24px" fill="#e3e3e3"><path d="M6.5,11L12,2l5.5,9H6.5Zm11,11q-1.88,0-3.19-1.31T13,17.5t1.31-3.19T17.5,13t3.19,1.31T22,17.5t-1.31,3.19T17.5,22ZM3,21.5v-8h8v8H3ZM17.5,20q1.05,0 1.78-0.73T20,17.5t-0.72-1.78T17.5,15t-1.77,0.72T15,17.5t0.73,1.77T17.5,20ZM5,19.5H9v-4H5v4ZM10.05,9h3.9L12,5.85L10.05,9ZM12,9ZM9,15.5Zm8.5,2Z"/></svg>                                <select name="category" defaultValue="" required>
                                    <option value="" disabled>
                                        Select a category
                                    </option>
                                    <option value="Mixes">Mixes</option>
                                    <option value="Music">Music</option>
                                    <option value="Gaming">Gaming</option>
                                    <option value="Live">Live</option>
                                    <option value="Cinematography">Cinematography</option>
                                    <option value="Vlogs">Vlogs</option>
                                    <option value="Cooking">Cooking</option>
                                    <option value="Sports">Sports</option>
                                    <option value="News">News</option>
                                </select>                            </div>
                        </div>

                        <div className="Upload-form--divider">
                            <label htmlFor="thumbnailImage">Thumbnail image</label>
                            <div className="Upload-input--wrapper">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="24px" width="24px" fill="#e3e3e3"><path d="M5,21q-0.83,0-1.41-0.59T3,19V5Q3,4.17 3.59,3.59T5,3H19q0.83,0 1.41,0.59T21,5V19q0,0.82-0.59,1.41T19,21H5Zm0-2H19V5H5V19Zm1-2H18l-3.75-5l-3,4L9,13L6,17ZM5,19V5V19Z"/></svg>                                <input type='text' name='thumbnailImage' placeholder='Paste a image fitting for the thumbnail of the video' />
                            </div>
                        </div>

                        <div className="Upload-form--divider Upload-input--submit">
                            <input type="submit" value="Upload your video to StreamView" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}