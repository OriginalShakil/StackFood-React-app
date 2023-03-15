export const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 10,
    slidesToScroll: 1,
    responsive: [
        {
            breakpoint: 1450,
            settings: {
                slidesToShow: 8,
                slidesToScroll: 3,
                infinite: false,
            },
        },
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 6,
                slidesToScroll: 3,
                infinite: false,
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
            breakpoint: 790,
            settings: {
                slidesToShow: 4.5,
                slidesToScroll: 3,
                infinite: false,
            },
        },

        {
            breakpoint: 600,
            settings: {
                slidesToShow: 7,
                slidesToScroll: 2,
                initialSlide: 2,
            },
        },
        {
            breakpoint: 500,
            settings: {
                slidesToShow: 5,
                slidesToScroll: 1,
            },
        },
    ],
};
