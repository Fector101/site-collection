import { useSearchParams } from "react-router";
import { top_movies_data } from "../assets/js/api_data"
import { nanoid } from "nanoid";
import { genreType, getGenreName, randInt } from "../assets/js/helper";
import ImgwithPL from "../ui/images/ImgwithPL";
import GoToTop from "../assets/js/GoToTop";
import '../assets/css/moviepage.css'
import {
    // /PlayCircle,HeartCrack, Dot,
    User2, ArrowBigDown, ArrowBigUp, Clock, Calendar, Languages, Eye, PlusCircle, Heart, Play
} from "lucide-react";
import { BookmarkActionButton } from "../ui/buttons/buttons";
import rottenTomatoImg from '../assets/imgs/rotten_tomato.png'
import imdbSvg from '../assets/imgs/imdb.svg'
import logoPng from '../assets/imgs/logo.png'
import { useEffect, useState } from "react";
import { useMediaQuery } from "../assets/js/useMediaQuery";

function formatTime(secs: number) {

    const format = (arg: number) => arg.toString().padStart(2, '0')

    let time = ''
    const sec_num = parseInt('' + secs, 10)
    const hrs = Math.floor(sec_num / 3600)
    const mins = Math.floor((sec_num - (hrs * 3600)) / 60)
    const secs__ = sec_num - (hrs * 3600) - (mins * 60)
    if (hrs > 0) time += `${format(hrs)} ${hrs === 1 ? 'hr' : 'hrs'}`
    if (mins > 0) time += ` ${format(mins)} ${mins === 1 ? 'min' : 'mins'}`
    if (secs__ > 0) time += ` ${format(secs__)} ${secs__ === 1 ? 'sec' : 'secs'}`

    return time

}
interface IActionBtns {
    btns_data: {
        title: string;
        icon: React.ReactNode;
        func?: React.MouseEventHandler<HTMLButtonElement>;
        className?: string
    }[];
    className?: string
}

function ActionBtns({ btns_data, className }: IActionBtns) {
    return (
        <div className={"large-btns-box" + (className ? ' ' + className : '')}>
            {btns_data.map(({ title, icon, func, className }) => <button key={title} onClick={func} className={"outline-white" + (className ? ' ' + className : '')}> {icon} {title}</button>)}
        </div>
    )
}
function formatDate(date: string) {

    const dateObj = new Date(date);

    // Get the day, month, and year
    const month = dateObj.toLocaleString('default', { month: 'short' }); // Abbreviated month
    const year = dateObj.getFullYear();

    function getOrdinalSuffix(day: number) {
        if (day >= 11 && day <= 13) return 'th';
        switch (day % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    }
    let day: number | string = dateObj.getDate();
    day = String(day) + getOrdinalSuffix(day)

    return `${day} of ${month}, ${year}`;
}
function CastMember({ member_data }: { member_data: { name: string, character: string, img?: string } }) {
    return (
        <div className="cast-member">
            <ImgwithPL pl_type='svg' placeholder_src={<User2 style={{ color: '#bdbaba' }} />} src='' alt={member_data.name} />
            {/* <ImgwithPL pl_type='svg' placeholder_src={<User2 style={{ color: '#bdbaba' }} />} src={`https://cast/${member_data.img}`} alt={member_data.name} /> */}
            <p> {member_data.name || "Loerm ipm"} </p>
            <p> {member_data.character || "Joe"} </p>
        </div>
    )
}
interface IDetails {
    title?: string;
    original_title?: string;
    secs: number;
    original_language: string;
    release_date: string;
    className?: string;
}
// function Details({ title, original_title, secs, original_language, release_date, className }) {
function Details({ secs, original_language, release_date, className, original_title, title }: IDetails) {
    return (
        <div className="movie-details">
            <h3 className="truncate-2-lines movie-name"> {title} </h3>
            {original_title !== title ? <p className="margin-left-10px">{original_title}</p> : <></>}
            <ul className={"sub-details" + (className ? ' ' + className : '')}>

                <li className="inline-flex">
                    <Clock />
                    <p>{formatTime(secs)}</p>
                </li>
                <li className="lang inline-flex">
                    <Languages />
                    <p className=""> lang: {original_language} </p>
                </li>

                <li className="flex">
                    <Calendar />
                    <p className=""> Released: {formatDate(release_date)} </p>
                </li>
                {/* <p className="inline-block"> {vote_average} </p> */}
            </ul>
        </div>
    )
}

export default function MoviePage() {
    const [searchParams] = useSearchParams();
    const movie_id = searchParams.get('id');
    const movie_data = { ...top_movies_data.results.find(({ id }) => id === Number(movie_id)) } //{...object.value} clones main object value
    // movie_data ={}
    const is_medium_screen_size = useMediaQuery('(max-width:1040px')

    function takeVote(event: React.MouseEvent<HTMLButtonElement>) {
        event.stopPropagation()
        const target = (event.target as HTMLElement)
        const clicked_btn = target.closest('button')
        if (!clicked_btn) return

        const btn_box = target.closest('.rate-btns-case')
        const user_vote = [...clicked_btn.classList].filter(class_name => ['up', 'down'].includes(class_name))[0]

        if (user_vote === 'up') {
            btn_box?.querySelector('.vote-btn.down')?.classList.remove('clicked')
        } else if (user_vote === 'down') {
            btn_box?.querySelector('.vote-btn.up')?.classList.remove('clicked')
        }
        clicked_btn.classList.toggle('clicked')
    }
    const {
        // adult,
        backdrop_path,
        genre_ids,
        // id,
        // media_type,
        original_language,
        title,
        original_title,
        overview,
        popularity,
        // poster_path,
        release_date,
        // video,
        vote_average,
        vote_count,
    } = movie_data
    // delete movie_data.title
    const cast = [
        {
            "id": 6193,
            "name": "Leonardo DiCaprio",
            "character": "Dom Cobb",
            "profile_path": "/wo2hJpn04vbtmh0B9utCFdsQhxM.jpg"
        },
        {
            "id": 24045,
            "name": "Joseph Gordon-Levitt",
            "character": "Arthur",
            "profile_path": "/4U9G4YwTlIEbAymBaseltwUs4OF.jpg"
        },
        {
            "id": 2537,
            "name": "Elliot Page",
            "character": "Ariadne",
            "profile_path": "/gJcw8SgLqMQ2XQLvhtdmBz3F3Ma.jpg"
        },
        {
            "id": 2524,
            "name": "Tom Hardy",
            "character": "Eames",
            "profile_path": "/6S0dmVVZc1YCt8bEQcDQWEyQ5ga.jpg"
        },
        {
            "id": 3896,
            "name": "Ken Watanabe",
            "character": "Saito",
            "profile_path": "/d7UY8jRV3z6m97lF2sjJ04nOylP.jpg"
        },
        {
            "id": 3897,
            "name": "Cillian Murphy",
            "character": "Robert Fischer",
            "profile_path": "/nvTujOMoJuSsbI5G9l83dkfWtQ3.jpg"
        },
        {
            "id": 3897,
            "name": "Cillian Murphy",
            "character": "Robert Fischer",
            "profile_path": "/nvTujOMoJuSsbI5G9l83dkfWtQ3.jpg"
        },
        {
            "id": 3897,
            "name": "Cillian Murphy",
            "character": "Robert Fischer",
            "profile_path": "/nvTujOMoJuSsbI5G9l83dkfWtQ3.jpg"
        },
        {
            "id": 3897,
            "name": "Cillian Murphy",
            "character": "Robert Fischer",
            "profile_path": "/nvTujOMoJuSsbI5G9l83dkfWtQ3.jpg"
        }
    ]
    // cast = []
    const [cover_img, SetCoverImg] = useState<string>('linear-gradient(to top, rgb(0, 0, 0), rgba(0, 0, 0, 0.5), transparent)')
    useEffect(() => {
        const img = new Image()
        img.src = `https://image.tmdb.org/t/p/original${backdrop_path}`
        img.onload = () => SetCoverImg(`url(${img.src})`)
    }, [backdrop_path])
    const secs = randInt(3600, 7200)
    const action_btns_data = [{ title: 'Watched It', icon: <Eye /> }, { title: 'Add to List', icon: <PlusCircle />, className: 'watchlist-btn' }, { title: 'Favourites', icon: <Heart /> }]
    return (
        <div className="movie-page margin-auto flex-page">

            <section className="flex video-nd-details-box">
                <section className="flex-grow">
                    <section style={{ backgroundImage: cover_img }} className="movie-poster-case">
                        <button className="play-btn"> <Play /> </button>
                        <div className="content flex">
                            <BookmarkActionButton className='bookmark-btn' />
                            <ActionBtns className="large-screens-btns" btns_data={action_btns_data} />
                        </div>
                    </section>
                    <div className="genres-box flex"> {genre_ids?.map(genre_id => <p key={nanoid()} className={genre_id + '0'}>{getGenreName(String(genre_id) as genreType)}</p>)} </div>
                </section>

                <section className="flex fd-column movie-about-box">

                    <Details original_title={original_title || ''} title={title || ''} secs={secs} original_language={original_language || ''} release_date={release_date || ''} />

                    <ActionBtns className="medium-screens-btns flex-wrap" btns_data={action_btns_data} />

                    <section className="overview-box for-lager-screen">
                        <h4>Overview</h4>
                        <p>{overview}</p>
                    </section>

                </section>

            </section>
            {
                is_medium_screen_size &&
                <section className="overview-box for-medium-screen">
                    <h4>Overview</h4>
                    <p>{overview}</p>
                </section>
            }

            <section className="rating-box">
                <div className="header flex">
                    <h4>Ratings</h4>
                    <div className="flex margin-left-auto rate-btns-case">
                        <button onClick={takeVote} className="flex algin-items-cen vote-btn down"> <ArrowBigDown /> </button>
                        <button onClick={takeVote} className="flex algin-items-cen vote-btn up"> <ArrowBigUp /> </button>
                    </div>

                </div>
                <table>
                    <tbody>
                        <tr>
                            <td> Site </td>
                            <td> Rating </td>
                            <td> People</td>
                        </tr>
                        <tr>
                            <td>
                                <img src={imdbSvg} alt="IMDB" />
                                <p>IMDB</p>
                            </td>
                            <td>{vote_average}</td>
                            <td>10k</td>
                        </tr>
                        <tr>
                            <td>
                                <img src={rottenTomatoImg} alt="Rotten Tomato" />
                                <p>Rotten Tomato</p>
                            </td>
                            <td>{popularity}</td>
                            <td>11.1k</td>
                        </tr>
                        <tr>
                            <td>
                                <img src={logoPng} alt="Grimoire" />
                                <p>Grimoire</p>
                            </td>
                            <td>{vote_count}</td>
                            <td>1m</td>
                        </tr>

                        {/* <tr>   Download the logo and add it to the project
                            <td>
                              <img src={logoPng} alt="themoviedb"/>
                              <p>themoviedb</p>
                              </td>
                            <td>{vote_average}</td>
                            <td>{vote_count}</td>
                        </tr> */}
                    </tbody>

                </table>
            </section>
            <section>
                <h3>Cast</h3>
                <div className="cast-box">
                    {cast.map(each_member => <CastMember key={nanoid()} member_data={each_member} />)}
                </div>
            </section>

            <GoToTop />
        </div>
    )
}
// {/* {Object.entries(movie_data).map(each=><p key={nanoid()}>{each.join(': ')}</p>)} */}
