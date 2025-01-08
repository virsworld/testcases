import React from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-primary text-secondary min-h-screen flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl bg-secondary text-primary-dark p-8 rounded-lg shadow-xl">
        <h1 className="text-4xl font-bold mb-6 text-center">Read Me</h1>
        <p className="text-lg mb-6">
          Welcome! This platform uses GitHub's REST API to manage test cases for programming courses.  
          Users can upload and delete test cases, which are stored in a public GitHub repository.
        </p>
        <p className="text-lg mb-6">
          Note that GitHub's REST API enforces a rate limit of <strong>5000 requests per hour</strong>.  
          If the limit is reached, you may temporarily be unable to view or manage test cases on the site.  
          In such cases, you can access the test cases directly in the public repository:  
          <a
            href="https://github.com/virsworld/test_cases/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline ml-1"
          >
            https://github.com/virsworld/test_cases/
          </a>
        </p>
        <p className="text-lg mb-6">
          The code viewer for the files is powered by <strong>CodeMirror 6</strong>.
        </p>
        <p className="text-lg mb-6">
          For any issues, suggestions, or requests to add a new course, please feel free to email me at:  
          <a
            href="mailto:virpatel71@gmail.com"
            className="text-accent hover:underline ml-1"
          >
            virpatel71@gmail.com
          </a>
        </p>
        <p className="text-lg mb-6">
          Thank you for contributing and supporting this platform. Your feedback is greatly appreciated!
        </p>
        
        {/* FAQ Section */}
        <div className="mt-8 border-t-4 border-accent-light pt-6">
          <h2 className="text-2xl font-semibold text-center text-primary-dark mb-4">Frequently Asked Questions (FAQ)</h2>
          <div className="mb-6">
            <strong className="text-xl text-primary-dark">Why can't I log in after authenticating?</strong>
            <p className="text-lg">
              To ensure you remain logged in, make sure cross-site tracking is enabled in your browser. This allows cookies to be saved, so you don’t need to log in repeatedly.  
              For Safari users, go to the "Safari" menu at the top left of your screen, select "Privacy," and ensure the "Prevent cross-site tracking" box is unchecked.
            </p>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={() => navigate(-1)} // Navigate back to the previous page
            className="bg-accent text-secondary py-2 px-6 rounded-full shadow-lg hover:bg-accent-light transition duration-300"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;