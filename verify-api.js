import http from 'http';

const testCategory = { name: 'API_VERIFY_TEST' };

function request(options, data) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => resolve({ statusCode: res.statusCode, body }));
    });
    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

async function runTests() {
  console.log('🚀 Starting API Verification...');

  // 1. Test POST
  console.log('--- Testing POST /categories ---');
  const postRes = await request({
    hostname: 'localhost',
    port: 3005,
    path: '/categories',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, testCategory);
  console.log('Status:', postRes.statusCode);
  console.log('Body:', postRes.body);

  if (postRes.statusCode !== 201) {
    console.error('❌ POST Test Failed!');
    process.exit(1);
  }

  // 2. Test GET
  console.log('--- Testing GET /categories ---');
  const getRes = await request({
    hostname: 'localhost',
    port: 3005,
    path: '/categories',
    method: 'GET'
  });
  console.log('Status:', getRes.statusCode);
  const cats = JSON.parse(getRes.body);
  const found = cats.find(c => c.name === 'API_VERIFY_TEST');
  console.log('Found new category:', found ? 'YES' : 'NO');

  if (!found) {
    console.error('❌ GET Verification Failed!');
    process.exit(1);
  }

  // 3. Test DELETE
  console.log('--- Testing DELETE /categories/:id ---');
  const delRes = await request({
    hostname: 'localhost',
    port: 3005,
    path: `/categories/${found.id}`,
    method: 'DELETE'
  });
  console.log('Status:', delRes.statusCode);

  if (delRes.statusCode !== 204) {
    console.error('❌ DELETE Test Failed!');
    process.exit(1);
  }

  console.log('✅ API Verification Passed Successfully!');
}

runTests().catch(err => {
  console.error('💥 Test Crashed:', err);
  process.exit(1);
});
