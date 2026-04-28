import { faker } from '@faker-js/faker';
import fs from 'fs';
import axios from 'axios'

// const schools = Array.from({ length: 30 }).map(() => ({
//   name: faker.company.name(),
//   address: faker.location.streetAddress(),
//   latitude: faker.location.latitude({ min: 18.9, max: 19.3 }),
//   longitude: faker.location.longitude({ min: 72.7, max: 73.0 }),
// }));


// fs.writeFile('test.json', JSON.stringify(schools, null, 2), (err) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log('File written successfully');
//   }
// });

async function run() {
  const data = fs.readFileSync('test.json', 'utf8');
  const schools = JSON.parse(data);

  for (const school of schools) {
    try {
      const res = await axios.post(
        'http://localhost:3000/api/school/addSchool',
        school
      );
      console.log('Added:', res.data);
    } catch (err) {
      console.error('Error:', err.response?.status);
      console.error(err.response?.data);
    }

    await new Promise(r => setTimeout(r, 1000)); // proper delay
  }
}

run();