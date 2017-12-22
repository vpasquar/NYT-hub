import React, { Component } from 'react';
import Jumbotron from '../../components/Jumbotron';
import API from '../../utils/API';
import { Link } from 'react-router-dom';
import { Col, Row, Container } from '../../components/Grid';
import { List, ListItem } from '../../components/List';
import { Input, TextArea, FormBtn } from '../../components/Form';


class Main extends Component {
  //state inclues articles where the results from NYTsearch are stored.
  //query is the simple search term ex. Economy
  //begDate and endDate are optional
  state = {
     articles: [],
     query: '',
     begDate: '',
     endDate: ''
  };

  getArticles = () => {
    // user can enter a simple query ex. Economy and here we check if user enters
    // begdate or enddate
    let query = `${this.state.query}`;
    if (this.state.begDate) {
      query = `${query}&begin_date=${this.state.begDate}`;
    }
    if (this.state.endDate) {
      query = `${query}&end_date=${this.state.endDate}`;
    }

    console.log(query);
    //contact our API, set state to match results
    API.nytSearch(query)
       .then(res => {
          console.log(res);
          this.setState({
             articles: res.data.response.docs,
             query:'',
             begDate:'',
             endDate:''
          });
       })
       .catch(err => {
          console.log(err);
       })
     
  };

 
  saveArticle = articleInfo => {
   //here when the user selects an article to save it is saved into our database
   // by contacting our API 
    API.saveArticle(articleInfo)
     .then(res => {
       console.log("successful save")
     })
     .catch(err => {
      console.log(err);
     })
  }

  // standard input change 
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  //standard submit
  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.query) {
      this.getArticles();
    }
  };

  render() {
    return (
        <div>
        <Row>
           <Col size ="md-12">
              <Jumbotron>
                 <h1 style={{textAlign: "center"}}> Search for a topic. </h1>
              </Jumbotron>
              <form>
                  <Input
                    value={this.state.query}
                    onChange={this.handleInputChange}
                    name="query"
                    placeholder="Topic (required)"
                  />
                  <Input
                    value={this.state.begDate} 
                    onChange={this.handleInputChange}
                    name="begDate"
                    placeholder="Begin Date (Optional - in YYYYMMDD)"
                  />
                  <Input
                    value={this.state.endDate} 
                    onChange={this.handleInputChange}
                    name="endDate"
                    placeholder="End Date (Optional - in YYYYMMDD)"
                  />
                  <FormBtn disabled={!this.state.query} onClick={this.handleFormSubmit}>
                      Submit Search  
                  </FormBtn>
                </form>
           </Col> 
        </Row> 
        <Row>  
           <Col size ="md-12">
              <Jumbotron>
                 <h1 style={{textAlign: "center"}}> Article Results </h1>
              </Jumbotron> 
              {this.state.articles.length ? (

                 <List>
                   {this.state.articles.map(article => (
                     <ListItem key={article._id}>
                       <a href={article.web_url} target="_blank">
                          <strong>{article.headline.main}</strong>
                       </a>
                       <br/>
                       <span> Published on {article.pub_date} </span>   
                       <button 
                         className="btn btn-primary" 
                         style={{float: "right"}}
                         onClick={() => this.saveArticle({
                           title:article.headline.main,
                           url: article.web_url,
                           date:article.pub_date
                         })}> Save Article
                       </button>
                     </ListItem>    
                    ))}
                 </List>

              ) : (
                 <h3 style={{textAlign: "center"}}>
                  No Results to Display
                 </h3>
              )}  
           </Col>
        </Row>   
        </div>
    );
  }
}

export default Main;
