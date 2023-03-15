export const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 10,
    slidesToScroll: 1,

    responsive: [
        {
            breakpoint: 1444,
            settings: {
                slidesToShow: 8,
                slidesToScroll: 1,
            },
        },
        {
            breakpoint: 1166,
            settings: {
                slidesToShow: 6,
                slidesToScroll: 3,
            },
        },
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 6,
                slidesToScroll: 3,
                infinite: true,
                // dots: true
            },
        },
        {
            breakpoint: 850,
            settings: {
                slidesToShow: 5,
                slidesToScroll: 3,
                infinite: true,
                // dots: true
            },
        },
        {
            breakpoint: 672,
            settings: {
                slidesToShow: 7,
                slidesToScroll: 3,
                // initialSlide: 2
                // infinite: true,
                initialSlide: 1,
            },
        },
        {
            breakpoint: 500,
            settings: {
                slidesToShow: 5,
                slidesToScroll: 3,
                //infinite: true
                initialSlide: 1,
            },
        },
    ],
}
