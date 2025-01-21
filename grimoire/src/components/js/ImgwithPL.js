import { useState,useEffect } from "react";
import placeholder_img_default from "./../imgs/card-img-pl1.png"
import { renderToStaticMarkup } from 'react-dom/server';

export default function ImgwithPL({src, placeholder_src, alt,className, pl_type}){
    const [is_loaded, setIsLoaded] = useState(0)
    if (pl_type === 'svg'){
        const svgString = encodeURIComponent(renderToStaticMarkup(placeholder_src));
        placeholder_src = `data:image/svg+xml;charset=utf-8,${svgString}`;
    }
    placeholder_src= placeholder_src || placeholder_img_default
    useEffect(() => {
        const img = new Image()
        // img.src = src
        img.onload = () => setIsLoaded(1)
      }, [src])

    return (
        <img style={{backgroundColor: '#464545'}}
            className={className || ''}
            src={is_loaded? src : placeholder_src}
            alt={alt}
            loading="lazy"
        />
    )
}