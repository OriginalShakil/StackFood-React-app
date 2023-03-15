import React, {useEffect, useState} from "react"
import {CustomImageContainerStyled} from "../styled-components/CustomStyles.style";
import placeholder from "../../public/static/no-image-found.png"

const CustomImageContainer=({cursor,mdHeight,maxWidth,height,width,objectFit,minwidth,src,alt,borderRadius,marginBottom,smHeight,smMb,smMaxWidth,smWidth})=>{

    const [imageFile, setState]= useState(null)
    useEffect(()=>{
        setState(src)
    },[src])

    return(
        <CustomImageContainerStyled height={height} width={width} objectFit={objectFit} minwidth={minwidth} borderRadu={borderRadius} marginBottom={marginBottom} smHeight={smHeight}
                                    smMb={smMb} maxWidth={maxWidth} smMaxWidth={smMaxWidth} smWidth={smWidth}
                                    mdHeight={mdHeight}
                                    cursor={cursor}
        >
            <img src={imageFile} alt={alt} onError={() => {
                // currentTarget.onerror = null; // prevents looping
                setState(placeholder.src)
            }} loading="lazy"  />
        </CustomImageContainerStyled>
    )

}
export default CustomImageContainer