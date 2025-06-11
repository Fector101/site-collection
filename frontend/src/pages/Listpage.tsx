import { useEffect, useState } from "react"
import { useParams, useOutletContext } from "react-router"
import { IWatchList } from "../assets/js/myTypes";
import ImgwithPL from "../ui/images/ImgwithPL";
import { Clock } from "lucide-react";
import '../assets/css/listpage.css'
import MySelect from "../ui/myselect/MySelect";
import { mockWatchLists } from "../assets/js/mockup_data";

export default function Listpage({ text }: { text: string }) {
    const { list_name } = useParams()
    const obj = useOutletContext()
    console.log(obj, text)

    const [watchlist, setWatchList] = useState<IWatchList | undefined>()
    // const [current_filter, setCurrentFilter] = useState<string>("All Lists")
    // const [create_watch_list_modal_state, setCreateWatchListModalState] = useState<boolean>(false)

    useEffect(function () {
        setWatchList(mockWatchLists.find(each => each._id == list_name))
    }, [])


    useEffect(() => {
        // document.querySelector('header')?.classList.add('display-none')
    }, [])
    return (
        <div className="flex-page flex list-page fd-column">
            <main>
                <section className="info-section flex fd-column">
                    <div className="main-info flex">
                        <ImgwithPL src="1" alt='list-cover' />
                        <div className="text-container">
                            <h3>{watchlist?.title}</h3>
                            <p>{watchlist?.length} item{watchlist && watchlist.length > 1 ? 's' : ''}</p>
                            <p>Time Spent: {watchlist?.duration}</p>
                        </div>
                    </div>
                    <div className="other-info">
                        <div className="flex">
                            <Clock />
                            <p>Last Updated: </p>
                        </div>
                        <p className="desc">{watchlist?.desc}</p>
                        <div className="stats-cards flex">
                            <p>Seen: 62%</p>
                            <p>Rated: 32%</p>
                        </div>
                        <div className="action-btns">
                            <button>Edit</button>
                        </div>
                    </div>
                    <p className="list-id">#{list_name}</p>
                </section>
                <section className="items-section">
                    <div className="filters-container flex">
                        <button>Film</button>
                        <button>Shows</button>
                        <MySelect options={['all','<30mins','<1hr','<2hr','<3hr','<4hr','4hr+']}/>
                        {/* <MySelect options={['all','<30mins','<1hr','<2hr','<3hr','<4hr','custom']}/> */}
                        <div className="flags-container">
                            <button className="flag">No active Flag</button>
                        </div>
                    </div>
                </section>

            </main>
            <section className="related-list">
                <h4>Public Lists with similar Content</h4>
            </section>
        </div>
    )
}