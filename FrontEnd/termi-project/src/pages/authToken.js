import axios from 'axios';

const token = localStorage.getItem('token');

axios.default.headers.common['token']=token;

// Make a request to a protected route or resource

axios.get('/http://dir.y2022.kinneret.cc:7013/auth/private')
.then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error.response.data);
  });