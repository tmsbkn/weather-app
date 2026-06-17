const app = (() =>{
    const key = 'MWR6Z6RGNMP6WH5SP9P2S997P'
    
    const fetchWeather = async (location) => {
        const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${key}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            
            console.log(data);

            return data;
        } catch (error) {
            console.error(error);
        }
    }

    return {fetchWeather};
})();

export default app;