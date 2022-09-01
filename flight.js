const ifFlightLater = (flightTime, flightDate) => {
    const flightHour = parseInt(flightTime.slice(0,2))
    const flightMinute = parseInt(flightTime.slice(3,5))
    const flightDay = parseInt(flightDate.slice(0,2))
    const flightMonth = parseInt(flightDate.slice(3,5)) - 1
    const flightYear = flightDate.slice(6,10)

    const currentDate = new Date()
    const flightDateRepresentation = new Date()

    flightDateRepresentation.setHours(flightHour)
    flightDateRepresentation.setMinutes(flightMinute)
    flightDateRepresentation.setDate(flightDay)
    flightDateRepresentation.setMonth(flightMonth)
    flightDateRepresentation.setYear(flightYear)

    if (flightDateRepresentation > currentDate) {
        return true
    }
}

export default class Flight {
    retrieveFlights = (flightsData, limit) => {
        const flights = []

        for (let i=0; i<flightsData.length; i++) {
            const flightTime = flightsData[i].estimadedhour.slice(0,5)
            const flightDate = flightsData[i].estimadedDate

            if (ifFlightLater(flightTime, flightDate)) {
                if (flightsData[i].destiny !== flightsData[i-1].destiny) {
                    flights.push(flightsData[i])
                }
            }
            if (flights.length === limit) 
                break
        }

        return flights
      }
}