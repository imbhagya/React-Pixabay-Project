import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("nature"); // default keyword
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchImages = () => {
    fetch(
      `https://pixabay.com/api/?key=48565259-2e951181a670b1e402372e661&q=${query}&image_type=photo&per_page=20&page=${page}`
    )
      .then((res) => res.json())
      .then((d) => {
        setData(d.hits);
        setTotalPages(Math.ceil(d.totalHits / 20));
      })
      .catch((err) => console.log("Error fetching images:", err));
  };

  useEffect(() => {
    fetchImages();
  }, [query, page]);

  const handleSearch = () => {
    if (search.trim() !== "") {
      setPage(1);
      setQuery(search);
    }
  };

  return (
    <div className="app">
      <h1>Image Search</h1>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search images..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="gallery">
        {data.length > 0 ? (
          data.map((item) => (
            <div className="image-card" key={item.id}>
              <img src={item.webformatURL} alt={item.tags} />
            </div>
          ))
        ) : (
          <div className="image-card">
            <img
              src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"
              alt="Default"
            />
          </div>
        )}
      </div>

      {data.length > 0 && (
        <div className="pagination">
          <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button onClick={() => setPage((p) => (p < totalPages ? p + 1 : p))} disabled={page === totalPages}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
