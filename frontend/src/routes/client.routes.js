export const BASE_URL = "http://localhost:1337";

export const clientRoutes = {
  getTours: `${BASE_URL}/api/tours?populate=*`, // запрос туров
  sendOffer: `${BASE_URL}/api/offers/`, // оставить заявку
  getBanners: `${BASE_URL}/api/banners?populate=*`,
  getCountries: `${BASE_URL}/api/countries?populate=*`, 
  getCurrentTour: `${BASE_URL}/api/tours?filters[slug][$eq]=`// запрос конкретного тура
};
