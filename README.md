# School Management API

A Node.js/Express API for managing schools with location-based features. This application allows you to add schools and retrieve them sorted by distance from a given location.

## 🚀 Features

- Add new schools with location data
- List all schools sorted by distance from a user's location
- RESTful API design
- PostgreSQL database with Prisma ORM
- TypeScript support
- Distance calculation using Haversine formula

## 📋 Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/Anas484/school-assignment.git
cd school-assignment
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Create a .env file
DATABASE_URL="postgresql://username:password@localhost:5432/school-assignment"
PORT=3000
```

4. Generate Prisma client:
```bash
npx prisma generate
```

5. Run database migrations:
```bash
npx prisma migrate dev
```

6. Build the project:
```bash
npm run build
```

7. Start the server:
```bash
npm start
```

The server will start on port 3000 (or the port specified in your .env file).

## 📚 API Documentation

### Base URL
```
http://localhost:3000/api/school
```

### Endpoints

#### 1. Add a New School

**POST** `/addSchool`

Adds a new school to the database.

**Request Body:**
```json
{
  "name": "Example School",
  "address": "123 Main St, City, State",
  "latitude": 40.7128,
  "longitude": -74.0060
}
```

**Parameters:**
- `name` (string, required): Name of the school
- `address` (string, required): Physical address of the school
- `latitude` (number, required): Latitude coordinate of the school
- `longitude` (number, required): Longitude coordinate of the school

**Response:**
```json
{
  "id": 1,
  "name": "Example School",
  "address": "123 Main St, City, State",
  "latitude": 40.7128,
  "longitude": -74.0060
}
```

**Status Codes:**
- `201`: School created successfully
- `400`: Missing required fields
- `500`: Internal server error

---

#### 2. List Schools with Distance

**GET** `/listSchools`

Retrieves all schools sorted by distance from the specified user location.

**Query Parameters:**
- `latitude` (number, required): User's latitude coordinate
- `longitude` (number, required): User's longitude coordinate

**Example Request:**
```
GET /api/school/listSchools?latitude=40.7128&longitude=-74.0060
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Nearest School",
    "address": "123 Main St, City, State",
    "latitude": 40.7130,
    "longitude": -74.0062,
    "distance": 0.28
  },
  {
    "id": 2,
    "name": "Farther School",
    "address": "456 Oak Ave, City, State",
    "latitude": 40.7200,
    "longitude": -74.0100,
    "distance": 1.05
  }
]
```

**Response Fields:**
- All school fields from the database
- `distance` (number): Distance in kilometers from the user's location

**Status Codes:**
- `200`: Schools retrieved successfully
- `500`: Internal server error

## 🗄️ Database Schema

The application uses PostgreSQL with the following School model:

```prisma
model School {
  id        Int     @id @default(autoincrement())
  name      String
  address   String
  latitude  Float
  longitude Float
}
```

## 🧮 Distance Calculation

The API uses the Haversine formula to calculate the great-circle distance between two points on Earth's surface. The distance is returned in kilometers and is used to sort schools from nearest to farthest.

## 🔧 Development

### Available Scripts

- `npm run build`: Compiles TypeScript to JavaScript
- `npm start`: Runs the compiled application
- `npx prisma generate`: Generates Prisma client
- `npx prisma migrate dev`: Runs database migrations
- `npx prisma studio`: Opens Prisma Studio for database management

### Project Structure

```
src/
├── controllers/
│   └── SchoolController.ts    # Business logic for school operations
├── routes/
│   └── SchoolRouter.ts        # API route definitions
├── interface/
│   └── SchoolInterface.ts     # TypeScript interfaces
├── utils/
│   └── distanceFormula.ts     # Distance calculation utility
└── index.ts                   # Express app setup
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Ensure your PostgreSQL server is running
   - Check your DATABASE_URL in the .env file
   - Verify database credentials

2. **Migration Issues**
   - Run `npx prisma migrate dev` to apply pending migrations
   - Check if the database exists

3. **Port Already in Use**
   - Change the PORT in your .env file
   - Kill the process using the port

### Getting Help

If you encounter any issues, please:
1. Check the troubleshooting section above
2. Review the error logs
3. Open an issue on GitHub

---

**Built with ❤️ using Node.js, Express, TypeScript, and Prisma**
