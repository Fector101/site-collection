import { useState,useEffect } from "react";

export default function ImgwithPL({src, placeholder_src, alt}){
    const [is_loaded, setIsLoaded] = useState(0)

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