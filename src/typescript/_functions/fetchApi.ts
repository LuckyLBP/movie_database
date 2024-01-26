/***** FETCH API *****/

const api_key = import.meta.env.VITE_API_KEY;;
const read_access_token = import.meta.env.API_READ_ACCESS_TOKEN;
const api_url = import.meta.env.API_URL;
const api_image_url = import.meta.env.API_IMAGE_URL;

const fetchDataFromApi = function (url: string, callback: (data: any, optionalParam?: any) => void) {
    fetch(url)
      .then(response => response.json())
      .then(data => callback(data))

      .catch(error => console.error('Error fetching data:', error));
  }

export { 
    fetchDataFromApi, 
    api_key, 
    read_access_token, 
    api_url, 
    api_image_url
}

