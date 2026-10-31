
import { Header } from '../../src/components/Header/Header'
import { SideBar } from '../../src/components/SideBar/SideBar'
import { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../../src/App'
// import '../EditVideo/EditVideo.css'
import './EditVideo.css'

export const EditVideo = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const { _id } = useParams()

    const {
        VITE_EXPRESS,
        user,
        formEditVideo,
        patchVideo,
        putVideo,
        deleteVideo
    } = useContext(UserContext)

    const [video, setVideo] = useState(location.state?.video || null)
    const [loading, setLoading] = useState(!location.state?.video)

    // Si entramos directamente en la URL o recargamos,
    // recuperamos el vídeo desde la API.
    useEffect(() => {

        if (location.state?.video) {
            setVideo(location.state.video)
            setLoading(false)
            return
        }

        const getVideo = async () => {
            try {
                const request = await fetch(`${VITE_EXPRESS}/video/${_id}`)
                const result = await request.json()

                if (!request.ok) {
                    throw new Error(result.message || 'Video not found')
                }

                setVideo(result.data)

            } catch (error) {
                console.error('Error fetching video:', error)
                setVideo(null)

            } finally {
                setLoading(false)
            }
        }

        if (VITE_EXPRESS && _id) {
            getVideo()
        }

    }, [VITE_EXPRESS, _id, location.state])

    if (loading) {
        return (
            <div className="EditVideo">
                <Header />
                <div className="Container">
                    <SideBar />
                    <div className="Content">
                        <h2 className="EditVideo-h2">Loading video...</h2>
                    </div>
                </div>
            </div>
        )
    }

    if (!video) {
        return (
            <div className="EditVideo">
                <Header />
                <div className="Container">
                    <SideBar />
                    <div className="Content">
                        <h2 className="EditVideo-h2">Video not found</h2>
                        <button type="button" onClick={() => navigate('/your-videos')}>
                            Back to your videos
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    const isOwner =
        user && String(video.owner) === String(user._id)

    if (!isOwner) {
        return (
            <div className="EditVideo EditVideo">
                <Header />
                <div className="Container">
                    <SideBar />
                    <div className="Content">
                        <h2 className="EditVideo-h2">Access denied</h2>
                        <span className="EditVideo-span">
                            You can only edit your own videos.
                        </span>
                        <button type="button" onClick={() => navigate('/your-videos')}>
                            Back to your videos
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    const selectedCategory =
        video.category?.find(cat => cat !== 'All') || 'Mixes'

    return (
        <div className="EditVideo EditVideo">
            <Header />

            <div className="Container">
                <SideBar />

                <div className="Content">

                    <h2 className="EditVideo-h2">Edit video</h2>
                    <span className="EditVideo-span">
                        Manage the information of your uploaded video.
                    </span>

                    <form className="EditVideo-form" ref={formEditVideo}>

                        {/* TITLE */}
                        <div className="EditVideo-form--divider">
                            <label htmlFor="title">Video title</label>

                            <div className="EditVideo-input--wrapper">
                                <input
                                    type="text"
                                    name="title"
                                    defaultValue={video.title}
                                    placeholder="Enter the video title"
                                    required
                                />
                            </div>
                        </div>

                        {/* YOUTUBE URL */}
                        <div className="EditVideo-form--divider">
                            <label htmlFor="youtubeUrl">Video link</label>

                            <div className="EditVideo-input--wrapper">
                                <input
                                    type="url"
                                    name="youtubeUrl"
                                    defaultValue={video.youtubeUrl}
                                    placeholder="Paste the YouTube URL"
                                    required
                                />
                            </div>
                        </div>

                        {/* CATEGORY */}
                        <div className="EditVideo-form--divider">
                            <label htmlFor="category">Category</label>

                            <div className="EditVideo-input--wrapper">
                                <select
                                    name="category"
                                    defaultValue={selectedCategory}
                                    required
                                >
                                    <option value="Mixes">Mixes</option>
                                    <option value="Music">Music</option>
                                    <option value="Gaming">Gaming</option>
                                    <option value="Live">Live</option>
                                    <option value="Cinematography">Cinematography</option>
                                    <option value="Vlogs">Vlogs</option>
                                    <option value="Cooking">Cooking</option>
                                    <option value="Sports">Sports</option>
                                    <option value="News">News</option>
                                </select>
                            </div>
                        </div>

                        {/* THUMBNAIL */}
                        <div className="EditVideo-form--divider">
                            <label htmlFor="thumbnailImage">Thumbnail image</label>

                            <div className="EditVideo-input--wrapper">
                                <input
                                    type="url"
                                    name="thumbnailImage"
                                    defaultValue={video.thumbnailImage || ''}
                                    placeholder="Paste the thumbnail image URL (optional)"
                                />
                            </div>
                        </div>

                        {/* BUTTONS */}
                        <div className="EditVideo-submit--divider">

                            <div className="EditVideo-form--divider EditVideo-input--submit">
                                <button
                                    type="button"
                                    onClick={(e) => patchVideo(e, video, navigate)}
                                >
                                    Update info
                                </button>
                            </div>

                            <div className="EditVideo-form--divider EditVideo-input--submit">
                                <button
                                    type="button"
                                    onClick={(e) => putVideo(e, video, navigate)}
                                >
                                    Replace info
                                </button>
                            </div>

                            <div className="EditVideo-form--divider EditVideo-input--submit">
                                <button
                                    type="button"
                                    onClick={() => deleteVideo(video, navigate)}
                                >
                                    Delete video
                                </button>
                            </div>

                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}