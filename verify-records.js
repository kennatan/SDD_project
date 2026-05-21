import http from 'http';

const testRecord = {
  extension: '1234',
  location: '測試中心',
  categoryId: '1',
  problemDescription: '這是一段報修內容測試',
  handling: '這是一段處理方式測試'
};

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
  console.log('🚀 Starting Records Verification...');

  // 1. Test POST /records
  console.log('--- Testing POST /records ---');
  const postRes = await request({
    hostname: 'localhost',
    port: 3005,
    path: '/records',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, testRecord);
  
  console.log('Status:', postRes.statusCode);
  const created = JSON.parse(postRes.body);
  console.log('Created Description:', created.problemDescription);
  console.log('Created Handling:', created.handling);

  if (created.problemDescription !== testRecord.problemDescription || created.handling !== testRecord.handling) {
    console.error('❌ Data Mismatch in Response!');
    process.exit(1);
  }

  // 2. Test GET /records
  console.log('--- Testing GET /records ---');
  const getRes = await request({
    hostname: 'localhost',
    port: 3005,
    path: '/records',
    method: 'GET'
  });
  
  const records = JSON.parse(getRes.body);
  const found = records.find(r => r.id === created.id);
  console.log('Found in list:', found ? 'YES' : 'NO');
  console.log('Content check:', found?.problemDescription === testRecord.problemDescription ? 'OK' : 'FAIL');

  if (!found || found.problemDescription !== testRecord.problemDescription) {
    console.error('❌ List Verification Failed!');
    process.exit(1);
  }

  console.log('✅ Records Verification Passed Successfully!');
}

runTests().catch(err => {
  console.error('💥 Test Crashed:', err);
  process.exit(1);
});
