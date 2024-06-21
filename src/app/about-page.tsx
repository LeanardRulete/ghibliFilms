import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Film } from "./film.interface";
import "./about-page.scss";

export function AboutPage() {
  const { filmId } = useParams<{ filmId: string }>();
  const navigate = useNavigate();
  const [filmDetails, setFilmDetails] = useState<Film | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get<Film>(`https://ghibliapi.vercel.app/films/${filmId}`)
      .then((response) => {
        setFilmDetails(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch film details");
        setLoading(false);
      });
  }, [filmId]);

  const handleBack = () => {
    navigate("/");
  };

  const handleOrder = () => {
    alert(`Order placed for ${filmDetails?.title}!`);
  };

  if (loading) {
    return <div className="about-page">Loading...</div>;
  }

  if (error) {
    return <div className="about-page">{error}</div>;
  }

  return (
    <div className="about-page">
      <div className="film-image">
        <img src={filmDetails?.image} alt={filmDetails?.title} />
      </div>
      <div className="film-details">
        <h1>{filmDetails?.title}</h1>
        <p><strong>Director:</strong> {filmDetails?.director}</p>
        <p><strong>Producer:</strong> {filmDetails?.producer}</p>
        <p><strong>Release Date:</strong> {filmDetails?.release_date}</p>
        <p><strong>Description:</strong></p>
        <p>{filmDetails?.description}</p>
        <div className="buttons">
          <button onClick={handleBack}>Go Back</button>
          <button onClick={handleOrder}>Order</button>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
