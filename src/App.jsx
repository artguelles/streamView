import { useState, useRef, createContext, useEffect, useContext } from 'react'
import { Homepage } from '../pages/Homepage/Homepage'
import './App.css'
// import { Header } from './components/Header/Header'
// import { SideBar } from './components/SideBar/SideBar'
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { Register } from '../pages/Register/Register'
import { Login } from '../pages/Login/Login'
import { VideoPage } from '../pages/VideoPage/VideoPage'
import { Profile } from '../pages/Profile/Profile'
import { Liked } from '../pages/Liked/Liked'
import { Library } from '../pages/Library/Library'
import { YourVideos } from '../pages/YourVideos/YourVideos'
import { Upload } from '../pages/Upload/Upload'
import { Error404 } from '../pages/Error404/Error404'
import { EditVideo } from '../pages/EditVideo/EditVideo'

export const UserContext = createContext()

function App() {
  const { VITE_EXPRESS } = import.meta.env

  const [user, setUser] = useState(() => {
    const sessionLocal = localStorage.getItem('usuario')
    if (sessionLocal) {
      return JSON.parse(sessionLocal).user
    }
    return null
  })
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen);


  const formPostRegister = useRef(null)
  const formPostLogin = useRef(null)
  const formPostUpload = useRef(null)
  const formEditVideo = useRef(null)


  let getUser = async () => {
    let options = {
      method: `get`
    }

    let request = await fetch(`${VITE_EXPRESS}/user`, options)
    let { data } = await request.json()
    console.log(data)

    setUser(data)
  }

  // let addUser = async (e, navigate) => {
  //   e.preventDefault()
  //   console.log(`Adding user`)

  //   const { fullName, email, password, passwordConfirm } = formPostRegister.current

  //   if (password.value !== passwordConfirm.value) {
  //     alert("Las contraseñas no coinciden")
  //     return
  //   }

  //   const newUser = {
  //     fullName: fullName.value,
  //     email: email.value,
  //     password: password.value
  //   }

  //   let options = {
  //     method: `post`,
  //     headers: {
  //       "Content-type": "application/json"
  //     },
  //     body: JSON.stringify(newUser)
  //   }

  //   let request = await fetch(`${VITE_EXPRESS}/user`, options)
  //   let { data } = await request.json()
  //   setUser(data)

  //   formPostRegister.current.reset()

  //   navigate('/')
  // }

  // USERS

  let addUser = async (e, navigate) => {
    e.preventDefault()
    console.log(`Adding user`)

    const { fullName, email, password, passwordConfirm } = formPostRegister.current

    if (password.value !== passwordConfirm.value) {
      alert("Las contraseñas no coinciden")
      return
    }

    const newUser = {
      fullName: fullName.value,
      email: email.value,
      password: password.value
    }

    let options = {
      method: `post`,
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(newUser)
    }

    try {
      let request = await fetch(`${VITE_EXPRESS}/user`, options)
      let result = await request.json()

      if (!request.ok) {
        console.error("Error al registrar:", result)
        alert(result.message || result.error || "No se ha podido registrar el usuario")
        return
      }

      let { data } = result

      setUser(data)

      formPostRegister.current.reset()

      navigate('/')

    } catch (err) {
      console.error("Error de conexión:", err)
      alert("No se ha podido conectar con el servidor")
    }
  }

  // let logUser = async (e, navigate) => {
  //   e.preventDefault()
  //   console.log(`Logging in`)

  //   const { email, password } = formPostLogin.current

  //   const loggedUser = {
  //     email: email.value,
  //     password: password.value
  //   }

  //   let options = {
  //     method: `post`,
  //     headers: {
  //       "Content-type": "application/json"
  //     },
  //     body: JSON.stringify(loggedUser)
  //   }

  //   let request = await fetch(`${VITE_EXPRESS}/user/login`, options)
  //   let { data } = await request.json()
  //   setUser(data)

  //   navigate('/')
  //   localStorage.setItem('usuario', JSON.stringify({ login: true, user: data }))

  //   formPostLogin.current.reset()
  //   navigate('/home')
  // }

  const logUser = async (e, navigate) => {
    e.preventDefault()

    console.log('Logging in')

    const { email, password } = formPostLogin.current

    try {
      const res = await fetch(`${VITE_EXPRESS}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email.value,
          password: password.value
        })
      })

      const result = await res.json()

      if (!res.ok) {
        alert(result.message || 'Error al iniciar sesión')
        return
      }

      const { data } = result

      setUser(data)

      localStorage.setItem(
        'usuario',
        JSON.stringify({
          login: true,
          user: data
        })
      )

      formPostLogin.current.reset()

      navigate('/home')

    } catch (err) {
      console.error('Error en el login:', err)
      alert('No se ha podido conectar con el servidor')
    }
  }

  const formEditProfile = useRef(null)

  // EDIT PROFILE
  // let patchUser = async (e) => {
  //   e.preventDefault()
  //   const { fullName, email, password, passwordConfirm, image } = formEditProfile.current

  //   if (password.value && password.value !== passwordConfirm.value) {
  //     alert("Las contraseñas no coinciden")
  //     return
  //   }

  //   const updatedData = {}
  //   if (fullName.value) updatedData.fullName = fullName.value
  //   if (email.value) updatedData.email = email.value
  //   if (password.value) updatedData.password = password.value
  //   if (image.value) updatedData.image = image.value

  //   if (Object.keys(updatedData).length === 0) return alert("No hay cambios para actualizar (PATCH).")

  //   let options = {
  //     method: 'PATCH',
  //     headers: { "Content-type": "application/json" },
  //     body: JSON.stringify(updatedData)
  //   }

  //   try {
  //       let request = await fetch(`${VITE_EXPRESS}/user/${user._id}`, options)
  //       if (request.ok) {
  //         let { data } = await request.json()
  //         setUser(data)
  //         localStorage.setItem('usuario', JSON.stringify({ login: true, user: data }))
  //         formEditProfile.current.reset()
  //         alert("¡Perfil actualizado con PATCH!")
  //       }
  //     } catch (error) { console.error(error) }
  // }}

  let patchUser = async (e) => {
    e.preventDefault()

    const { fullName, email, password, passwordConfirm, image } =
      formEditProfile.current

    if (password.value && password.value !== passwordConfirm.value) {
      alert("Las contraseñas no coinciden")
      return
    }

    const updatedData = {}

    if (fullName.value) updatedData.fullName = fullName.value
    if (email.value) updatedData.email = email.value
    if (password.value) updatedData.password = password.value
    if (image.value) updatedData.image = image.value

    if (Object.keys(updatedData).length === 0) {
      return alert("No hay cambios para actualizar (PATCH).")
    }

    let options = {
      method: 'PATCH',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(updatedData)
    }

    try {
      console.log("Datos enviados mediante PATCH:", updatedData)

      let request = await fetch(`${VITE_EXPRESS}/user/${user._id}`, options)

      let result = await request.json()

      if (!request.ok) {
        console.error("Error al actualizar perfil:", result)
        alert(result.error || result.message || "Error al actualizar el perfil")
        return
      }

      let { data } = result

      setUser(data)

      localStorage.setItem(
        'usuario',
        JSON.stringify({ login: true, user: data })
      )

      formEditProfile.current.reset()

      alert("¡Perfil actualizado con PATCH!")

    } catch (error) {
      console.error("Error al actualizar perfil:", error)
      alert("No se ha podido conectar con el servidor")
    }
  }

  let putUser = async (e) => {
    e.preventDefault()
    const { fullName, email, password, passwordConfirm, image } = formEditProfile.current

    if (password.value && password.value !== passwordConfirm.value) {
      alert("Las contraseñas no coinciden")
      return
    }

    const fullData = {
      fullName: fullName.value || user.fullName,
      email: email.value || user.email,
      password: password.value || user.password,
      image: image.value || user.image || '/assets/profileImage_default.jpg'
    }

    let options = {
      method: 'PUT',
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(fullData)
    }

    try {
      let request = await fetch(`${VITE_EXPRESS}/user/${user._id}`, options)
      if (request.ok) {
        let { data } = await request.json()
        setUser(data)
        localStorage.setItem('usuario', JSON.stringify({ login: true, user: data }))
        formEditProfile.current.reset()
        alert("¡Perfil reemplazado con PUT!")
      }
    } catch (error) { console.error(error) }
  }

  // let deleteUser = async (navigate) => {
  //   if (!user || !user._id) return alert("Error: Sesión expirada. Por favor, vuelve a iniciar sesión.")
  //   const confirmDelete = window.confirm("¿Seguro que quieres eliminar tu cuenta permanentemente?")
  //   if (!confirmDelete) return

  //   let options = { method: 'DELETE' }

  //   try {
  //     let request = await fetch(`${VITE_EXPRESS}/user/${user._id}`, options)
  //     if (request.ok) {
  //       setUser(null)
  //       localStorage.removeItem('usuario')
  //       navigate('/')
  //       alert("Cuenta eliminada.")
  //     }
  //   } catch (error) { console.error(error) }
  // }

  let deleteUser = async (navigate) => {
    try {
      const request = await fetch(
        `${VITE_EXPRESS}/user/${user._id}`,
        {
          method: 'DELETE'
        }
      )

      const result = await request.json()

      if (!request.ok) {
        alert(result.message || 'No se ha podido eliminar el usuario')
        console.error('Error al eliminar:', result)
        return
      }

      // Limpiar la sesión
      setUser(null)
      localStorage.removeItem('usuario')

      alert('Usuario eliminado correctamente')
      navigate('/')

    } catch (err) {
      console.error('Error al eliminar:', err)
      alert('No se ha podido conectar con el servidor')
    }
  }

  let logoutUser = (navigate) => {
    setUser(null)
    localStorage.removeItem('usuario')

    navigate('/')
  }


  // VIDEOS
  // ADD VIDEO
  const addVideo = async (e, navigate) => {
    e.preventDefault()

    if (!user || !user._id) {
      alert('You must be logged in to upload a video')
      return
    }

    const { title, youtubeUrl, category, thumbnailImage } =
      formPostUpload.current

    const newVideo = {
      title: title.value.trim(),

      owner: user._id,
      channelName: user.fullName,
      channelImage: user.image || '/assets/profileImage_default.jpg',

      youtubeUrl: youtubeUrl.value.trim(),

      // Categoría principal + All
      category: ['All', category.value]
    }

    // Thumbnail opcional
    if (thumbnailImage.value.trim()) {
      newVideo.thumbnailImage = thumbnailImage.value.trim()
    }

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newVideo)
    }

    try {
      const request = await fetch(`${VITE_EXPRESS}/video`, options)
      const result = await request.json()

      if (!request.ok) {
        console.error('Error uploading video:', result)
        alert(result.message || 'Could not upload video')
        return
      }

      formPostUpload.current.reset()

      alert('Video uploaded successfully!')

      navigate('/your-videos')

    } catch (err) {
      console.error('Upload error:', err)
      alert('Could not connect to the server')
    }
  }

  // PATCH
  const patchVideo = async (e, video, navigate) => {
    e.preventDefault()

    const { title, youtubeUrl, category, thumbnailImage } =
      formEditVideo.current

    const updatedData = {
      title: title.value.trim(),
      youtubeUrl: youtubeUrl.value.trim(),
      category: ['All', category.value],
      thumbnailImage: thumbnailImage.value.trim()
    }

    try {
      const request = await fetch(
        `${VITE_EXPRESS}/video/${video._id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedData)
        }
      )

      const result = await request.json()

      if (!request.ok) {
        console.error('Error updating video:', result)
        alert(result.message || 'Could not update video')
        return
      }

      alert('Video updated successfully!')

      navigate('/your-videos')

    } catch (error) {
      console.error('PATCH video error:', error)
      alert('Could not connect to the server')
    }
  }

  // PUT

  const putVideo = async (e, video, navigate) => {
    e.preventDefault()

    const { title, youtubeUrl, category, thumbnailImage } =
      formEditVideo.current

    const fullData = {
      owner: video.owner,
      title: title.value.trim(),
      channelName: video.channelName,
      channelImage: video.channelImage,
      views: video.views ?? 0,
      publishDate: video.publishDate,
      youtubeUrl: youtubeUrl.value.trim(),
      likes: video.likes ?? 0,
      subscribers: video.subscribers ?? 0,
      category: ['All', category.value],
      thumbnailImage: thumbnailImage.value.trim()
    }

    try {
      const request = await fetch(
        `${VITE_EXPRESS}/video/${video._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(fullData)
        }
      )

      const result = await request.json()

      if (!request.ok) {
        console.error('Error replacing video:', result)
        alert(result.message || 'Could not replace video')
        return
      }

      alert('Video replaced successfully!')

      navigate('/your-videos')

    } catch (error) {
      console.error('PUT video error:', error)
      alert('Could not connect to the server')
    }
  }

  // DELETE

  const deleteVideo = async (video, navigate) => {

    const confirmDelete = window.confirm(
      'Are you sure you want to permanently delete this video?'
    )

    if (!confirmDelete) return

    try {
      const request = await fetch(
        `${VITE_EXPRESS}/video/${video._id}`,
        {
          method: 'DELETE'
        }
      )

      const result = await request.json()

      if (!request.ok) {
        console.error('Error deleting video:', result)
        alert(result.message || 'Could not delete video')
        return
      }

      alert('Video deleted successfully!')

      navigate('/your-videos')

    } catch (error) {
      console.error('DELETE video error:', error)
      alert('Could not connect to the server')
    }
  }

  return (
    <>
      <BrowserRouter>

        <UserContext.Provider value={{
          user, setUser, addUser, logUser,
          formPostRegister, formPostLogin, formEditProfile,
          patchUser, putUser, deleteUser, logoutUser,
          VITE_EXPRESS, toggleMenu, isOpen, setIsOpen,
          addVideo, formPostUpload, formEditVideo, patchVideo, putVideo, deleteVideo
        }}>
          <Wrapper />
        </UserContext.Provider>

      </BrowserRouter>

    </>
  )
}

export default App


const Wrapper = () => {

  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useContext(UserContext)

  useEffect(() => {
    const sessionLocal = JSON.parse(localStorage.getItem('usuario'))
    const isLoggedIn = sessionLocal?.login || user

    const publicRoutes = ['/', '/register']
    const isPublicRoute = publicRoutes.includes(location.pathname)

    if (isLoggedIn) {
      if (isPublicRoute) {
        navigate('/home')
      }
    } else {
      if (!isPublicRoute) {
        navigate('/')
      }
    }

  }, [user, location.pathname, navigate])

  return (
    <>
      <Routes>

        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/home' element={<Homepage />} />
        <Route path='/video/:_id' element={<VideoPage />} />
        <Route path='/library' element={<Library />} />
        <Route path='/your-videos' element={<YourVideos />} />
        <Route path='/edit-video/:_id' element={<EditVideo />} />
        <Route path='/liked' element={<Liked />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/upload' element={<Upload />} />
        <Route path='*' element={<Error404 />} />

      </Routes>
    </>
  )
}