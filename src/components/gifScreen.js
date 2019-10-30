import React from 'react';
import ReactDOM from 'react-dom';

class GifScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      gif: null,
      search: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      search: event.target.value
    });
  }

  render() {
    let getRandomGif = () => {
      fetch("http://localhost:8080/v1/gifs/random")
        .then(res => res.json())
        .then(
          (result) => {
            let resultObject = JSON.parse(result.data);
            console.log(resultObject);
            this.setState({
              isLoaded: true,
              gif: resultObject.data.gif.url
            });
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    }

    let searchGif = () => {
      let url = "http://localhost:8080/v1/gifs/search";
      if (this.state.search) {
        url += "?value=" + this.state.search;
      }
      let encodedUrl = encodeURI(url);
      fetch(encodedUrl)
        .then(res => res.json())
        .then(
          (result) => {
            let resultObject = JSON.parse(result.data);
            console.log(resultObject);
            this.setState({
              isLoaded: true,
              gif: resultObject.data.gif.url
            });
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    }

    return (
        <div className="app-container">
          <div className="search-panel">
            <div>
              <h2>Find a GIF:</h2>
              <p>Try "run", "sing" or "dance"</p>
              <input type="text" className="search-box"
                value={this.state.search} onChange={this.handleChange}
              />
              <button className="go-button" onClick={searchGif}>Search Now</button>
            </div>
            <div>
              <h2>Random GIF:</h2>
              <button className="go-button" onClick={getRandomGif}>Show a random GIF</button>
            </div>
          </div>
          <div className="results-panel">
            <img src={this.state.gif} style={{width: 300, height: 200}} />
            {this.state.items}
          </div>
        </div>
    );
  }
}

export default GifScreen;
