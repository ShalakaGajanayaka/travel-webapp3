import React from 'react'

const trips = [
    {
        id: 1,
        href: "javascript:void(0)",
        imageSrc: "https://www.intrepidtravel.com/v3/assets/blt0de87ff52d9c34a8/blte6b6c155077638d9/64eff2a2a9c2c320799c5530/CJPH_2024.gif?branch=prd&width=480&quality=75&format=pjpg&auto=webp",
        altText: "Mount Fuji with cherry blossoms in Japan",
        label: "9 Days · Premium",
        title: "Premium Highlights of Japan",
        oldPrice: "$5,550",
        newPrice: "$4,995",
    },
    {
        id: 2,
        href: "javascript:void(0)",
        imageSrc: "https://www.intrepidtravel.com/v3/assets/blt0de87ff52d9c34a8/blt73c89b1a6a2645be/67610ac1485851692641eb1e/gmda_2022-stylefix.gif?branch=prd&width=480&quality=75&format=pjpg&auto=webp",
        altText: "Scenic view of the Colosseum in Rome, Italy",
        label: "7 Days · Culinary",
        title: "Taste of Italy",
        oldPrice: "$3,200",
        newPrice: "$2,895",
    },
    {
        id: 3,
        href: "javascript:void(0)",
        imageSrc: "https://www.intrepidtravel.com/v3/assets/blt0de87ff52d9c34a8/bltf6145b948906e3ef/65fcb91459c51080d8dc958d/xmkc-2024.gif?branch=prd&width=480&quality=75&format=pjpg&auto=webp",
        altText: "Eiffel Tower in Paris, France at sunset",
        label: "5 Days · Romantic",
        title: "Parisian Romance",
        oldPrice: "$2,800",
        newPrice: "$2,495",
    },
    {
        id: 4,
        href: "javascript:void(0)",
        imageSrc: "https://www.intrepidtravel.com/v3/assets/blt0de87ff52d9c34a8/blta04d62f030bb56fc/66971a15201b8a34bf6dd1a6/GGTA_2025.gif?branch=prd&width=480&quality=75&format=pjpg&auto=webp",
        altText: "Great Wall of China during sunset",
        label: "10 Days · Adventure",
        title: "China Explorer",
        oldPrice: "$4,000",
        newPrice: "$3,750",
    },
    {
        id: 5,
        href: "javascript:void(0)",
        imageSrc: "https://www.intrepidtravel.com/v3/assets/blt0de87ff52d9c34a8/bltab593005e5033ff8/64f6e435c980d86cdaff53a5/zmrr_2020.gif?branch=prd&width=480&quality=75&format=pjpg&auto=webp",
        altText: "Santorini, Greece with white houses and blue domes",
        label: "6 Days · Luxury",
        title: "Santorini Getaway",
        oldPrice: "$3,500",
        newPrice: "$3,150",
    },
    {
        id: 6,
        href: "javascript:void(0)",
        imageSrc: "https://www.intrepidtravel.com/v3/assets/blt0de87ff52d9c34a8/bltabc034e1ef88e055/66a184fedd0c312a0d910002/uboo_2024.gif?branch=prd&width=480&quality=75&format=pjpg&auto=webp",
        altText: "Machu Picchu, Peru with misty mountains",
        label: "8 Days · Cultural",
        title: "Machu Picchu Adventure",
        oldPrice: "$4,500",
        newPrice: "$4,100",
    }
];


export default function Trips() {
    return (
        <div className="u-margin-bottom--4 u-margin-top--4 sm:u-margin-top--6" data-cy="home-trips" id='trips'>
            <h2 className="headline--2 u-margin-top--0">Our trips</h2>
            <div className="u-margin-bottom--4">
                <div className="carousel-static" aria-label="trip-carousel" data-cy="carousel-static">
                    <div className="carousel-static__container" data-cy="carousel-static-container">
                        <div className="carousel-static__content">
                            {trips.map((trip) => (
                                <div className="carousel-static__item" key={trip.id} data-cy="carousel-static-item">
                                    <div className="card" data-cy="trip-card">
                                        <a href={trip.href} className="card__content card__content--link">
                                            <div className="card__image" data-cy="card-image">
                                                <img
                                                    className="imagery imagery--fluid imagery--cover-center"
                                                    width="1100"
                                                    height="735"
                                                    alt={trip.altText}
                                                    loading="lazy"
                                                    src={trip.imageSrc}
                                                />
                                            </div>
                                            <div className="card__text">
                                                <div className="card__section card__section--label" data-cy="card-label">
                                                    {trip.label}
                                                </div>
                                                <div className="card__section card__section--heading" data-cy="card-heading">
                                                    <div className="headline--5 u-margin-top--0 u-margin-bottom--0">
                                                        {trip.title}
                                                    </div>
                                                </div>
                                                <div className="card__section card__section--content" data-cy="card-content">
                                                    <div className="product-card">
                                                        <div className="product-card__bottom">
                                                            <div className="product-card__prices" data-cy="product-card-prices">
                                                                From{" "}
                                                                <span className="product-card__label-sr">Was</span>
                                                                <div className="price product-card__was-price" data-cy="product-card-was-price">
                                                                    <span data-cy="price-currency-code">USD</span>
                                                                    <span data-cy="price-value">{trip.oldPrice}</span>
                                                                </div>
                                                                <span className="product-card__label-sr">Now</span>
                                                                <br />
                                                                <div className="price product-card__price" data-cy="product-card-price">
                                                                    <span data-cy="price-currency-code">USD</span>
                                                                    <span data-cy="price-value">{trip.newPrice}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
