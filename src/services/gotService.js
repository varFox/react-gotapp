
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
    const page = 14;
    const res = await this.getResource(`/characters?page=${page}&pageSize=10`);
    for (let key in res) {
      res[key]['id'] = ((page - 1) * 10 + (+key) + 1);
    }
    
    return res.map(this._transformCharacrer);
  }

  getCharacter = async (id) => {
    const res = await this.getResource(`/characters/${id}`);
    res['id'] = id;
    
    return this._transformCharacrer(res);
  } 

  getAllHouses = async () => {
    const res = await this.getResource(`/houses`);
    for (let key in res) {
      res[key]['id'] = +key + 1;
    }
    return res.map(this._transformHouse);
  }

  getHouse = async (id) => {
    const res = await this.getResource(`/houses/${id}`);
    res['id'] = id;
    return this._transformHouse(res);
  }

  getAllBooks = async () => {
    const res = await this.getResource(`/books`);
    for (let key in res) {
      res[key]['id'] = +key + 1;
    }
    
    return res.map(this._transformBook);
  }
  
  getBook = async (id) => {
    const res = await this.getResource(`/books/${id}`);
    res['id'] = id;
    
    return this._transformBook(res);
  } 

  _transformCharacrer = (char) => {
    
		for (let key in char) {
			if (char[key] === '') char[key] = 'нет данных';
		}	
    return {
      id: char.id,
      name: char.name,
      gender: char.gender,
      born: char.born,
      died: char.died,
      culture: char.culture
    }
  }
  _transformHouse = (house) => {
    
		for (let key in house) {
      if (house[key] == 0) house[key] = 'нет данных';
    }	
    
    return {
      id: house.id,
      name: house.name,
      region: house.region,
      words: house.words,
      titles: house.titles,
      overlord: house.overlord,
      ancestralWeapons: house.ancestralWeapons
    }
  }

  _transformBook = (book) => {

		for (let key in book) {
      if (book[key] === '') book[key] = 'нет данных';
      
		}	
    return {
      id: book.id,
      name: book.name,
      numberOfPages: book.numberOfPages,
      publisher: book.publisher,
      released: book.released
    }
  }
}
