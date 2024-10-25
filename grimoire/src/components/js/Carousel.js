import './../css/carousel.css'
import img1 from './../imgs/img.png'
export default function Carousel(){
    const trending = [
        {description: `Follow Uhtred of Bebbanburg's quest for revenge and redemption in this epic historical drama based on Bernard Cornwell's novels.`, id: 1, title: 'The Last Detective', rating: 4.8, image_url: '/api/placeholder/200/300', type: 'TV Series' },
        // {description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias odit suscipit odio ad ab eveniet illum? Ab aliquam a nam at doloribus, et, deserunt vitae veritatis esse sint magnam? Nisi!', id: 2, title: 'Space Warriors', rating: 4.6, image_url: '/api/placeholder/200/300', type: 'Movie' },
        // {description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias odit suscipit odio ad ab eveniet illum? Ab aliquam a nam at doloribus, et, deserunt vitae veritatis esse sint magnam? Nisi!', id: 3, title: 'City Lights', rating: 4.9, image_url: '/api/placeholder/200/300', type: 'Movie' },
        // {description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias odit suscipit odio ad ab eveniet illum? Ab aliquam a nam at doloribus, et, deserunt vitae veritatis esse sint magnam? Nisi!',      id: 4, title: 'The Dark Path', rating: 4.7, image_url: '/api/placeholder/200/300', type: 'TV Series' }
    ]
    return (
        trending.map(({description, title, rating, image_url}) =>
            {   return (
                <div className="carousel-case" style={{backgroundImage: `url(${img1})`}}>
                    <div className='carousel-content-case'>
                        <p className="title">{title}</p>
                        <p className="description">{description}</p>
                        <div className="rating-box">
                            <p className="rating">{rating}</p>
                        </div>
                    </div>
                </div>)
            })
    )

}