import { Header } from '../../src/components/Header/Header.jsx'
import { SideBar } from '../../src/components/SideBar/SideBar.jsx'
import './YourVideos.css'
import { UserContext } from '../../src/App'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


export const YourVideos = () => {

    const navigate = useNavigate()
    // const goVideo = (video) => navigate(`/video/${video?._id}`, { state: { video } })
    const goVideo = (video) =>
    navigate(`/edit-video/${video?._id}`, {
        state: { video }
    })

    const { VITE_EXPRESS, user } = useContext(UserContext)
    // const API_URL = import.meta.env.VITE_EXPRESS;

    const [videos, setVideos] = useState([])

    // useEffect(() => {
    //     let getVideo = async () => {
    //         try {
    //             let options = { method: `get` }
    //             // let request = await fetch(`${VITE_EXPRESS}/video`, options)
    //             let request = await fetch(`${VITE_EXPRESS}/video?owner=${user._id}`, options)
    //             let { data } = await request.json()
    //             setVideos(Array.isArray(data) ? data : [])
    //         } catch (error) {
    //             console.error("Error fetching videos:", error)
    //         }
    //     }
    //     if (VITE_EXPRESS) getVideo()
    // }, [VITE_EXPRESS])

    useEffect(() => {

        let getVideo = async () => {
            try {
                let options = { method: 'GET' }

                let request = await fetch(
                    `${VITE_EXPRESS}/video?owner=${encodeURIComponent(user._id)}`,
                    options
                )
                let result = await request.json()

                if (!request.ok) {
                    throw new Error(result.message || 'Error fetching videos')
                }
                setVideos(Array.isArray(result.data) ? result.data : [])

            } catch (error) {
                console.error("Error fetching videos:", error)
            }
        }

        if (VITE_EXPRESS && user?._id) {
            getVideo()
        } else {
            setVideos([])
        }
    }, [VITE_EXPRESS, user?._id])

    // const myVideos = videos.filter(video =>
    //     video.channelName?.trim().toLowerCase() ===
    //     user?.fullName?.trim().toLowerCase()
    // )

    return (
        <div className="YourVideos">
            <Header />

            <div className="Container">
                <SideBar />

                <div className="Content">
                    <h2 className="YourVideos-h2">Your videos</h2>
                    <span className="YourVideos-span">See all your uploaded videos in one place.</span>
                    <span className="YourVideos-span">Edit or Delete by clicking on one of them below.</span>

                    <div className="YourVideos-videos">
                        {/* {myVideos.length > 0 ?
                            (myVideos.map((video) =>
                                <Video
                                    key={video._id}
                                    {...video}
                                    onVideoClick={() => goVideo(video)}
                                />
                            )) :
                            (<p className="YourVideos-empty">
                                You haven't uploaded any videos yet.
                            </p>
                            )} */}
                        {videos.length > 0 ? (
                            videos.map((video) =>
                                <Video
                                    key={video._id}
                                    {...video}
                                    onVideoClick={() => goVideo(video)}
                                />
                            )

                        ) : (

                            <p className="YourVideos-empty">
                                You haven't uploaded any videos yet.
                            </p>

                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}


const Video = ({ title, channelName, thumbnailImage, views, channelImage, onVideoClick
    // ,youtubeUrl, likes, subscribers, category, publishDate 
}) => {

    const formatCompactNumber = (number) => {
        const parsedNumber = Number(number);
        if (isNaN(parsedNumber)) return '0';
        if (number === null || number === undefined) return '';

        return new Intl.NumberFormat('en-US', {
            notation: 'compact',
            compactDisplay: 'short',
            maximumFractionDigits: 1
        }).format(parsedNumber);
    };


    return (
        <div className="YourVideos-video" onPointerDown={onVideoClick}>
            <div className="YourVideos-video--thumbnail">
                <img src={thumbnailImage ? thumbnailImage : `/assets/thumbnailImage_default.png`} alt={`${title}_video`} />
                <span className="YourVideos-video--duration">
                    {/* TODO insert duration param */}
                    10:00
                </span>
            </div>
            <div className="YourVideos-video--info">
                <div className="YourVideos-video--pfp">
                    <img src={channelImage ? channelImage : `/assets/profileImage_default.jpg`} />
                </div>
                <div className="YourVideos-video--text">
                    <h3 className="YourVideos-video--title">
                        {title}
                    </h3>
                    <div className="YourVideos-video--details">
                        <span className="YourVideos-video--creator">
                            {channelName}
                        </span>
                        <div className="YourVideos-video--analytics">
                            <span className="YourVideos-video--views">
                                {formatCompactNumber(views)} views
                            </span>
                            <span className="YourVideos-video--uploadDate">
                                {/* TODO ADD UPLOAD DATE */}
                                2 days ago
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}