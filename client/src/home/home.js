import React from 'react';
import { Link } from 'react-router-dom';
import home from './img/home.png';
import about from './img/about.jpg';
import plate1 from './img/plate1.png';
import plate2 from './img/plate2.png';
import plate3 from './img/plate3.png';
import './home.css';

const Header = () => {
  return (
    <div>
      <header className="l-header" id="header">
        <nav className="nav bd-container">
          <a href="#home" className="nav__logo">
            Tasty
          </a>

          <div className="nav__menu" id="nav-menu">
            <ul className="nav__list">
              <li className="nav__item">
                <a href="/login" className="nav__link active-link">
                  Login
                </a>
              </li>
              <li className="nav__item">
                <a href="#about" className="nav__link">
                  About
                </a>
              </li>
              <li className="nav__item">
                <a href="#services" className="nav__link">
                  Services
                </a>
              </li>
              <li className="nav__item">
                <a href="#menu" className="nav__link">
                  Menu
                </a>
              </li>
              <li className="nav__item">
                <a href="#contact" className="nav__link">
                  Contact us
                </a>
              </li>
              <li>
                <i className="bx bx-moon change-theme" id="theme-button"></i>
              </li>
            </ul>
          </div>

          <div className="nav__toggle" id="nav-toggle">
            <i className="bx bx-menu"></i>
          </div>
        </nav>
      </header>
    </div>
  );
};

const Kata = () => {
  return (
    <section className="home" id="home">
      <div className="home__container bd-container bd-grid">
        <div className="home__data">
          <h1 className="home__title">Tasty food</h1>
          <h2 className="home__subtitle">
            Try the best food of <br />
            the week.
          </h2>
          <a href="/beranda" className="button">
            View Menu
          </a>
        </div>

        <img src={home} alt="" className="home__img" />
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section className="about section bd-container" id="about">
      <div className="about__container bd-grid">
        <div className="about__data">
          <span className="section-subtitle about__initial">About us</span>
          <h2 className="section-title about__initial">
            We cook the best <br />
            tasty food
          </h2>
          <p className="about__description">We cook the best food in the entire city, with excellent customer service, the best meals and at the best price, visit us.</p>
          <a href="home" className="button">
            Explore history
          </a>
        </div>

        <img src={about} alt="" className="about__img" />
      </div>
    </section>
  );
};

const Services = () => {
  return (
    <section className="services section bd-container" id="services">
      <span className="section-subtitle">Offering</span>
      <h2 className="section-title">Our amazing services</h2>

      <div className="services__container bd-grid">
        <div className="services__content">
          <svg className="services__img"></svg>
          <h3 className="services__title">Excellent food</h3>
          <p className="services__description">We offer our clients excellent quality services for many years, with the best and delicious food in the city.</p>
        </div>

        <div className="services__content">
          <svg className="services__img">
            <defs>
              <clipPath id="clip0">
                <rect width="64" height="64" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <h3 className="services__title">Fast food</h3>
          <p className="services__description">We offer our clients excellent quality services for many years, with the best and delicious food in the city.</p>
        </div>

        <div className="services__content">
          <svg className="services__img">
            <defs>
              <clipPath id="clip0">
                <rect width="64" height="64" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <h3 className="services__title">Delivery</h3>
          <p className="services__description">We offer our clients excellent quality services for many years, with the best and delicious food in the city.</p>
        </div>
      </div>
    </section>
  );
};

const Menu = () => {
  return (
    <section className="menu section bd-container" id="menu">
      <span className="section-subtitle">Special</span>
      <h2 className="section-title">Menu of the week</h2>

      <div className="menu__container bd-grid">
        <div className="menu__content">
          <img src={plate1} alt="" className="menu__img" />
          <h3 className="menu__name">Barbecue salad</h3>
          <span className="menu__detail">Delicious dish</span>
          <span className="menu__preci">$22.00</span>
          <a href="home" className="button menu__button">
            <i className="bx bx-cart-alt"></i>
          </a>
        </div>

        <div className="menu__content">
          <img src={plate2} alt="" className="menu__img" />
          <h3 className="menu__name">Salad with fish</h3>
          <span className="menu__detail">Delicious dish</span>
          <span className="menu__preci">$12.00</span>
          <a href="home" className="button menu__button">
            <i className="bx bx-cart-alt"></i>
          </a>
        </div>

        <div className="menu__content">
          <img src={plate3} alt="" className="menu__img" />
          <h3 className="menu__name">Spinach salad</h3>
          <span className="menu__detail">Delicious dish</span>
          <span className="menu__preci">$9.50</span>
          <a href="home" className="button menu__button">
            <i className="bx bx-cart-alt"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section className="contact section bd-container" id="contact">
      <div className="contact__container bd-grid">
        <div className="contact__data">
          <span className="section-subtitle contact__initial">Let's talk</span>
          <h2 className="section-title contact__initial">Contact us</h2>
          <p className="contact__description">If you want to reserve a table in our restaurant, contact us and we will attend you quickly, with our 24/7 chat service.</p>
        </div>

        <div className="contact__button">
          <Link to="/login" className="button">
            Try now
          </Link>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="footer section bd-container">
      <div className="footer__container bd-grid">
        <div className="footer__content">
          <a href="home" className="footer__logo">
            Tasty Food
          </a>
          <span className="footer__description">Restaurant</span>
          <div>
            <a href="#home" className="footer__social">
              <i className="bx bxl-facebook"></i>
            </a>
            <a href="#home" className="footer__social">
              <i className="bx bxl-instagram"></i>
            </a>
            <a href="#home" className="footer__social">
              <i className="bx bxl-twitter"></i>
            </a>
          </div>
        </div>

        <div className="footer__content">
          <h3 className="footer__title">Services</h3>
          <ul>
            <li>
              <a href="#home" className="footer__link">
                Delivery
              </a>
            </li>
            <li>
              <a href="#home" className="footer__link">
                Pricing
              </a>
            </li>
            <li>
              <a href="#home" className="footer__link">
                Fast food
              </a>
            </li>
            <li>
              <a href="#home" className="footer__link">
                Reserve your spot
              </a>
            </li>
          </ul>
        </div>

        <div className="footer__content">
          <h3 className="footer__title">Information</h3>
          <ul>
            <li>
              <a href="#home" className="footer__link">
                Event
              </a>
            </li>
            <li>
              <a href="#home" className="footer__link">
                Contact us
              </a>
            </li>
            <li>
              <a href="#home" className="footer__link">
                Privacy policy
              </a>
            </li>
            <li>
              <a href="#home" className="footer__link">
                Terms of services
              </a>
            </li>
          </ul>
        </div>

        <div className="footer__content">
          <h3 className="footer__title">Address</h3>
          <ul>
            <li>Pekanbaru - Riau</li>
            <li>Jl.Delima</li>
            <li>0895-1304-5236</li>
            <li>fauzansalim16@gmail.com</li>
          </ul>
        </div>
      </div>

      <p className="footer__copy">&#169;All right reserved</p>
    </footer>
  );
};

const MainContent = () => {
  return (
    <main>
      <Header />
      <Kata />
      <About />
      <Services />
      <Menu />
      <Contact />
      <Footer />
    </main>
  );
};

export default MainContent;
