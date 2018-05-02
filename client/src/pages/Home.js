import React, { Component } from "react";
import Header from "../components/Header.js";
import SearchPage from "./SearchPage.js";
import ResultsPage from "./ResultsPage";
import API from "../utils/API.js";

class Home extends Component {
  state = {
    search: {
      topic: "",
      start_date: "",
      end_date: ""
    },
    articles: [],
    savedArticles: [],
    error: "",
    success: ""
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      search: {
        ...this.state.search,
        [name]: value

      }
    });
  }

  handleOnSubmit = (e) => {
    e.preventDefault();
    this.setState({ error: "" });

    if (
      this.state.search.topic !== "" && this.state.search.start_date !== "" && this.state.search.end_date !== ""
    ) {
      API.getNytArticles(this.state.search).then(res => this.setState({
        articles: res.data,
        success: "Artciles Successfully Added Below!"
      }));
    } else {
      this.setState({ error: `Error, Make sure you have entered the dates are in the correct YYYYMMDD format!` });
    }


  }

  handleSaveArticle = (article) => {
    this.setState({ error: "" });
    API.saveArticle(article).then(res => {
      if (!res.data.error) {
        this.setState({
          savedArticles: [...this.state.savedArticles, res.data],
          error: "",
          success: "Article Successfully Saved!"
        });
      } else {
        this.setState({ error: res.data.error });
      }
    });
  }

  handleDeleteSavedArticle = (id) => {
    API.deleteSavedArticle(id).then(res => {
      if (res.data.success) {
        this.setState({
          savedArticles: this.state.savedArticles.filter(article => article._id !== id),
          success: "Successfully Deleted Article!"
        });
      } else {
        this.setState({ error: res.data.error, success: "" })
      }
    });
  }


  render() {
    return (
      <div>

        <Header />
        <div className="container text-center">
          <SearchPage handleInputChange={this.handleInputChange} handleOnSubmit={this.handleOnSubmit} />

          {this.state.error ? <h1 className="alert alert-danger">{this.state.error}</h1> : false}
          {this.state.success ? <h1 className="alert alert-success">{this.state.success}</h1> : false}

          <ResultsPage articles={this.state.articles} handleSaveArticle={this.handleSaveArticle} />

        </div>
      </div>
    );
  }
}

export default Home;