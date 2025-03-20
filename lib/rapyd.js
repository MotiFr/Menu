import crypto from 'crypto';

// Replace with your actual Rapyd API keys
const RAPYD_ACCESS_KEY = process.env.RAPYD_ACCESS_KEY;
const RAPYD_SECRET_KEY = process.env.RAPYD_SECRET_KEY;
const RAPYD_BASE_URL = process.env.RAPYD_BASE_URL || 'https://sandboxapi.rapyd.net';

/**
 * Generate a random string for the salt
 */
function generateRandomString(size) {
  return crypto.randomBytes(size).toString('hex');
}

/**
 * Generate the signature for Rapyd API authentication
 */
function generateSignature(method, path, salt, timestamp, body) {
  // Handle body serialization
  let bodyString = "";
  if (body) {
    bodyString = JSON.stringify(body);
    bodyString = bodyString === "{}" ? "" : bodyString;
  }
  
  // The string to sign according to Rapyd docs - ordering is critical
  const toSign = method.toLowerCase() + path + salt + timestamp + RAPYD_ACCESS_KEY + RAPYD_SECRET_KEY + bodyString;
  
  // First create hex digest
  const hexDigest = crypto
    .createHmac('sha256', RAPYD_SECRET_KEY)
    .update(toSign)
    .digest('hex');
    
  // Convert hex to base64
  const signature = Buffer.from(hexDigest).toString('base64');
  
  return signature;
}

/**
 * Make a request to the Rapyd API
 */
async function rapydRequest(method, path, body = null) {
  const salt = generateRandomString(8);
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const idempotency = new Date().getTime().toString();
  
  // Generate signature with the correct method
  const signature = generateSignature(method, path, salt, timestamp, body);
  
  const headers = {
    'Content-Type': 'application/json',
    'access_key': RAPYD_ACCESS_KEY,
    'salt': salt,
    'timestamp': timestamp,
    'signature': signature,
    'idempotency': idempotency
  };
  
  const url = `${RAPYD_BASE_URL}${path}`;
  
  try {
    const bodyString = body ? JSON.stringify(body) : undefined;
    
    const options = {
      method: method,
      headers: headers,
      body: bodyString
    };
    const response = await fetch(url, options);
    const data = await response.json();
    
    if (data.status?.status !== 'SUCCESS') {
      console.error('Rapyd API error response:', data);
      throw new Error(`Rapyd API error: ${data.status?.message || JSON.stringify(data)}`);
    }
    
    return data;
  } catch (error) {
    console.error('Rapyd API request failed:', error);
    throw error;
  }
}

// API wrapper functions
export async function getPaymentMethodsByCountry(country, currency) {
  const path = `/v1/payment_methods/country?country=${country}&currency=${currency}`;
  return rapydRequest('GET', path);
}

export async function createCustomer(body) {
  const path = '/v1/customers';
  return rapydRequest('POST', path, body);
}

export async function createProduct(body) {
  const path = '/v1/products';
  return rapydRequest('POST', path, body);
}

export async function createPlan(body) {
  const path = '/v1/plans';
  return rapydRequest('POST', path, body);
}

export async function createSubscription(body) {
  console.log(body);
  const path = '/v1/subscriptions';
  return rapydRequest('POST', path, body);
}