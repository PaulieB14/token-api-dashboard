import { NextApiRequest, NextApiResponse } from 'next';

// The API URL from the environment variables or use the correct stage URL
const API_URL = process.env.NEXT_PUBLIC_GRAPH_API_URL || "https://token-api.thegraph.com";

/**
 * API Route for Token API requests (Pages Router version)
 * This keeps API keys secure and handles authentication properly
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Get query parameters from the request
    const { path, ...restParams } = req.query;
    
    // Get the path to the API endpoint (required)
    if (!path || Array.isArray(path)) {
      console.error("❌ Missing or invalid 'path' parameter in request");
      return res.status(400).json({ error: "Missing or invalid 'path' parameter" });
    }

    // Build the complete URL
    const url = new URL(path, API_URL);

    // Forward all other query parameters to the API request
    Object.entries(restParams).forEach(([key, value]) => {
      if (typeof value === 'string') {
        url.searchParams.append(key, value);
      } else if (Array.isArray(value)) {
        value.forEach(v => url.searchParams.append(key, v));
      }
    });

    console.log(`🌐 Proxying request to: ${url.toString()}`);
    console.log(`🔍 Request parameters:`, req.query);

    // Include authorization header if environment variable exists
    const headers: HeadersInit = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    // First try to use API key if available
    if (process.env.NEXT_PUBLIC_GRAPH_API_KEY) {
      headers["X-Api-Key"] = process.env.NEXT_PUBLIC_GRAPH_API_KEY;
      console.log("🔑 Using API key for authentication");
    }
    // Fall back to JWT token if no API key
    else if (process.env.NEXT_PUBLIC_GRAPH_TOKEN) {
      headers["Authorization"] = `Bearer ${process.env.NEXT_PUBLIC_GRAPH_TOKEN}`;
      console.log("🔒 Using JWT token for authentication");
    } else {
      console.warn(
        "⚠️ No API token or key found in environment variables. API calls may fail due to authentication issues.",
      );
    }

    // Make the API request
    console.log(`📡 Sending request to: ${url.toString()}`);
    const response = await fetch(url.toString(), {
      method: "GET",
      headers,
      cache: "no-store", // Disable caching
    });

    // Log the raw response for debugging
    console.log(`📡 API Response Status: ${response.status}`);

    // Forward response status and body
    let data;
    try {
      data = await response.json();
      console.log(`📊 API Response data:`, data);
    } catch (e) {
      const text = await response.text();
      console.error("Failed to parse response as JSON:", text);
      return res.status(500).json({ error: "Failed to parse API response" });
    }

    // Return the response
    return res.status(response.status).json(data);
  } catch (error) {
    console.error("❌ API Proxy Error:", error);
    return res.status(500).json({
      error: error instanceof Error ? error.message : "Unknown error occurred"
    });
  }
}
