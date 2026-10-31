import { Header } from '../../src/components/Header/Header'
import { SideBar } from '../../src/components/SideBar/SideBar'
import './Liked.css'

export const Liked = ()=>{

    return(
        <div className="Liked">
            <Header />

            <div className="Container">
                <SideBar />

                <div className="Content">
                    Soy Liked Videos para que se guarden los videos que les has dado me gusta
                </div>
            </div>
        </div>
    )
}