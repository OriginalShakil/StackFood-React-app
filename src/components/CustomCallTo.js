import React from "react"
import Link from "next/link"

const CustomCallTo=({phone,children})=>{
    return <Link href={`tel:${phone}`}>{children}</Link>

}
export default CustomCallTo