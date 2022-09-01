const tableBody = document.getElementById('table-body')

const getFlight = () => {
    fetch('http://localhost:3000/flights')
        .then(response => response.json())
        .then(flights => {
            fillTable(flights)
        })
        .catch(err => console.log(err))
}

getFlight()

const fillTable = (flights) => {
    for (const flight of flights) {
        const tableRow = document.createElement('tr')
        const tableIcon = document.createElement('td')
        tableIcon.textContent = "✈️"
        tableRow.append(tableIcon)


        const flightInfo = {
            time: flight.estimadedhour.slice(0, 5),
            destination: flight.destiny,
            flight: flight.flightNumber,
            terminal: flight.terminal,
            gate: flight.firstDoor,
            status: flight.state
        }

        for (const flightElement in flightInfo) {
            const tableContent = document.createElement('td')
            const word = Array.from(flightInfo[flightElement])
            
            for (const [index, letter] of word.entries()) {
                const letterElement = document.createElement('div')

                setTimeout(() => {
                    letterElement.classList.add('flip')
                    letterElement.textContent = letter
                    tableContent.append(letterElement)
                }, 100 * index)
            }
            tableRow.append(tableContent)
        }
        tableBody.append(tableRow)
    }
}