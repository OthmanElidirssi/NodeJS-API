const express = require('express');
const mongoose = require('mongoose'); // Importer le module mongoose

const app = express();
const cors=require('cors');

const cityController = require('./controllers/CityController');
const zoneController = require('./controllers/ZoneController');
const pharmacieController= require('./controllers/PharmacieController');
const gardeController=require('./controllers/GardeController');
const cores = require('cores');

mongoose.connect('mongodb://0.0.0.0:27017/location', { // Configurer la connexion à la base de données
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(cors());
app.use('/api/cities', cityController);
app.use('/api/zones', zoneController);
app.use('/api/pharmacies',pharmacieController);
app.use('/api/gardes',gardeController);

const port = process.env.PORT || 3030;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
