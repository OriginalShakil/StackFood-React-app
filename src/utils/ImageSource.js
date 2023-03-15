import { useSelector } from 'react-redux'

export const ImageSource = (imageFor, imageUrl) => {
    let imageSource = `${imageFor}/${imageUrl}`
    return imageSource
    // const { global } = useSelector((state) => state.globalSettings)
    // if (imageFor === 'product') {
    //     let baseUrl = global.base_urls.product_image_url
    //     let imageSource = `${baseUrl}/${imageUrl}`
    //     return imageSource
    // }
    //
    // let imageSource
    // if (imageUrl) {
    //     imageSource = `${imageUrl.image_base_url}/${imageFor}/${imageName}`
    // }
}
