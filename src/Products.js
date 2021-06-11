import React, { useContext, useEffect, useState } from 'react';
import {Context} from './App';

function Products() {
    const {dataStatus, sortStatus, searchStatus, setCartNumber, itemsIds, setItemsIds} = useContext(Context);
    const [productsHtml, setProductsHtml] = useState('');

    const [itemId, setItemId] = useState();
    

    let data = [];

    const sort = function(direction) {
        data = JSON.parse(localStorage.getItem('data'));
        data.sort((a, b) => +a.price - +b.price);
        
        if(direction == 'desc') data.reverse();

        show()

    }
    
    const search = function(query) {
        data = JSON.parse(localStorage.getItem('data'));
        data = data.filter(item => {
            if(item.title.indexOf(query) != -1) return item
        })

        show()
    }

    const addToCart = function(e) {
        setItemId(e.target.closest('li').id)
        itemsIds.push(e.target.closest('li').id)
    }

    const show = function() {
        if(data.length == 0) data = JSON.parse(localStorage.getItem('data'));
        let list = data.map((item, index) => {
            return (
                <li id={index + 1} key={index} className="list_item">
                    <img src={item.image}></img>
                    <div className="list_item_info">
                        <p className="info_title">{item.title}</p>
                        <p className="info_category">{item.category}</p>
                        <p className="info_price">${item.price}</p>
                        <button onClick={addToCart} className="info_add_btn">+</button>
                    </div>
                </li>
            )
        })

        setProductsHtml(list)

    }

    useEffect(_ => {
        if(dataStatus) {
            show()
        }

        if(sortStatus != '') sort(sortStatus);

        if(searchStatus != '') {
            search(searchStatus)
        } else if(dataStatus) {
            show()
        }
        
        setCartNumber(itemsIds.length);

    }, [dataStatus, sortStatus, searchStatus, itemId]);

    const saveItemsToCookie = function() {
        document.cookie = `data=${itemsIds}`
    }

    saveItemsToCookie()

    return (
        <ul className="list">
            {productsHtml}
        </ul>
    )
}

export default Products;