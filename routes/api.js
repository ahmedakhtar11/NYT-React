const request = require("request");
const filterObj = require("filter-object");
const Articles = require("../models/articles");

module.exports = (app) => {
    app.post("/api/nytsearch", (req, res) => {
        request.get({
            url: "https://api.nytimes.com/svc/search/v2/articlesearch.json",
            qs: {
              "api-key": "02c5bdd2f862477baa6c29cffd68c563",
              "q": req.body.topic,
              "begin_date": req.body.start_date,
              "end_date": req.body.end_date,
              "sort": "newest"
            },
          },(err, response, body) =>  {
            body = JSON.parse(body);            
            const validKeys = [ "web_url", "snippet", "pub_date"];
            const filteredResults = body.response.docs.map( doc => filterObj(doc, validKeys));
            res.json(filteredResults);
          });
    });

    app.get("/api/articles", (req, res) => {
        Articles.find().then(articles => res.json(articles));
    });

    app.post("/api/articles", (req, res) => {
        const newArticle = {
            title: req.body.snippet,
            url: req.body.web_url,
            date: req.body.pub_date
        }
        Articles.create(newArticle)
            .then(results => res.json(results))
            .catch(err => {
                console.log(err);
                return res.send({ error: "Article Sucessfully Saved!" }).end();
            });
    });

    app.delete("/api/articles/:id", (req, res) => {
        Articles.deleteOne({ _id: req.params.id })
            .then( results => res.send({ success: `Article ${req.params.id} Successfully Deleted!` , results: results}))
            .catch(err => {
                console.log(err);
                return res.send({ error: "Sorry, Couldn't Delete that article."}).end();
            });
    });
};