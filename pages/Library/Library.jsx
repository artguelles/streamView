import { Header } from '../../src/components/Header/Header'
import { SideBar } from '../../src/components/SideBar/SideBar'
import './Library.css'

export const Library = ()=>{

    return(
        <div className="Library">
            <Header />

            <div className="Container">
                <SideBar />

                <div className="Content">
                    Soy Library aquí verás el recopilarorio de history, liked y subscriptions
                </div>
            </div>
        </div>
    )
}