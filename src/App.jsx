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

  // previuos and next page buttons
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
      <header>
        <h1><span>NASA</span> 🚀 Image Library</h1>
        <button className="go-up-btn" onClick={toTop}>⬆️ </button>

        <form onSubmit={handleSubmit} method="get">
          <button className="page-btn" title="previous page" type="button" onClick={handlePreviousPage}>&lt;</button>
          <input id="input-field" type="text" value={querry} name="q" onChange={handleChange} placeholder="Search..."/>
          <button className="clear-btn" title="clear" type="button" onClick={() => { setQuerry(''); document.getElementById("input-field").focus(); }}>&#x274C;</button>
          <button className="search-btn" title="search" type="submit">🔍</button>
          <button className="page-btn" title="next page" type="button" onClick={handleNextPage}>&gt;</button>
        </form>
      </header>

      <main>
        <div className="list">
          {list !== null && list.length !== 0 ? list : (<p>No images</p>)}
        </div>
      </main>
      <footer>
        <p>NASA unofficial Image Library built using the official api</p>
        <div className="footer-links">
          <a href="https://images.nasa.gov/">Oficial Site</a>
          <a href="https://images.nasa.gov/docs/images.nasa.gov_api_docs.pdf">API DOCS</a>
          <a href="https://github.com/victor247k/NasaImageGallery">GitHub Repository</a>
        </div>
      </footer>
    </>
  )
}

export default App;
