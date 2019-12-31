
const config = {
    API_BASE_URL: process.env.NODE_ENV === 'development'?  "http://localhost:5000/api/": "https://api-data-lab.herokuapp.com/api/",
    VERSION: 'v1',
};

export default config;