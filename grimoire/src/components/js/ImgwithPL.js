import { useState,useEffect } from "react";
import placeholder_img_default from "./../imgs/card-img-pl1.png"


export default function ImgwithPL({src, placeholder_src, alt}){
    const [is_loaded, setIsLoaded] = useState(0)
    placeholder_src= placeholder_src || placeholder_img_default
    useEffect(() => {
        const img = new Image()
        img.src = src
        img.onload = () => setIsLoaded(1)
      }, [src])

    return (
        <img
            src={is_loaded? src : placeholder_src}
            alt={alt}
            loading="lazy"
        />
    )
}