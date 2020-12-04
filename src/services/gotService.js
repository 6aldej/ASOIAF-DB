export default class gotService {
    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api';
    }

    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);
    
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    };

    getAllCharacters = async (pag = 5) => {
        let page = pag;
        const res = await this.getResource(`/characters?page=${page}&pageSize=10`);
        return res.map(this._transformCharacter);
    }

    getCharacter = async (id) => {
        const character = await this.getResource(`/characters/${id}`);
        return this._transformCharacter(character);
    }

    getCharacterByName = async (name) => {
        const character = await this.getResource(`/characters/?name=` + name);
        return character.map(this._transformCharacter);
    }

    getAllHouses = async (page = 1) => {
        const res = await this.getResource(`/houses?page=${page}&pageSize=10/`);
        return res.map(this._transformHouse);
    }

    getHouse = async (id) => {
        const house = await this.getResource(`/houses/${id}/`);
        return this._transformHouse(house);
    }

    getAllBooks = async (page = 1) => {
        const res = await this.getResource(`/books?page=${page}&pageSize=10/`);
        return res.map(this._transformBook);
    }

    getBook = async (id) => {
        const book = await this.getResource(`/books/${id}/`);
        return this._transformBook(book);
    }

    prevPage = async () => {
        let page = 5;
        let nextpage = page++;
        this.getAllCharacters(nextpage)
    }

    isSet(data) {
        if (typeof data === 'object') {
            const newData = data.map(item => {
                if (item) {
                    return item
                } else {
                    return 'unknown'
                }
            })
            return newData
        } else {
                if (data) {
                    return data
                } else {
                    return 'unknown'
                }
            }
    }

    _extractId = (item) => {
        const idRegExp = /\/([0-9]*)$/;
        return item.url.match(idRegExp)[1];
    }

    _transformCharacter = (char) => {
        return {
            id: this._extractId(char),
            name: this.isSet(char.name),
            gender: this.isSet(char.gender),
            born: this.isSet(char.born),
            died: this.isSet(char.died),
            culture: this.isSet(char.culture)
        }
    }

    _transformHouse = (house) => {
        return {
            id: this._extractId(house),
            name: this.isSet(house.name),
            region: this.isSet(house.region),
            words: this.isSet(house.words),
            titles: this.isSet(house.titles),
            ancestralWeapons: this.isSet(house.ancestralWeapons)
        };
    }

    _transformBook = (book) => {
        return {
            id: this._extractId(book),
            name: this.isSet(book.name),
            numberOfPages: this.isSet(book.numberOfPages),
            released: this.isSet(book.released)
        }
    }
}