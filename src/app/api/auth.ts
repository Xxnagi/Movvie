import axios from "axios";
const apiKey = "c1262193488dbfbfc4f91af75a0f3ddc";
const baseUrl = "https://api.themoviedb.org/3";

// Function to create a request token
const createRequestToken = async () => {
  const response = await axios.get(
    `${baseUrl}/authentication/token/new?api_key=${apiKey}`
  );
  return response.data;
};

// Function to validate the request token with login
const validateWithLogin = async (
  username: string,
  password: string,
  request_token: string
) => {
  const response = await axios.post(
    `${baseUrl}/authentication/token/validate_with_login?api_key=${apiKey}`,
    {
      username,
      password,
      request_token,
    }
  );
  return response.data;
};

// Function to create a session ID
const createSession = async (request_token: string) => {
  const response = await axios.post(
    `${baseUrl}/authentication/session/new?api_key=${apiKey}`,
    {
      request_token,
    }
  );
  return response.data;
};

// Helper function for login and session creation
export const loginAndCreateSession = async (
  username: string,
  password: string
) => {
  try {
    // Step 1: Create a request token
    const tokenData = await createRequestToken();
    if (!tokenData.success) {
      throw new Error("Failed to get request token");
    }

    // Step 2: Validate the request token with login
    const loginData = await validateWithLogin(
      username,
      password,
      tokenData.request_token
    );
    if (!loginData.success) {
      throw new Error("Invalid username or password");
    }

    // Step 3: Create a session ID
    const sessionData = await createSession(loginData.request_token);
    if (!sessionData.success) {
      throw new Error("Failed to create session");
    }

    // Return session data for client to use
    return sessionData;
  } catch (error) {
    console.error("Error during login and session creation:", error);
    throw error;
  }
};

export const getAccountDetails = async (sessionId: string) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/account?api_key=${apiKey}&session_id=${sessionId}`
  );
  return response.data;
};
