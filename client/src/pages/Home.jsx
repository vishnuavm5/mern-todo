import "../../src/App.css";
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div className="hero min-h-screen bg-base-10">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Hello there</h1>
            <p className="py-6">
              This is a Todo App to add and track your daily tasks...
            </p>
            <button className="btn btn-primary">
              <Link to="/auth">Get Started</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
