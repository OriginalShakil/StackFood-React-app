export const settings = {
    speed: 500,
    slidesToShow: 5.5,
    slidesToScroll: 3,
    initialSlide: 0,
    infinite: true,

    responsive: [
        {
            breakpoint: 1600,
            settings: {
                slidesToShow: 5.5,
                slidesToScroll: 5,

                initialSlide: 0,
                // dots: true
            },
        },
        {
            breakpoint: 1340,
            settings: {
                slidesToShow: 5,
                slidesToScroll: 5,

                initialSlide: 0,
                // dots: true
            },
        },
        {
            breakpoint: 1075,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
                initialSlide: 0,
                // dots: true
            },
        },
        {
            breakpoint: 999,
            settings: {
                slidesToShow: 3.5,
                slidesToScroll: 3,

                // dots: true
                initialSlide: 0,
            },
        },
        {
            breakpoint: 800,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                // initialSlide: 2

                initialSlide: 0,
            },
        },
        {
            breakpoint: 540,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,

                initialSlide: 0,
            },
        },
        {
            breakpoint: 400,
            settings: {
                slidesToShow: 2.5,
                slidesToScroll: 2,

                // dots: true
                initialSlide: 0,
            },
        },
    ],
}
