import { useLocation, useNavigate } from 'react-router-dom'
import { Header } from '../../src/components/Header/Header'
import { SideBar } from '../../src/components/SideBar/SideBar'
import './VideoPage.css'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../src/App'

export const VideoPage = () => {
    const navigate = useNavigate()
    const goVideo = (video) => navigate(`/video/${video?._id}`, { state: { video } })
    const location = useLocation()
    
    // Estado del video en reproducción actual
    const [currentVideo, setCurrentVideo] = useState(location.state?.video)
    const { VITE_EXPRESS } = useContext(UserContext)
    
    // Lista completa de videos que viene de la base de datos
    const [allVideos, setAllVideos] = useState([])
    // Lista final filtrada y aleatoria (máx 8) que se renderiza
    const [recommendedVideos, setRecommendedVideos] = useState([])

    // Escucha cambios de ruta para actualizar el reproductor con el nuevo video
    useEffect(() => {
        if (location.state?.video) {
            setCurrentVideo(location.state.video)
        }
    }, [location.state])

    // Fetch inicial para traer los videos de la API
    useEffect(() => {
        let getVideo = async () => {
            try {
                let options = { method: `get` }
                let request = await fetch(`${VITE_EXPRESS}/video`, options)
                let { data } = await request.json()
                setAllVideos(Array.isArray(data) ? data : [])
            } catch (error) {
                console.error("Error fetching videos:", error)
            }
        }
        if (VITE_EXPRESS) getVideo()
    }, [VITE_EXPRESS])

    // Filtra el video actual y genera los 8 videos aleatorios cuando cambia el video o la lista general
    useEffect(() => {
        if (allVideos.length > 0 && currentVideo) {
            // 1. Excluir el video que se está reproduciendo actualmente
            const filtered = allVideos.filter(vid => vid._id !== currentVideo._id)
            
            // 2. Mezclar aleatoriamente el array resultante (Algoritmo Durstenfeld / Fisher-Yates)
            const shuffled = [...filtered]
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
            }
            
            // 3. Cortar para quedarse únicamente con un máximo de 8 videos
            setRecommendedVideos(shuffled.slice(0, 6))
        }
    }, [allVideos, currentVideo])

    if (!currentVideo) {
        return (
            <div className="VideoPage-loading">
                <Header />
                <div className="Container">
                    <SideBar />
                    <div className="Content">Cargando información del video...</div>
                </div>
            </div>
        )
    }

    const { title, channelName, views, channelImage, youtubeUrl, likes, subscribers } = currentVideo

    const formatCompactNumber = (number) => {
        const parsedNumber = Number(number);
        if (isNaN(parsedNumber)) return '0';
        return new Intl.NumberFormat('en-US', {
            notation: 'compact',
            compactDisplay: 'short',
            maximumFractionDigits: 1
        }).format(parsedNumber);
    };

    return (
        <div className="VideoPage">
            <Header />

            <div className="Container">
                <SideBar />

                <div className="Content">
                    <div className="Content-wrapper">
                        <div className="Content-focus">
                            <div className="Video-wrapper">
                                <iframe src={youtubeUrl?.replace("watch?v=", "embed/")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                            </div>
                            <h2 className="Video-title">{title}</h2>
                            <div className="Video-bar">
                                <div className="Video-analytics">
                                    <span className="Homepage-video--views">
                                        {formatCompactNumber(views)} views
                                    </span>
                                    <span className="Homepage-video--uploadDate">
                                        2 days ago
                                    </span>
                                </div>
                                <div className="Video-btn">
                                    <button className="Video-like--btn">
                                        <svg xmlns="http://w3.org" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M720-120H280v-520l280-280 50 50q7 7 11.5 19t4.5 23v14l-44 174h258q32 0 56 24t24 56v80q0 7-2 15t-4 15L794-168q-9 20-30 34t-44 14Zm-360-80h360l120-280v-80H480l54-220-174 174v406Zm0-406v406-406Zm-80-34v80H160v360h120v80H80v-520h200Z" /></svg>
                                        {likes === 0 ? '' : `${formatCompactNumber(likes)}`}
                                    </button>
                                    <button className="Video-dislike--btn">
                                        <svg xmlns="http://w3.org" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M240-840h440v520L400-40l-50-50q-7-7-11.5-19t-4.5-23v-14l44-174H120q-32 0-56-24t-24-56v-80q0-7 2-15t4-15l120-282q9-20 30-34t44-14Zm360 80H240L120-480v80h360l-54 220 174-174v-406Zm0 406v-406 406Zm80 34v-80h120v-360H680v-80h200v520H680Z" /></svg>
                                    </button>
                                </div>
                            </div>
                            <div className="Video-channel">
                                <div className="Video-channel--pfp">
                                    <img src={channelImage ? channelImage : `/assets/profileImage_default.jpg`} />
                                </div>
                                <div className="Video-channel--details">
                                    <h3 className="Video-channel--name">
                                        {channelName}
                                    </h3>
                                    <span className="Video-channel--subs">
                                        {formatCompactNumber(subscribers)} subscribers
                                    </span>
                                </div>
                                <button className="Video-channel--subscribe">
                                    Subscribe
                                </button>
                            </div>

                            <div className="Video-comments">
                                <h4 className="Comments-h4">1 Comment</h4>
                                <ul className="Comments-ul">
                                    <li className="Comments-li">
                                        <div className="Comments-pfp">
                                            <img src={`/assets/profileImage_default.jpg`} />
                                        </div>
                                        <div className="Comments-details">
                                            <h3 className="Comments-user">John Doe</h3>
                                            <span className="Comments-comment">
                                                The lighting in the Shibuya segment is absolutely breathtaking. What camera was used for this?
                                            </span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className="Content-recommended">
                            <h4 className="Recommended-h4">Recommended videos</h4>
                            <ul className="Recommended-video--list">
                                {recommendedVideos.map((videorec) =>
                                    <RecommendedVideo 
                                        key={videorec._id}
                                        {...videorec} 
                                        onVideoClick={() => goVideo(videorec)} 
                                        formatCompactNumber={formatCompactNumber}
                                    />
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


const RecommendedVideo = ({ title, channelName, thumbnailImage, views, publishDate, channelImage, youtubeUrl, likes, subscribers, category, onVideoClick, formatCompactNumber }) => {

    return (
        <li className="Recommended-video" onClick={onVideoClick}>
            <div className="Recommended-video--thumbnail">
                <img src={thumbnailImage ? thumbnailImage : `/assets/thumbnailImage_default.png`} alt={`${title}_video`} />
                <span className="Recommended-video--duration">
                    {/* TODO insert duration param */}
                    10:00
                </span>
            </div>
            <div className="Recommended-video--info">
                <div className="Recommended-video--text">
                    <h3 className="Recommended-video--title">
                        {title}
                    </h3>
                    <div className="Recommended-video--details">
                        <span className="Recommended-video--creator">
                            {channelName}
                        </span>
                        <div className="Recommended-video--analytics">
                            <span className="Recommended-video--views">
                                {formatCompactNumber(views)} views
                                
                            </span>
                            <span className="Recommended-video--uploadDate">
                                {/* TODO ADD UPLOAD DATE */}
                                2 days ago
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    )
}