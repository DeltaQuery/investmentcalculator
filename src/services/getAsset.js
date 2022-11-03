import axios from 'axios'

export const getAsset = async (symbol) => {
    const API = "https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol="
    const API_Key = "19dc842d1amsh56456f37b218af0p17af85jsnc2af40556506"

    try {
        const res = await axios.get(`${API}${symbol}&apikey=${API_Key}`)
        return res
    } catch (e) {
        alert("There has been an error finding the asset. Please try again.", err)
        return []
    }
}