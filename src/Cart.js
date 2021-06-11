import React, {useState, useEffect, useContext} from 'react';
import {Context} from './App';

function Cart() {
    const {setCartNumber, itemsIds, setItemsIds, cartNumber} = useContext(Context);

    let items = JSON.parse(localStorage.getItem('data'));

    const count = (id) => {
        let count = 0;

        itemsIds.forEach(item => {
            if(+item == +id) count++
        })

        return count
    }

    const itemUp = (e) => {   
       let id = e.target.closest('li').id;
       let items = itemsIds;
       items.push(id);

       document.cookie = `data=${items.join()}`;
       setItemsIds(items);
       setCartNumber(items.length)
       setList(listHtml())
    }

    const itemDown = (e) => {
        removeItem(e);
    }

    const removeItem = function(e) {
        let items = itemsIds;
        console.log(items)
        let id = e.target.closest('li').id;
        let index = items.indexOf(id);
        if(index != -1) items.splice(index, 1);
        setItemsIds(items);
        setCartNumber(items.length)
        setList(listHtml())
    }

    const listHtml = function() {
        let cartItems = [];

        cartItems = items.filter((item) => {
            return itemsIds.indexOf(String(item.id)) != -1 ? item : false
        })

        let html = cartItems.map((item, index) => {
            let quantity = count(item.id) || 0;

            return (
                <li id={item.id} key={index} className="item">
                    <img src={item.image} className="cart_img"></img>
                        <div className="list_item_info">
                            <p className="info_title">{item.title}</p>
                            <p className="info_category">{item.category}</p>
                            <p className="info_price">${item.price * quantity}</p>
                        </div>
                        <div className="quantity">
                            <div className="quantity_field">{quantity}</div>
                            <button onClick={itemUp} className="plus">+</button>
                            <button onClick={itemDown} className="minus">-</button>
                        </div>
                        <button onClick={removeItem} className="item_remove">Remove from cart</button>
                </li>
            )
        })

        return html
    }

    const [cartState, setCartState] = useState(false);
    const [list, setList] = useState(() => listHtml());

    useEffect(() => {
        if(list.length > 0) {
            setCartState(true)
        } else {
            setCartState(false)
        }

        console.log(itemsIds)

        if(itemsIds && itemsIds.length > 0) {
            document.cookie = `data=${itemsIds.join()}`;
        } else {
            document.cookie = 'data=';
        }


    }, [list, itemsIds])
    
    return (
        <div className="cart">
            <h1 className="cart_header">Cart {cartState ? 'products are displayed below' : 'is empty'}</h1>
            <ul className="items_list">
                {list}
            </ul>
        </div>
    )
}

export default Cart;




