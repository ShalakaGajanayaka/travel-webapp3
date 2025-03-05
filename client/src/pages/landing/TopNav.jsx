import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/intrepid-logo.svg';
import logoSmall from '../../assets/images/intrepid-logo-small.svg';

export default function TopNav() {
  const navigate = useNavigate();

  return (
    <>
      <header>
        <div className="header">
          <div data-cy="header-bar">
            <div id="header-bar" className="header-bar">
              <div className="header-bar__top">
                <div className="header-bar__container">
                  <a className="header-bar__top-logo">
                    <img
                      src={logoSmall}
                      height="56"
                      width="100"
                      alt="Home"
                      className="header-bar__top-logo-small"
                    />
                  </a>
                  <div className="header-bar__utilities">
                    <div
                      className="header-bar-mobile-drop-down-utility"
                      data-cy="header-bar-mobile-drop-down-utility"
                    >
                      <button
                        aria-label="magnify"
                        className="header-bar-mobile-drop-down-utility__icon-button"
                        data-cy="header-bar-mobile-drop-down-utility__icon-button"
                      >
                        <svg
                          version="1.1"
                          className="icon"
                          role="presentation"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                        >
                          <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"></path>
                        </svg>
                      </button>
                    </div>
                    <a
                      className="header-bar-utility u-hidden-xs"
                      aria-label="My Wishlist"
                      data-cy="header-bar-utility__wishlist"
                    >
                      <div className="header-bar-utility__icon">
                        <svg
                          version="1.1"
                          className="icon"
                          role="presentation"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12.1,18.55L12,18.65L11.89,18.55C7.14,14.24 4,11.39 4,8.5C4,6.5 5.5,5 7.5,5C9.04,5 10.54,6 11.07,7.36H12.93C13.46,6 14.96,5 16.5,5C18.5,5 20,6.5 20,8.5C20,11.39 16.86,14.24 12.1,18.55M16.5,3C14.76,3 13.09,3.81 12,5.08C10.91,3.81 9.24,3 7.5,3C4.42,3 2,5.41 2,8.5C2,12.27 5.4,15.36 10.55,20.03L12,21.35L13.45,20.03C18.6,15.36 22,12.27 22,8.5C22,5.41 19.58,3 16.5,3Z"></path>
                        </svg>
                      </div>
                      <div className="header-bar-utility__title" data-cy="title">
                        My Wishlist <span></span>
                      </div>
                    </a>
                    <a
                      className="header-bar-utility u-hidden-xs"
                      aria-label="My Booking"
                      data-cy="header-bar-utility"
                      rel="nofollow"
                    >
                      <div className="header-bar-utility__icon">
                        <svg
                          version="1.1"
                          className="icon"
                          role="presentation"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                        >
                          <path d="M17.6,14.5c-0.7-0.6-1.5-1.1-2.6-1.4c-0.9,0.6-1.9,0.9-3,0.9c-1.2,0-2.2-0.3-3.1-0.9c-1,0.3-1.8,0.8-2.5,1.5C4.1,16.6,4,20,4,20h16C20,20,19.9,16.6,17.6,14.5z M12,4c2.4,0,4.3,1.9,4.3,4.3s-1.9,4.3-4.3,4.3s-4.3-1.9-4.3-4.3S9.6,4,12,4z"></path>
                        </svg>
                      </div>
                      <div className="header-bar-utility__title" data-cy="title">
                        My Booking <span></span>
                      </div>
                    </a>

                    {/* <a
                      className="header-bar-utility u-hidden-xs"
                      aria-label="My Booking"
                      data-cy="header-bar-utility"
                      rel="nofollow"
                    >
                      <div className="header-bar-utility__icon">
                        <svg
                          version="1.1"
                          className="icon"
                          role="presentation"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                        >
                          <path d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5C20.55,15.5 21,15.95 21,16.5V20C21,20.55 20.55,21 20,21C10.61,21 3,13.39 3,4C3,3.45 3.45,3 4,3H7.5C8.05,3 8.5,3.45 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z"></path>
                        </svg>
                      </div>
                      <div className="header-bar-utility__title" data-cy="title">
                        fdf <span></span>
                      </div>
                    </a> */}

                    <button
                      aria-label="menu"
                      className="header-bar__toggle-menu"
                      data-cy="header-bar-menu-toggle"
                      style={{
                        backgroundColor: "#ff0000",
                        fontSize: "15px",
                        padding: "5px",
                        marginRight: "15px",
                        borderRadius: "3px",
                        fontWeight: "normal",
                        color: "white",
                        marginBottom: "15px",
                        hoverBackgroundColor: "#c80000"

                      }}
                      onClick={() => { navigate('/login') }}
                    >
                      Login
                    </button>
                  </div>
                </div>
              </div>
              <div className="header-bar__bottom u-display--none md:u-display--block">
                <div className="header-bar__container header-bar__container--flex">
                  <nav
                    className="header-bar__bottom-left"
                    role="navigation"
                    aria-label="Navigation"
                  >
                    <ul
                      className="header-bar__navigation"
                      role="menubar"
                      aria-label="Menu"
                    >
                      <li className="header-bar__navigation-item" role="menuitem">
                        <a
                          className="header-bar__bottom-home-link"
                          data-cy="header-bar-menu-item"
                        >
                          <img
                            src={logo}
                            height="80"
                            width="166"
                            alt="Home"
                            className="header-bar__bottom-logo-large"
                          />
                        </a>
                      </li>
                      <li className="header-bar__navigation-item" role="menuitem">
                        <a
                          className="header-bar__navigation-link"
                          id="header-bar__navigation-link-1"
                          data-cy="header-bar-menu-item"
                          href='#trips'
                        >
                          Destinations
                        </a>
                      </li>
                      <li className="header-bar__navigation-item" role="menuitem">
                        <a
                          className="header-bar__navigation-link"
                          id="header-bar__navigation-link-2"
                          data-cy="header-bar-menu-item"
                          href='#waystotravel'
                        >
                          Ways to travel
                        </a>
                      </li>
                      <li className="header-bar__navigation-item" role="menuitem">
                        <a
                          className="header-bar__navigation-link"
                          id="header-bar__navigation-link-3"
                          data-cy="header-bar-menu-item"
                          href='#deals'
                        >
                          Deals
                        </a>
                      </li>
                      <li className="header-bar__navigation-item" role="menuitem">
                        <a
                          className="header-bar__navigation-link"
                          id="header-bar__navigation-link-4"
                          data-cy="header-bar-menu-item"
                          href='#introduction'
                        >
                          About
                        </a>
                      </li>
                    </ul>
                    <div>
                      <span></span>
                    </div>
                  </nav>
                  <div
                    className="header-bar__bottom-right"
                    data-cy="header-bar__bottom-right"
                  >
                    <div className="header-bar__bottom-right" data-cy="header-bar__bottom-right">
                      <div className="find-trip find-trip--compact" data-cy="find-trip--compact">
                        <button
                          onClick={() => { navigate('/login') }} router-link="false" className="button find-trip__button button--special" data-cy="autocomplete-button" aria-label="search">
                          Login
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="drawer drawer--right" data-cy="header-bar-drawer">
                <div
                  className="drawer__panel"
                  style={{}}
                  tabIndex="-1"
                  data-cy="drawer-panel"
                >
                  <span></span>
                </div>
              </div>
            </div>
            <div className="header-bar-offset"></div>
          </div>
        </div>
      </header>
    </>
  );
}
