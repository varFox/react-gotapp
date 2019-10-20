
export default class GotService {
  _apiBase = 'https://anapioficeandfire.com/api';

  getResource = async (url) => {
    const res = await fetch(`${this._apiBase}${url}`);

    if(!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
      // return res.status;
    }
    return await res.json();
  }

  getAllCharacters = async () => {
    const res = await this.getResource(`/characters?page=5&pageSize=10`);
    return res.map(this._transformCharacrer);
  }

  getCharacter = async (id) => {
    const character = await this.getResource(`/characters/${id}`);
    console.log(this._transformCharacrer(character));
    return this._transformCharacrer(character);
  } 

  getAllHouses = () => {
    return this.getResource(`/houses`);
  }

  getHouse = (id) => {
    return this.getResource(`/houses/${id}`);
  }

  getAllBooks = () => {
    return this.getResource(`/books`);
  }
  
  getBook = (id) => {
    return this.getResource(`/books/${id}`);
  } 

  _transformCharacrer = (char) => {
    return {
      name: char.name,
      gender: char.gender,
      born: char.born,
      died: char.died,
      culture: char.culture
    }
  }
  _transformHouse = (house) => {
    return {
      name: house.name,
      region: house.region,
      worlds: house.worlds,
      titles: house.titles,
      overlord: house.overlord,
      ancestralWeapons: house.ancestralWeapons
    }
  }

  _transformBook = (book) => {
    return {
      name: book.name,
      numberOfPages: book.numberOfPages,
      publiser: book.publiser,
      released: book.released
    }
  }
}
