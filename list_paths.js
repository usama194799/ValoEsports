const fs = require('fs');
const data = JSON.parse(fs.readFileSync('api.json', 'utf8'));
const paths = Object.keys(data.paths);
paths.forEach(p => {
  const methods = Object.keys(data.paths[p]);
  methods.forEach(m => {
    console.log(`${m.toUpperCase()} ${p}`);
  });
});
