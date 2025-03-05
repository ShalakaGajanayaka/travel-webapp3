import React from 'react'

export default function () {
    return (
        <div>
            <div data-cy="home-banner">
                <div
                    className="banner banner--xs-8-11 banner--sm-4-3 banner--md-7-3 banner--lg-7-3 banner--xl-7-3"
                    data-cy="banner"
                >
                    <div className="banner__content" data-cy="banner__content">
                        <div className="banner__content-image" data-cy="banner__content-image">
                            <img
                                src="https://www.intrepidtravel.com/v3/assets/blt0de87ff52d9c34a8/blt108429f27a1d5136/66d5498f103eb51389c4c65a/INT_homepage_1920x1285_OI-GLOBAL_02.jpg?branch=prd&width=1400&quality=75&format=pjpg&auto=webp"
                                srcSet="https://www.intrepidtravel.com/v3/assets/blt0de87ff52d9c34a8/blt108429f27a1d5136/66d5498f103eb51389c4c65a/INT_homepage_1920x1285_OI-GLOBAL_02.jpg?branch=prd&width=1400&quality=75&format=pjpg&auto=webp"
                                style={{ backgroundColor: "#E9E9E9" }}
                                className="imagery imagery--fluid imagery--cover-right"
                                alt=""
                                loading="eager"
                            />
                        </div>
                        <div className="l-container u-height--full">
                            <div className="home-banner">
                                <div className="home-banner__content">
                                    <span className="u-text-decoration--none">
                                        <h1 className="home-banner__title" data-cy="home-banner-title">
                                            Only Intrepid
                                        </h1>
                                    </span>
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
