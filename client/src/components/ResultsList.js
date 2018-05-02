import React from "react";
import ArticlesListed from "./ArticlesListed";

const ResultsList = (props) => (
  <ul className="list-group">
    {props.articles.length > 0 ? props.articles.map((article, index) =>
      <ArticlesListed
        article={article}
        key={article._id || index}
        handleSaveArticle={props.handleSaveArticle}
        handleDeleteSavedArticle={props.handleDeleteSavedArticle} />)
      :
      props.loading ? <h3>Loading Articles...</h3> :
        <h3>No Articles Found. Try searching for something.</h3>
    }
  </ul>
);

export default ResultsList;