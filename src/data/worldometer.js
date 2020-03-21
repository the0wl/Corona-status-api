import puppy from 'puppeteer'

class Wom {
    async getCountryData(req, res) {
        const { country } = req.params

        const browser = await puppy.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']})
        const page = await browser.newPage()
        await page.goto('https://www.worldometers.info/coronavirus/')

        const result = await page.evaluate(country => {
            const countryData = {}
            let finished = false

            document.querySelectorAll('tr').forEach(row => {
                if (row.rowIndex > 0) {

                    if (finished) {
                        return
                    }

                    if (row.children[0].children[0]) {
                        if (row.children[0].children[0].innerHTML === country) {
                            countryData.totalCases      = row.children[1].innerHTML
                            countryData.newCases        = row.children[2].innerHTML.slice(1, row.children[2].innerHTML.length)
                            countryData.totalDeaths     = row.children[3].innerHTML.trim()
                            countryData.newDeaths       = row.children[4].innerHTML.slice(1, row.children[4].innerHTML.length)
                            countryData.totalRecovered  = row.children[5].innerHTML
                            countryData.activeCases     = row.children[6].innerHTML
                            countryData.seriousCritical = row.children[7].innerHTML

                            finished = true
                        }
                    } else {
                        if (row.children[0].innerHTML === country) {
                            countryData.totalCases      = row.children[1].innerHTML
                            countryData.newCases        = row.children[2].innerHTML.slice(1, row.children[2].innerHTML.length)
                            countryData.totalDeaths     = row.children[3].innerHTML.trim()
                            countryData.newDeaths       = row.children[4].innerHTML.slice(1, row.children[4].innerHTML.length)
                            countryData.totalRecovered  = row.children[5].innerHTML
                            countryData.activeCases     = row.children[6].innerHTML
                            countryData.seriousCritical = row.children[7].innerHTML

                            finished = true
                        }
                    }
                }
            })

            if (!Object.keys(countryData).length) {
                countryData.error = 'No data for this country.'
            } else {
                document.querySelectorAll('#page-top').forEach(el => {
                    countryData.lastUpdate = el.nextElementSibling.innerHTML.slice(14, el.nextElementSibling.innerHTML.length)
                })
            }

            return countryData
        }, country)

        browser.close()
        return res.status(200).json(result)
    }

    async getAllData(req, res) {
        const browser = await puppy.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']})
        const page = await browser.newPage()
        await page.goto('https://www.worldometers.info/coronavirus/')

        const result = await page.evaluate(() => {
            const data = {}
            const countries = []
            let finished = false

            document.querySelectorAll('#page-top').forEach(el => {
                data.lastUpdate = el.nextElementSibling.innerHTML.slice(14, el.nextElementSibling.innerHTML.length)
            })

            document.querySelectorAll('tr').forEach(row => {
                if (row.rowIndex > 0) {

                    if (finished) {
                        return
                    }
                    
                    const countryData = {}

                    if (row.children[0].children[0]) {
                        countryData.country = row.children[0].children[0].innerHTML

                        if (countryData.country === '' || countryData.country === 'Total:') {
                            finished = true
                            return
                        }

                        countryData.totalCases      = row.children[1].innerHTML
                        countryData.newCases        = row.children[2].innerHTML.slice(1, row.children[2].innerHTML.length)
                        countryData.totalDeaths     = row.children[3].innerHTML.trim()
                        countryData.newDeaths       = row.children[4].innerHTML.slice(1, row.children[4].innerHTML.length)
                        countryData.totalRecovered  = row.children[5].innerHTML
                        countryData.activeCases     = row.children[6].innerHTML
                        countryData.seriousCritical = row.children[7].innerHTML

                        countries.push(countryData)
                    } else {
                        countryData.country = row.children[0].innerHTML

                        if (countryData.country === '' || countryData.country === 'Total:') {
                            finished = true
                            return
                        }

                        countryData.totalCases      = row.children[1].innerHTML
                        countryData.newCases        = row.children[2].innerHTML.slice(1, row.children[2].innerHTML.length)
                        countryData.totalDeaths     = row.children[3].innerHTML.trim()
                        countryData.newDeaths       = row.children[4].innerHTML.slice(1, row.children[4].innerHTML.length)
                        countryData.totalRecovered  = row.children[5].innerHTML
                        countryData.activeCases     = row.children[6].innerHTML
                        countryData.seriousCritical = row.children[7].innerHTML

                        countries.push(countryData)
                    }
                }
            })

            data.countries = countries

            return data
        })

        browser.close()
        return res.status(200).json(result)
    }

    async getWorldData(req, res) {
        const browser = await puppy.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']})
        const page = await browser.newPage()
        await page.goto('https://www.worldometers.info/coronavirus/')

        const result = await page.evaluate(() => {
            const worldData = {}
            let finished = false

            document.querySelectorAll('tr').forEach(row => {
                if (row.rowIndex > 0) {

                    if (finished) {
                        return
                    }

                    if (row.children[0].children[0]) {
                        if (row.children[0].children[0].innerHTML === 'Total:') {
                            worldData.totalCases      = row.children[1].innerHTML
                            worldData.newCases        = row.children[2].innerHTML
                            worldData.totalDeaths     = row.children[3].innerHTML.trim()
                            worldData.newDeaths       = row.children[4].innerHTML
                            worldData.totalRecovered  = row.children[5].innerHTML
                            worldData.activeCases     = row.children[6].innerHTML
                            worldData.seriousCritical = row.children[7].innerHTML

                            finished = true
                        }
                    } else {
                        if (row.children[0].innerHTML === 'Total:') {
                            worldData.totalCases      = row.children[1].innerHTML
                            worldData.newCases        = row.children[2].innerHTML
                            worldData.totalDeaths     = row.children[3].innerHTML.trim()
                            worldData.newDeaths       = row.children[4].innerHTML
                            worldData.totalRecovered  = row.children[5].innerHTML
                            worldData.activeCases     = row.children[6].innerHTML
                            worldData.seriousCritical = row.children[7].innerHTML

                            finished = true
                        }
                    }
                }
            })

            document.querySelectorAll('#page-top').forEach(el => {
                worldData.lastUpdate = el.nextElementSibling.innerHTML.slice(14, el.nextElementSibling.innerHTML.length)
            })

            return worldData
        })

        browser.close()
        return res.status(200).json(result)
    }
}

export default new Wom()