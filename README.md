# Nature Heroes REST API
## Description

This is a the backend repository for the React application `Nature Heroes`.

---

## Instructions

When cloning the project, change the <code>sample.env</code> file name for <code>.env</code>. The project will run on **PORT 8080**.

Then, run:
```bash
npm install
```
## Scripts

- To start the project run:
```bash
npm run start
```
- To start the project in development mode, run:
```bash
npm run dev
```
- To seed the database, run:
```bash
npm run seedAnimals
npm run seedFoundations
```
---

## Models

### User

Users in the database have the following properties:

```js
const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  hashedPassword: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  image: {
    type: String,
    default: 'https://e1.pxfuel.com/desktop-wallpaper/360/419/desktop-wallpaper-geometric-animal-animal.jpg'
  },
  donated_total: {
    type: Number,
    default: 0,
  }
},
  {
    timestamps: true
  });

module.exports = model("User", userSchema);

```

### Animal

Animals in the database have the following properties:

```js
const animalSchema = new Schema({
  common_name: {
    type: String,
    trim: true,
    required: true
  },
  scientific_name: {
    type: String,
    unique: true,
    trim: true,
    required: true
  },
  class_name: {
    type: String,
    trim: true,
    required: true
  },
  family_name: {
    type: String,
    trim: true,
    required: true
  },
  habitat_type: {
    type: String,
    required: true
  },
  population: {
    type: Number,
    required: true
  },
  species_status: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  database_link: {
    type: String,
    required: true
  }
},
  {
    timestamps: true
  });

module.exports = model("Animal", animalSchema);
```

### Donation

Donations in the database have the following properties:

```js
const donationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  amount: {
    type: Number,
    default: 10,
    required: [true, 'Please specify your donation.']
  }
},
  {
    timestamps: true
  });

module.exports = model("Donation", donationSchema);
```

### Foundation

Foundations in the database have the following properties:

```js
const foundationSchema = new Schema({
  name: {
    type: String,
    unique: true,
    trim: true,
    required: true
  },
  acronym: {
    type: String,
    unique: true,
    trim: true,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  logo: {
    type: String,
    required: true
  },
},
  {
    timestamps: true
  });

module.exports = model("Foundation", foundationSchema);
```

### Project

Projects in the database have the following properties:

```js
const projectSchema = new Schema({
  foundation: {
    type: Schema.Types.ObjectId,
    ref: 'Foundation',
    required: [true, 'Please select a foundation.']
  },
  animal: {
    type: Schema.Types.ObjectId,
    ref: 'Animal',
    required: [true, 'Please select an animal.']
  },
  collected_donations: {
    type: Number,
    default: 0,
    required: [true, 'Please insert a number or start it with 0']
  }
},
  {
    timestamps: true
  });

module.exports = model("Project", projectSchema);
```
---

## API endpoints and usage 

| Action           | Method    | Endpoint             | Req.body                        | Private/Public |
|------------------|-----------|----------------------|---------------------------------|-----------------|
| Get home page     | GET      | /  |   |    Public | 
| Sign up user     | POST      | /auth/signup  | { username, email, password }   |    Public |                 
| Log in user      | POST      | /auth/login   | { email, password }             |    Public |                  
| Get logged in user   | GET     | /auth/me    |   | Private |
| Edit user   | PUT     | users/edit/:userId    |   | Private |
| Delete user   | DELETE     | users/edit/:userId    |   | Private |
| Get animals   | GET     | /animals    |   | Public |
| Get animal   | GET     | /animals/:animalId    |   | Public |
| Post animal   | POST     | /animals/:animalId    | { common_name, scientific_name, class_name, family_name, population, species_status, image }  | Private |
| Edit animal   | PUT     | /animals/edit/:animalId    |  { common_name, scientific_name, class_name, family_name, population, species_status, image } | Private |
| Delete animal   | DELETE     | /animals/edit/:animalId    |   | Private |
| Get foundations   | GET     | /foundations    |   | Public |
| Get foundation   | GET     | /foundations/:foundationId    |   | Public |
| Post foundation   | POST     | /foundations/:foundationId    |  { name, acronym, description, logo } | Private |
| Edit foundation   | PUT     | /foundations/:foundationId    |  { name, acronym, description, logo } | Private |
| Delete foundation   | DELETE     | /foundations/:foundationId    |   | Private |
| Get projects   | GET     | /projects    |   | Public |
| Get project   | GET     | /projects/:projectId    |   | Public |
| Post project   | POST     | /projects    | { foundation, animal }  | Private |
| Edit project   | PUT     | /projects/:projectId    |  { foundation, animal } | Private |
| Delete project   | DELETE     | /projects/:projectId    |   | Private |
| Get donations   | GET     | /donations    |   | Public |
| Get donation   | GET     | /donations/:donationId    |   | Public |
| Post donation   | POST     | /donations/:projectId    | { project, amount }  | Public |

---

## Useful links

- [Presentation slides](https://slides.com/daniel_rg/presentacion-daniel-rondon)
- [Frontend repository](https://github.com/Dani-RG/frontend-template-m3)
- [Frontend deploy](https://nature-heroes.netlify.app/)
- [Deployed REST API](https://nature-heroes.fly.dev/)

