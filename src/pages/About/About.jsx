import React from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-primary text-secondary min-h-screen flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl bg-secondary text-primary-dark p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Read Me</h1>
        <p className="text-lg mb-4">
          Welcome! This platform uses GitHub's REST API to manage test cases for programming courses.  
          Users can upload and delete test cases, which are stored in a public GitHub repository.
        </p>
        <p className="text-lg mb-4">
          Note that GitHub's REST API enforces a rate limit of <strong>5000 requests per hour</strong>.  
          If the limit is reached, you may temporarily be unable to view or manage test cases on the site.  
          In such cases, you can access the test cases directly in the public repository:  
          <a
            href="https://github.com/virsworld/test_cases/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline ml-1"
          >
            https://github.com/virsworld/test_cases/
          </a>
        </p>
        <p className="text-lg mb-4">
          The code viewer for the files is powered by <strong>CodeMirror 6</strong>.
        </p>
        <p className="text-lg mb-4">
          For any issues, suggestions, or requests to add a new course, please feel free to email me at:  
          <a
            href="mailto:virpatel71@gmail.com"
            className="text-blue-600 hover:underline ml-1"
          >
            virpatel71@gmail.com
          </a>
        </p>
        <p className="text-lg">
          Thank you for contributing and supporting this platform. Your feedback is greatly appreciated!
        </p>
        <div className="mt-6">
          <button
            onClick={() => navigate(-1)} // Navigate back to the previous page
            className="bg-primary-dark text-secondary py-2 px-4 rounded shadow-md hover:bg-primary-light hover:shadow-lg transition duration-300"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;