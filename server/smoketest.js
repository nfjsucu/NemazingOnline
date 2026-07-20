const { spawn } = require('child_process');
const http = require('http');

const srv = spawn('node', ['index.js'], { env: { ...process.env, PORT: '4011' }, stdio: 'inherit' });

function req(method, path, body, token) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const r = http.request(
      { host: 'localhost', port: 4011, path, method, headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: 'Bearer ' + token } : {}),
      } },
      (res) => {
        let out = '';
        res.on('data', (c) => (out += c));
        res.on('end', () => resolve({ status: res.statusCode, body: out ? JSON.parse(out) : null }));
      }
    );
    r.on('error', reject);
    if (data) r.write(data);
    r.end();
  });
}

(async () => {
  await new Promise((r) => setTimeout(r, 1500));
  console.log('health:', await req('GET', '/api/health'));
  const reg = await req('POST', '/api/register', { nickname: 'Nick_Name', password: 'test123' });
  console.log('register:', reg.status, JSON.stringify(reg.body));
  const token = reg.body.token;
  console.log('addBalance:', (await req('POST', '/api/balance/add', { amount: 250 }, token)).body);
  console.log('inventory count:', (await req('GET', '/api/inventory', null, token)).body.items.length);
  console.log('sell item1:', (await req('POST', '/api/inventory/sell', { itemId: 1 }, token)).body);
  console.log('complaint:', (await req('POST', '/api/complaints', { text: 'Тест жалобы' }, token)).body);
  console.log('me:', (await req('GET', '/api/me', null, token)).body);
  srv.kill();
  process.exit(0);
})();
