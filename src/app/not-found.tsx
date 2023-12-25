import React from "react";
import Link from "next/link";

const NotFound = () => {
  return (
    <div>
      <div className="error-area">
        <div className="error-item">
          <div className="d-table">
            <div className="d-table-cell">
              <div className="error-text">
                <h1>404!</h1>
                <p>Sorry! The Page Not Found</p>
                <span>
                  Oops! The page you are looking for does not exit. it might
                  been moved or deleted.
                </span>

                <Link href="/public">Return to Home</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
