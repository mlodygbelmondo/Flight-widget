import express from 'express'
import axios from 'axios'
import path from 'path';
import cors from 'cors'
import dotenv from 'dotenv'
import flight from './flight.js'

dotenv.config()

const __dirname = path.resolve();
const app = express()
const flightHandler = new flight()

const PORT = 3000

app.use(cors())

app.get("/flights", (req, res) => {
    const options = {
        method: 'GET',
        url: 'https://madrid-barajas-airport-flights.p.rapidapi.com/MAD/departures',
        headers: {
          'X-RapidAPI-Key': process.env.API_KEY,
          'X-RapidAPI-Host': 'madrid-barajas-airport-flights.p.rapidapi.com'
        }
      };
      
      axios.request(options).then((response) => {
          console.log(response.data);
          console.log(response.data[0].state)

          const flightsArray = flightHandler.retrieveFlights(response.data, 10)
          res.json(flightsArray)

      }).catch(function (error) {
          console.error(error);
      });
})

app.listen(process.env.PORT || PORT, () => {
    console.log("Server is running on port", PORT)
})