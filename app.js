const puppeteer = require('puppeteer')

async function countStores(url) {
  // Launch a headless browser
  const browser = await puppeteer.launch()

  // Open a new page and navigate to the URL
  const page = await browser.newPage()
  await page.goto(url)

  // Extract the location data from the page
  const locations = await page.$$eval('.location', (nodes) =>
    nodes.map((node) => node.textContent)
  )

  // Count the number of locations that contain the word "store"
  const storeCount = locations.filter((location) =>
    location.toLocaleLowerCase().includes('store')
  ).length

  // Close the browser and return the store count
  await browser.close()
  return storeCount
}

// Call the countStores function with a website URL
const url = 'https://zonafresca.com/location'
countStores(url).then((storeCount) =>
  console.log(`The website has ${storeCount} store locations.`)
)

// const url = 'https://zonafresca.com'

// fetch(url)
//   .then((response) => response.text())
//   .then((html) => {
//     const parser = new DOMParser()
//     const doc = parser.parseFromString(html, 'text/html')

//     // Extract the location data from the page
//     const locations = Array.from(doc.querySelectorAll('.location')).map(
//       (node) => node.textContent
//     )

//     // Count the number of locations that contain the word "store"
//     const storeCount = locations.filter((location) =>
//       location?.toLocaleLowerCase().includes('store')
//     ).length

//     console.log(`The website has ${storeCount} store locations.`)
//   })
//   .catch((error) => console.error(error))
