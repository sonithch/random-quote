import React from "react";

const API_URL =
  "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";

class QuoteBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: null,
      author: null,
      error: null
    };
  }

  getNewQuote = () => {
    fetch(API_URL, { cache: "no-store" })
      .then(response => response.json())
      .then(data => {
        this.setState({ text: data[0].content, author: data[0].title });
      })
      .catch(error => this.setState({ error }));
  };

  componentDidMount() {
    this.getNewQuote();
  }

  render() {
    return (
      <div id="quote-box">
        <div id="text" dangerouslySetInnerHTML={{ __html: this.state.text }} />
        <div
          id="author"
          dangerouslySetInnerHTML={{ __html: this.state.author }}
        />
        <button onClick={this.getNewQuote}>
          <img src="../assets/reload.png" alt="" />
        </button>
      </div>
    );
  }
}

export default QuoteBox;
