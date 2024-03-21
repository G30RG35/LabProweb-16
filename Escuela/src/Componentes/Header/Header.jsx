import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

export const Header = () => {
  return (
    <>
      <div className="d-flex align-items-center py-4 bg-body-tertiary">
        <div className="container">
          <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
            <a
              href="/"
              className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
            >
              <svg className="bi me-2" width="40" height="32">
                <use href="#bootstrap"></use>
              </svg>
              <span className="fs-4">Simple header</span>
            </a>

            <ul className="nav nav-pills">
              <li className="nav-item">
                <a href="#" className="nav-link active" aria-current="page">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  Features
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  Pricing
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  FAQs
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  About
                </a>
              </li>
            </ul>
          </header>
        </div>
      </div>
    </>
  );
};
