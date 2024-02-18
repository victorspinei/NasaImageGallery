import { useState, useEffect } from "react";
import Item from "./components/Item";
import axios from "axios";
import "./App.css"

function App() {
  const [querry, setQuerry] = useState('');
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [list, setList] = useState(null);

  // sumbmitting the form
  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    const apiUrl = `https://images-api.nasa.gov/search?q=${querry}`
    axios.get(apiUrl).then((res) => {
      setData(res.data.collection.items)
    })
  }

  // previus and next page buttons
  const handleNextPage = () => {
    if (!querry) return
    setPage(p => p + 1);
    const apiUrl = `https://images-api.nasa.gov/search?q=${querry}&page=${page}`
    setList(null)
    axios.get(apiUrl).then((res) => {
      setData(res.data.collection.items)
    })
  }

  const handlePreviousPage= () => {
    if (!querry) return
    setPage(p => Math.max(1, p - 1));
    const apiUrl = `https://images-api.nasa.gov/search?q=${querry}&page=${page}`
    setList(null)
    axios.get(apiUrl).then((res) => {
      setData(res.data.collection.items)
    })
  }

  // for the input field
  const handleChange = (e) => {
    setQuerry(e.target.value)
  } 

  // to the top function for button
  const toTop = () => {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }

  // update the list when requesting new data
  useEffect(() => {
    // if there is data set the list to be equal to some html
    setList(data ? 
      data.map((v, i) => {
      // for some reason the links to video dont work
      if (v.data['0'].media_type !== "image") return;

      return (
        <Item itemData={v} key={i}/>
      )
    }) 
      : null);
    console.log(list)
  }, [data])

  return (
    <>
      <header className="header">
        <h1>NASA 🚀 Image Library</h1>
        <button className="go-up-btn" onClick={toTop}>⬆️ </button>

        <form onSubmit={handleSubmit} method="get">
          <input id="input-field" type="text" value={querry} name="q" onChange={handleChange} placeholder="Search..."/>
          <button type="button" onClick={() => { setQuerry(''); document.getElementById("input-field").focus(); }}>X</button>
          <button type="submit">🔍</button>
          <button type="button" onClick={handlePreviousPage}>Previous Page</button>
          <button type="button" onClick={handleNextPage}>Next Page</button>
        </form>
      </header>

      <main>
        <div className="list">
          {list !== null && list.length !== 0 ? list : (<p>No images</p>)}
        </div>
      </main>
      <footer>
        TODO: add footer
      </footer>
    </>
  )
}

export default App
