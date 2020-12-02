import React, {useState, useEffect} from 'react';
import './itemList.css';
import Spinner from '../spinner';

function ItemList ({getData, onItemSelected, onNextPage, onPrevPage, renderItem, page}) {
    
    const [itemList, updateList] = useState([]);

    useEffect(() => {
        console.log('PAGE', page)
        getData(page)
            .then( (data) => {
                updateList(data)
            })
    }, [page])

    function renderItems(arr) {
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

    if (!itemList) {
        return <Spinner/>
    }

    const items = renderItems(itemList);

    return (
        <div>
            <ul className="item-list list-group">
                {items}
            </ul>
            <div className="pagination">
                <button onClick={onPrevPage}>PrevPage</button>
                <span>{page}</span>
                <button onClick={onNextPage}>NextPage</button>
            </div>
        </div>
    );
}

export default ItemList;