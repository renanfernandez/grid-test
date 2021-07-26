import React, {useState} from 'react';
import './App.css';

import { useDispatch } from 'react-redux';

import { SEARCH } from './store/table';

import Table from './components/Table';

function App() {  
  const dispatch = useDispatch()
  const [searchQuery, setSearchQuery] = useState('')

  const search = (event) => {
    setSearchQuery(event.target.value)
  }

  const submitSearch = (e) => {
    e.preventDefault();
    dispatch({type: SEARCH, query: searchQuery})
  }

  return (
    <main className="content">
      <h2 className="title">Table</h2>

      <form className="tableSearchForm">
        <input type="text" className="tableSeach" onChange={search} />
        <button className="tableSeach--btn" onClick={submitSearch}>Search</button>
      </form>

      <Table />
    </main>
  );
}

export default App;