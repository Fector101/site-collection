import { useState, useEffect } from "react";
import placeholder_img_default from "../../assets/imgs/card-img-pl1.png"
import { renderToStaticMarkup } from 'react-dom/server';

interface ImgwithPL {
    src: string;
    placeholder_src?: string | React.ReactNode;
    alt: string;
    className?: string;
    pl_type?: 'svg' | 'path';
}

export default function ImgwithPL({ src, placeholder_src, alt, className, pl_type }: ImgwithPL) {
    const [is_loaded, setIsLoaded] = useState(false)

    if (pl_type === 'svg' && placeholder_src && typeof placeholder_src !== 'string') {
        const svgString = encodeURIComponent(renderToStaticMarkup(placeholder_src));
        placeholder_src = `data:image/svg+xml;charset=utf-8,${svgString}`;
    }
    placeholder_src = typeof placeholder_src === 'string' ? placeholder_src : placeholder_img_default;
    useEffect(() => {
        if (src){
            const img = new Image()
            img.src = src
            console.log(img.src =='https://image.tmdb.org/t/p/original/2K2iXKB5sDJ0V3Q6U6VBmuzCPXl.jpg')
            img.onload = () => setIsLoaded(true)
        }
    }, [src])

    return (
        <img style={{ backgroundColor: '#464545' }}
            className={className || ''}
            src={is_loaded ? src : (placeholder_src as string)}
            alt={alt}
            loading="lazy"
        />
    )
}