// src/components/layout/Footer.jsx
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-dark text-light mt-5 pt-4 pb-3">
      <div className="container">
        <div className="row">

          {/* Section À propos */}
          <div className="col-md-4 mb-3">
            <h5>My E-Commerce</h5>
            <p>
              Boutique en ligne dédiée aux produits tendance et de qualité.
              Livraison rapide et service client à votre écoute.
            </p>
          </div>

          {/* Section Liens utiles */}
          <div className="col-md-4 mb-3">
            <h5>Liens utiles</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="text-light text-decoration-none">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-light text-decoration-none">
                  Se connecter
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-light text-decoration-none">
                  S'inscrire
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-light text-decoration-none">
                  Mon profil
                </Link>
              </li>
            </ul>
          </div>

          {/* Section Contact */}
          <div className="col-md-4 mb-3">
            <h5>Contact</h5>
            <p>Email: support@myecommerce.com</p>
            <p>Téléphone: +33 1 23 45 67 89</p>
            <p>Adresse: 10 Rue du trone , Bruxelles, Belgique </p>
          </div>
        </div>

        <div className="text-center mt-3 border-top pt-3">
          &copy; {new Date().getFullYear()} My E-Commerce. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
