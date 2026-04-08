import SearchBar from "../SearchBar/SearchBar";

export default function App() {
  const handleSearch = (query: string) => {
    console.log("Search", query);
  };

  return <SearchBar onSubmit={handleSearch} />;
}
