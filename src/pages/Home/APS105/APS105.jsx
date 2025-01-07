import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SnippetViewer from "../../../components/SnippetViewer/SnippetViewer";
import SnippetForm from "../../../components/SnippetForm/SnippetForm";
import LogoutButton from "../../../components/LogoutButton/LogoutButton";
import LoginButton from "../../../components/LoginButton/LoginButton";
import AboutRedirectButton from "../../../components/AboutRedirectButton/AboutRedirectButton";
import _ from "lodash";

const APS105 = () => {
  const PORT = 5001;
  const SERVER_URL = "https://testcases-server.onrender.com";
  const COURSE_CODE = "APS105";
  const GROUPED_SNIPPETS_PATH = `${SERVER_URL}/api/snippets/grouped?directory=${COURSE_CODE}`;
  const USER_SNIPPETS_PATH = `${SERVER_URL}/api/snippets/user?courseCode=${COURSE_CODE}`;
  const DELETE_SNIPPET_PATH = `${SERVER_URL}/api/snippets`;
  const AUTH_STATUS_PATH = `${SERVER_URL}/auth/status`;

  const [groupedSnippets, setGroupedSnippets] = useState({});
  const [userSnippets, setUserSnippets] = useState([]);
  const [expandedLabs, setExpandedLabs] = useState({});
  const [expandedUploaders, setExpandedUploaders] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formVisible, setFormVisible] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  // Fetch authentication status
  useEffect(() => {
    fetch(AUTH_STATUS_PATH, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setIsLoggedIn(data.loggedIn))
      .catch((err) => console.error("Error fetching auth status:", err));
  }, []);

  // Fetch grouped snippets
  const fetchGroupedSnippets = () => {
    setLoading(true);
    fetch(GROUPED_SNIPPETS_PATH, { credentials: "include" })
      .then((response) => response.json())
      .then((data) => setGroupedSnippets(data))
      .catch((err) => {
        console.error("Error fetching grouped snippets:", err);
        setErrorMessage("Failed to fetch grouped snippets.");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchGroupedSnippets();
  }, []);

  // Fetch user snippets
  const fetchUserSnippets = () => {
    setLoading(true);
    fetch(USER_SNIPPETS_PATH, { credentials: "include" })
      .then((response) => response.json())
      .then((data) => setUserSnippets(data))
      .catch((err) => {
        console.error("Error fetching user snippets:", err);
        setErrorMessage("Failed to fetch user snippets. Ensure you are logged in.");
      })
      .finally(() => setLoading(false));
  };

  // Handle delete test case
  const deleteTestCase = (testCaseName, lab) => {
    if (!isLoggedIn) {
      setErrorMessage("You must be logged in to delete test cases.");
      return;
    }

    setLoading(true);
    const query = `directory=${COURSE_CODE}&lab=${lab}&testCaseName=${testCaseName}`;
    fetch(`${DELETE_SNIPPET_PATH}?${query}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((response) => response.json())
      .then(() => {
        fetchUserSnippets();
        fetchGroupedSnippets();
      })
      .catch((err) => setErrorMessage("Failed to delete test case."));
  };

  // Toggle lab and uploader expansion
  const toggleLabExpansion = (lab) => {
    setExpandedLabs((prev) => ({ ...prev, [lab]: !prev[lab] }));
  };

  const toggleUploaderExpansion = (lab, uploader) => {
    setExpandedUploaders((prev) => ({
      ...prev,
      [`${lab}_${uploader}`]: !prev[`${lab}_${uploader}`],
    }));
  };

  // Toggle form visibility
  const toggleFormVisibility = () => setFormVisible(!formVisible);

  // Debounced fetch for grouped snippets and user snippets
  const debouncedFetch = _.debounce(() => {
    fetchGroupedSnippets();
    fetchUserSnippets();
  }, 1000);

  // Trigger fetch on adding a new snippet
  const handleSnippetAdded = () => {
    debouncedFetch();
  };

  return (
    <>
      <div className="flex justify-between items-center p-4 w-full">
        <button
          onClick={() => navigate("/home")}
          className="bg-secondary text-primary-dark py-2 px-4 rounded shadow-md border-2 border-primary hover:bg-primary hover:text-white hover:shadow-lg transition duration-300"
        >
          Back to Home
        </button>

        {isLoggedIn ? (
          <LogoutButton className="bg-red-600 text-white py-2 px-4 rounded shadow-md hover:bg-red-700 transition duration-300" />
        ) : (
          <LoginButton className="bg-green-600 text-white py-2 px-4 rounded shadow-md hover:bg-green-700 transition duration-300" />
        )}
      </div>

      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">APS105 Snippets</h1>
        {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}

        <div className="space-y-4 mb-6">
          {loading ? (
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary"></div>
              <span className="ml-3 text-primary">Loading test cases...</span>
            </div>
          ) : (
            Object.entries(groupedSnippets).map(([lab, uploaders]) => {
              const hasTestCases = Object.keys(uploaders).length > 0;

              return (
                <div key={lab}>
                  <button
                    onClick={hasTestCases ? () => toggleLabExpansion(lab) : undefined}
                    className={`py-2 px-6 rounded-lg shadow-md mb-2 transition duration-300 ${
                      hasTestCases
                        ? "bg-primary text-white hover:bg-primary-dark"
                        : "bg-gray-400 text-gray-700 cursor-not-allowed"
                    }`}
                    disabled={!hasTestCases}
                  >
                    {lab}
                  </button>

                  {hasTestCases && expandedLabs[lab] &&
                    Object.entries(uploaders).map(([uploader, testCases]) => (
                      <div key={uploader} className="ml-4">
                        <button
                          onClick={() => toggleUploaderExpansion(lab, uploader)}
                          className="bg-primary text-secondary py-2 px-4 rounded-lg shadow-md hover:bg-primary-dark transition duration-300 mb-2"
                        >
                          {uploader} ({Object.keys(testCases).length})
                        </button>

                        {expandedUploaders[`${lab}_${uploader}`] &&
                          Object.entries(testCases).map(([testCaseName, { input, output }]) => (
                            <SnippetViewer
                              key={testCaseName}
                              name={testCaseName}
                              testCase={input}
                              expectedOutput={output}
                              directory={`${COURSE_CODE}/${lab}`}
                            />
                          ))}
                      </div>
                    ))}
                </div>
              );
            })
          )}
        </div>

        <div className="flex gap-4 mb-4">
          {isLoggedIn && (
            <button
              onClick={() => {
                setDeleteMode(!deleteMode);
                if (!deleteMode) fetchUserSnippets();
              }}
              className="bg-red-600 text-white py-2 px-4 rounded shadow-md"
            >
              {deleteMode ? "Hide" : "Delete Test Case"}
            </button>
          )}

          <button
            onClick={toggleFormVisibility}
            className="bg-blue-600 text-white py-2 px-4 rounded shadow-md hover:bg-blue-700 transition duration-300"
          >
            {formVisible ? "Hide Form" : "Add Test Case"}
          </button>
        </div>

        {deleteMode && (
          <div>
            <h2 className="text-xl mb-4">Your Test Cases</h2>
            {loading ? (
              <div className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary"></div>
                <span className="ml-3 text-primary">Loading your test cases...</span>
              </div>
            ) : userSnippets.length === 0 ? (
              <p>You have not contributed any test cases yet.</p>
            ) : (
              userSnippets.map(({ testCaseName, lab }) => (
                <div key={testCaseName} className="mb-2 flex items-center">
                  <span className="mr-2">{testCaseName} ~ {lab}</span>
                  <button
                    onClick={() => deleteTestCase(testCaseName, lab)}
                    className="bg-red-500 text-white py-1 px-2 rounded"
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        )}

        {formVisible && (
          <SnippetForm
            directory={COURSE_CODE}
            numLabs={9}
            onSnippetAdded={handleSnippetAdded}
          />
        )}
      </div>

      <AboutRedirectButton />
    </>
  );
};

export default APS105;