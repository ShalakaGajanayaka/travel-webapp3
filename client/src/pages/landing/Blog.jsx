import React from 'react';

export default function Blog() {
  const blogPosts = [
    {
      title: '25 totally new trips for 2025',
      date: '10 Dec 2024',
      imageUrl: 'https://www.intrepidtravel.com/adventures/wp-content/uploads/2023/11/Intrepid-Travel-Intrepid_Vietnam23_Ninh-BInh-walking-group-leader_agp_0896.jpg',
      link: 'javascript:void(0)'
    },
    {
      title: 'Another Blog Post Title',
      date: '12 Dec 2024',
      imageUrl: 'https://www.intrepidtravel.com/adventures/wp-content/uploads/2025/01/Intrepid-Travel-Peru-Aguas-Calientes-Machu-Picchu-lookout-group-perspective-569019.jpg',
      link: 'javascript:void(0)'
    },
  ];

  return (
    <div>
      <div className="l-container u-margin-top--4 sm:u-margin-top--6" data-cy="home-blogs">
        <h2>Get inspired on The Good Times</h2>
        <div className="carousel-static" aria-label="Get inspired on The Good Times" data-cy="static-carousel">
          <div className="carousel-static__container" data-cy="carousel-static-container">
            <div className="carousel-static__content">
              {blogPosts.map((post, index) => (
                <div key={index} className="carousel-static__item" data-cy="carousel-static-item">
                  <div className="card blog-card" data-cy="blog-card">
                    <a href={post.link} className="card__content card__content--link">
                      <div className="card__image" data-cy="card-image">
                        <img
                          className="imagery imagery--fluid imagery--cover-center"
                          width="425"
                          height="239"
                          alt={post.title}
                          loading="lazy"
                          src={post.imageUrl}
                          sizes="238px"
                        />
                      </div>
                      <div className="card__text">
                        <div className="card__section card__section--content" data-cy="card-content">
                          <p className="blog-card__title">
                            <strong>{post.title}</strong>
                          </p>
                          <small className="u-color--grey-dark u-text-transform--uppercase">{post.date}</small>
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
  );
}
