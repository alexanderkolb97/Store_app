import React, {useState, useEffect} from 'react';
import Header from './Header';
import Title from './Title';
import Catalog from './Catalog';
import Cart from './Cart';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export const Context = React.createContext();

function App() {
  const [dataStatus, setDataStatus] = useState(false);
  const [sortStatus, setSortstatus] = useState('');
  const [searchStatus, setSearchstatus] = useState('');
  const [cartNumber, setCartNumber] = useState(0);
  const [itemsIds, setItemsIds] = useState(getCookie('data') ? getCookie('data').split(',') : []);

  function getCookie(data) {
        let itemsIds = document.cookie.match(new RegExp(
          "(?:^|; )" + data.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
       
        return itemsIds ? decodeURIComponent(itemsIds[1]) : undefined;
  }

  const getData = function() {
    if(localStorage.getItem('data')) {
      if(!dataStatus) setDataStatus(true);

      return
    };

    fetch('https://fakestoreapi.com/products')
    .then(response => {
      return response.text()
    })
    .then(data => {
      localStorage.setItem('data', data);
      setDataStatus(true);
    })
    
  }

  getData()

  return (
    <React.Fragment>
      <Context.Provider value={{dataStatus, sortStatus, setSortstatus, searchStatus, setSearchstatus, cartNumber, setCartNumber, itemsIds, setItemsIds}}>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Catalog}></Route>
        </Switch>
          <Switch>
            <Route path="/cart" component={Cart}></Route>
          </Switch>
      </Router>
      </Context.Provider>
    </React.Fragment>
  );
}

export default App;
