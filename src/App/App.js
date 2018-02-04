import React, { Component } from 'react';
import CardContainer from '../CardContainer/CardContainer.js';
import Controls from '../Controls/Controls.js';
import ScrollingText from '../ScollingText/ScrollingText.js';
import './App.css';
import {
  getPeopleDetails,
  getPlanetDetails,
  getVehicleDetails,
  getFilmDetails
} from '../apiHelper.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      category: null,
      people: [],
      planets: [],
      vehicles: [],
      filmData: [],
      favorites: [],
      active: ''
    };
  }

  async componentDidMount () {
    // const filmData = await getFilmDetails(`https://swapi.co/api/films`);
    // this.setState({filmData}, () => {
    //   console.log(this.state.filmData);
    // });
  }

  getButtonClass = (category) => {
    this.setState({category}, () => {
      const {category} = this.state;
      
      !localStorage[category] ? 
        this.getCorrectApi() : this.getFromLocalStorage();
    }); 
  }

  async getCorrectApi() {
    let data;
    const {category} = this.state;
    
    if (category === 'people') {
      data = await getPeopleDetails(`https://swapi.co/api/people`);
    } else if (category === 'planets') {
      data = await getPlanetDetails(`https://swapi.co/api/planets`);
    } else if (category === 'vehicles') {
      data = await getVehicleDetails(`https://swapi.co/api/vehicles`);
    } else {
      data = this.state.favorites;
    }

    this.setState({[category]: data}, () => {
      localStorage.setItem([category], JSON.stringify(data));
    });
  }
  
  getFromLocalStorage = () => {
    const {category} = this.state;
    let data = localStorage.getItem(category);
    
    data = [... JSON.parse(data)];
    this.setState({ [category]: data });
  } 

  favoriteCard = (card, dataObj) => {
    // const category = this.state[this.state.category];

    // // const match = this.state.favorites.filter( card => );
    // const favorites = [...this.state.favorites, match];
    
    // this.setState({favorites}, () => {
    //   card.classList.toggle('favorite');
    //   localStorage.setItem('favorites', JSON.stringify(this.state.favorites));
    // });
  }

  render() {
    const {category} = this.state;

    return (
      <div className="App">
        <header></header>
        <Controls 
          getButtonClass={this.getButtonClass}
          favorites={this.state.favorites} />

        {
          !category && this.state.filmData.length &&
          <ScrollingText filmData={this.state.filmData} />
        }
     

        {
          category &&
          <CardContainer 
            data={this.state[category]}
            favoriteCard={this.favoriteCard} />
        }

      </div>
    );
  }
}

export default App;
