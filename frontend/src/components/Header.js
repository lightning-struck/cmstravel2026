import React, { useEffect, useState, useRef } from "react";
import "./Header.css";
import cn from "classnames";
import { useNavigate } from "react-router-dom";
import logo from "../components/ChinaLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faSun,
  faMoon,
  faDollarSign,
  faEuroSign,
  faYenSign,
  faChevronDown,
  faMobile,
} from "@fortawesome/free-solid-svg-icons";
import { Container } from "./shared/container/container";
import { Button } from "./shared/button/button";

const Header = () => {
  const navigate = useNavigate();
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(null);
  const [weather, setWeather] = useState(null);
  const [currencyRates, setCurrencyRates] = useState({
    usd: null,
    eur: null,
    cny: null,
  });
  const [currentTime, setCurrentTime] = useState(new Date());
  const [theme, setTheme] = useState("light");
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/vladivostok?unitGroup=metric&key=F5YYH7ZXKABDPPB4GJE9RRN4M&contentType=json`,
        );
        if (!response.ok) throw new Error("Weather fetch error");
        const data = await response.json();
        setWeather({
          main: { temp: data.currentConditions.temp },
          name: data.address,
        });
      } catch (error) {
        console.error(error);
      }
    };

    const fetchCurrencyRates = async () => {
      try {
        const response = await fetch(
          `https://v6.exchangerate-api.com/v6/cb4fd87d1892bc7322eb5dff/latest/RUB`,
        );
        if (!response.ok) throw new Error("Currency fetch error");
        const data = await response.json();
        setCurrencyRates({
          usd: 1 / data.conversion_rates.USD,
          eur: 1 / data.conversion_rates.EUR,
          cny: 1 / data.conversion_rates.CNY,
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchWeather();
    fetchCurrencyRates();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setDropdownVisible(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = (menu) => {
    if (dropdownVisible === menu) {
      setDropdownVisible(null);
    } else {
      setDropdownVisible(menu);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    console.log(`Searching for: ${searchQuery}`);
    setSearchVisible(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogoClick = () => {
    navigate("/");
  };

  // Обработчик для кнопки "Оставить заявку" (скролл к форме)
  const handleBookingClick = () => {
    const bookingSection = document.getElementById("booking");
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header className={`header-container ${isScrolled ? "header_scrolling" : ""}`}>
        <Container>
          <div className="header-content">
            <div className="header-actions">
              <img
                src={"logo.svg"}
                alt="Logo"
                className="logo"
                onClick={handleLogoClick}
              />
              <nav className="nav-menu" ref={menuRef}>
                <ul>
                  <li>
                    <a
                      onClick={() => toggleDropdown("news")}
                      href="#"
                      className={cn(
                        "link_toggle",
                        dropdownVisible === "news" ? "active" : "",
                      )}
                    >
                      Туры{" "}
                      <span className="nav_arrow">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="m19 9l-7 6l-7-6"
                          ></path>
                        </svg>
                      </span>
                    </a>
                    <div
                      className={`dropdown-menu ${dropdownVisible === "news" ? "visible" : ""}`}
                      ref={dropdownRef}
                    >
                      <ul>
                        <li>
                          <a href="#">Пекин</a>
                        </li>
                        <li>
                          <a href="#">Шанхай</a>
                        </li>
                        <li>
                          <a href="#">Гонконг</a>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <a
                      onClick={() => toggleDropdown("services")}
                      href="#"
                      className={cn(
                        "link_toggle",
                        dropdownVisible === "services" ? "active" : "",
                      )}
                    >
                      Услуги{" "}
                      <span className="nav_arrow">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="m19 9l-7 6l-7-6"
                          ></path>
                        </svg>
                      </span>
                    </a>
                    <div
                      className={`dropdown-menu ${dropdownVisible === "services" ? "visible" : ""}`}
                      ref={dropdownRef}
                    >
                      <ul>
                        <li>
                          <a href="#">Организация трансфера</a>
                        </li>
                        <li>
                          <a href="#">Экскурсии</a>
                        </li>
                      </ul>
                    </div>
                  </li>
                  {/* НОВЫЙ ПУНКТ МЕНЮ "ИНФОРМАЦИЯ" */}
                  <li>
                    <a
                      onClick={() => toggleDropdown("info")}
                      href="#"
                      className={cn(
                        "link_toggle",
                        dropdownVisible === "info" ? "active" : "",
                      )}
                    >
                      Информация{" "}
                      <span className="nav_arrow">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="m19 9l-7 6l-7-6"
                          ></path>
                        </svg>
                      </span>
                    </a>
                    <div
                      className={`dropdown-menu ${dropdownVisible === "info" ? "visible" : ""}`}
                      ref={dropdownRef}
                    >
                      <ul>
                        <li>
                          <a href="/faq">❓ Вопросы и ответы</a>
                        </li>
                        <li>
                          <a href="/privacy">🔒 Политика конфиденциальности</a>
                        </li>
                        <li>
                          <a href="/offer">📄 Договор оферты</a>
                        </li>
                        <li>
                          <a href="/insurance">🛡️ Страховка туристов</a>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <a href="/gallery">Галерея</a>
                  </li>
                  <li>
                    <a href="#">Отзывы</a>
                  </li>
                  <li>
                    <a href="#">Блог</a>
                  </li>
                  <li>
                    <a href="#">Контакты</a>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="info-container right-section">
              <button className="button_contacts">
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M16 1H8C6.34 1 5 2.34 5 4v16c0 1.66 1.34 3 3 3h8c1.66 0 3-1.34 3-3V4c0-1.66-1.34-3-3-3m-2 20h-4v-1h4zm3.25-3H6.75V4h10.5z"
                  ></path>
                </svg>
              </button>
              <Button className={"button_call"} onClick={handleBookingClick}>
                Оставить заявку
              </Button>
            </div>
          </div>
        </Container>
      </header>
    </>
  );
};

export default Header;