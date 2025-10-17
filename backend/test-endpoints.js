const axios = require('axios');

const BASE_URL = 'http://localhost:3000';
const API_PATH = '/api';
const AUTH_PATH = `${API_PATH}/auth`;
const SWAGGER_PATH = '/api-docs';

const testConfig = {
  email: 'empresa@test.com',
  password: '123456',
  role: 'CLIENT'
};

async function runTests() {
  try {
    // Test 1: Health Check
    const healthCheck = await axios.get(`${BASE_URL}${API_PATH}/health`);
    console.log('1. Health Check:');
    console.log(`   ✓ Status: ${healthCheck.status === 200 ? '200 OK' : 'FAILED'}`);
    console.log(`   ✓ Success: ${healthCheck.data.success ? 'true' : 'false'}`);
    console.log(`   Endpoint: ${BASE_URL}${API_PATH}/health\n`);

    // Test 2: Login
    const login = await axios.post(`${BASE_URL}/api/login`, testConfig);
    console.log('2. Login:');
    console.log(`   ✓ Status: ${login.status === 200 ? '200 OK' : 'FAILED'}`);
    console.log(`   ✓ Message: ${login.data.message || 'No message'}`);
    console.log(`   Endpoint: ${BASE_URL}/login\n`);

    // Test 3: Verify Token
    // const token = login.data.accessToken;
    // const verify = await axios.get(`${BASE_URL}${AUTH_PATH}/verify`, {
    //   headers: { Authorization: `Bearer ${token}` }
    // });
    // console.log('3. Verify Token:');
    // console.log(`   ✓ Status: ${verify.status === 200 ? '200 OK' : 'FAILED'}`);
    // console.log(`   ✓ Success: ${verify.data.success ? 'true' : 'false'}`);
    // console.log(`   Endpoint: ${BASE_URL}${AUTH_PATH}/verify\n`);

    // Test 4: Swagger Documentation
    const swagger = await axios.get(`${BASE_URL}${SWAGGER_PATH}`);
    console.log('4. Swagger Documentation:');
    console.log(`   ✓ Status: ${swagger.status === 200 ? '200 OK' : 'FAILED'}`);
    console.log(`   ✓ UI Available: ${swagger.status === 200 ? 'true' : 'false'}`);
    console.log(`   Endpoint: ${BASE_URL}${SWAGGER_PATH}\n`);

  } catch (error) {
    console.log('Error en las pruebas:');
    console.log('Message:', error.message);
    if (error.code) {
      console.log('Code:', error.code);
    }
    if (error.response) {
      console.log('Response status:', error.response.status);
      console.log('Response data:', error.response.data);
    } else {
      console.log('No response received - server likely not running');
    }
  }
}

runTests();