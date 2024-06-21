import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Film } from "./film.interface";
import "./home-page.scss";

export function HomePage() {
  const [films, setFilms] = useState<Film[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get<Film[]>("https://ghibliapi.vercel.app/films")
      .then((response) => setFilms(response.data))
      .catch((error) => console.error("Error fetching films:", error));
  }, []);

  const handleNavigate = (filmId: string) => {
    navigate(`/${filmId}`);
  };

  const handleOrder = (title: string) => {
    alert(`Order placed for ${title}!`);
  };

  return (
    <div className="home-page">
      <div className="film-grid">
        {films.map((film) => (
          <div key={film.id} className="film-item">
            <img src={film.image} alt={film.title} onClick={() => handleNavigate(film.id)} />
            <div className="film-details">
              <p className="film-title">{film.title}</p>
              <p className="price">$19.99</p>
              <button onClick={() => handleOrder(film.title)}>Order</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
