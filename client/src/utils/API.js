import axios from 'axios';

const APIKEY = 'b9f91d369ff59547cd47b931d8cbc56b:0:74623931';

const queryUrlBase = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=' + APIKEY + '&q=';

export default {
  nytSearch: function(queryTerms) {
    return axios.get(`${queryUrlBase}${queryTerms}`);
  },
  getSavedArticles: function() {
    return axios.get('/api/saved/');
  },
  deleteArticle: function(id) {
    return axios.delete('/api/saved/' + id);
  },
  saveArticle: function(articleData) {
    return axios.post('/api/saved', articleData);
  }
};
