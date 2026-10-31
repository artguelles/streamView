import { useNavigate } from 'react-router-dom'
import { Header } from '../../src/components/Header/Header'
import { SideBar } from '../../src/components/SideBar/SideBar'
import './Homepage.css'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../src/App'


export const Homepage = () => {

    const navigate = useNavigate()
    const goVideo = (video) => navigate(`/video/${video?._id}`, { state: { video } })

    const { VITE_EXPRESS } = useContext(UserContext)
    const API_URL = import.meta.env.VITE_EXPRESS;

    const [videos, setVideos] = useState([])

    const [selectedCategory, setSelectedCategory] = useState("All")

    useEffect(() => {
        let getVideo = async () => {
            try {
                let options = { method: `get` }
                let request = await fetch(`${VITE_EXPRESS}/video`, options)
                let { data } = await request.json()
                setVideos(Array.isArray(data) ? data : [])
            } catch (error) {
                console.error("Error fetching videos:", error)
            }
        }
        if (VITE_EXPRESS) getVideo()
    }, [VITE_EXPRESS])

    const categories = [
        "All", "Mixes", "Music", "Gaming", "Live",
        "Cinematography", "Vlogs", "Cooking", "Sports", "News"
    ]

    const filteredVideos = selectedCategory === "All" 
    ? videos 
    : videos.filter(video => {
        if (!video.category || !Array.isArray(video.category)) return false;
        return video.category.some(cat => cat.trim().toLowerCase() === selectedCategory.trim().toLowerCase());
    });

    return (
        <div className="Homepage">

            <Header />

            <div className="Container">

                <SideBar />

                <div className="Content">
                    <div className="Homepage-categories">
                        <ul className="Homepage-ul">
                            {categories.map((cat) => (
                                <li
                                    key={cat}
                                    className={`Homepage-li ${selectedCategory === cat ? 'active' : ''}`}
                                    onClick={() => setSelectedCategory(cat)}
                                >
                                    {cat}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="Homepage-videos">
                        {filteredVideos.map((video) =>
                            <Video key={video._id}{...video} onVideoClick={() => goVideo(video)} />
                        )}
                    </div>
                </div>

            </div>
        </div>
    )
}


const Video = ({ title, channelName, thumbnailImage, views, publishDate, channelImage, youtubeUrl, likes, subscribers, category, onVideoClick }) => {

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
        <div className="Homepage-video" onPointerDown={onVideoClick}>
            <div className="Homepage-video--thumbnail">
                <img src={thumbnailImage ? thumbnailImage : `/assets/thumbnailImage_default.png`} alt={`${title}_video`} />
                <span className="Homepage-video--duration">
                    {/* TODO insert duration param */}
                    10:00
                </span>
            </div>
            <div className="Homepage-video--info">
                <div className="Homepage-video--pfp">
                    <img src={channelImage ? channelImage : `/assets/profileImage_default.jpg`} />
                </div>
                <div className="Homepage-video--text">
                    <h3 className="Homepage-video--title">
                        {title}
                    </h3>
                    <div className="Homepage-video--details">
                        <span className="Homepage-video--creator">
                            {channelName}
                        </span>
                        <div className="Homepage-video--analytics">
                            <span className="Homepage-video--views">
                                {formatCompactNumber(views)} views
                            </span>
                            <span className="Homepage-video--uploadDate">
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