import React, { useState, useEffect } from "react";
import CourseCard from "../../components/CourseCard/CourseCard";
import LogoutButton from "../../components/LogoutButton/LogoutButton";
import LoginButton from "../../components/LoginButton/LoginButton";
import AboutRedirectButton from "../../components/AboutRedirectButton/AboutRedirectButton";

const Home = () => {
  const SERVER_URL = "https://testcases-server.onrender.com";
  const [courses, setCourses] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Tracks login status
  const [loading, setLoading] = useState(true); // Tracks loading state
  const PORT = 5001;
  const COURSE_API_PATH = `${SERVER_URL}/api/courses`;

  // Fetch authentication status
  useEffect(() => {
    fetch(`${SERVER_URL}/auth/status`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setIsLoggedIn(data.loggedIn))
      .catch((err) => console.error("Error fetching auth status:", err));
  }, []);

  // Fetch courses data
  useEffect(() => {
    setLoading(true); // Set loading state to true before fetch
    fetch(COURSE_API_PATH)
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data)) {
          throw new Error("Unexpected response format");
        }
        setCourses(data);
      })
      .catch((err) => console.error("Error fetching course data: ", err))
      .finally(() => setLoading(false)); // Set loading state to false after fetch
  }, []);

  return (
    <>
      <div className="flex justify-end p-4">
        {isLoggedIn ? <LogoutButton /> : <LoginButton />}
      </div>

      <div className="flex flex-col items-center gap-4 p-4 bg-secondary min-h-screen">
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary border-opacity-75"></div>
            <span className="ml-4 text-primary text-lg font-semibold">
              Loading courses...
            </span>
          </div>
        ) : (
          courses.map((course) => (
            <CourseCard
              key={course.coursePath}
              courseName={course.courseName}
              contributions={course.contributions}
              coursePath={course.coursePath}
            />
          ))
        )}
      </div>

      {/* AboutRedirectButton added for discrete redirection to About page */}
      <AboutRedirectButton />
    </>
  );
};

export default Home;