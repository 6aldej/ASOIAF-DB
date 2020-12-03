import React, {useState, useEffect} from 'react';
import './itemList.css';
import Spinner from '../spinner';

function ItemList ({getData, getName, onItemSelected, onNextPage, onPrevPage, renderItem, page, search, term}) {
    
    const [itemList, updateList] = useState([]);

    useEffect(() => {
        console.log('PAGE', page)
        updateList(null)
        if (!search) {
            getData(page)
                .then( (data) => {updateList(data)})
        } else {
            getName(term)
                .then( (data) => {updateList(data)})
        }
        
    }, [page, search])

    function renderItems(arr) {
        if (!arr) {
            return arr
        }
        return arr.map((item) => {
            const {id} = item;
            const label = renderItem(item);
            return (
                <li 
                    key={id}
                    className="list-group-item"
                    onClick={() => onItemSelected(id)}
                    >
                    {label}
                </li>
            )
        })
    }

    const spinner = (<Spinner/>)
    const items = renderItems(itemList);

    const pagination = (
        <div className="pagination">
            <button onClick={onPrevPage}>PrevPage</button>
            <span>{page}</span>
            <button onClick={onNextPage}>NextPage</button>
        </div>
    )

    return (
        <div>
            <ul className="item-list list-group">
                {itemList ? items : spinner}
            </ul>
            {search ? null : pagination}
        </div>
    );
}

export default ItemList;