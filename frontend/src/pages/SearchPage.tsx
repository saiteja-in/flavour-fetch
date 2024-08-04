import { useSearchRestaurants } from "@/api/RestaurantApi";
import PaginationSelector from "@/components/PaginationSelector";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

export type SearchState = {
  searchQuery: string;
  page:number;
};

const SearchPage = () => {
  const { city } = useParams();
  const [SearchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page:1
  });
  const { results, isLoading } = useSearchRestaurants(SearchState,city);
  if (isLoading) {
    <span>Loading...</span>;
  }
  if (!results?.data || !city) {
    return <span>NO RESULTS FOUND</span>;
  }
  const setSearchQuery = (searchFormData: SearchForm) => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: searchFormData.searchQuery,
      page:1
    }));
  };
  const resetSearch = () => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: "",
      page:1
    }));
  };
  const setPage=(page:number)=>{
    setSearchState((prevState)=>({
        ...prevState,page
    }))
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="cuisines-list">insert cuisines here :)</div>
      <div id="main-content" className="flex flex-col gap-5">
        <SearchBar
        searchQuery={SearchState.searchQuery}
          onSubmit={setSearchQuery}
          placeHolder="Search by Cuisine or Restaurant Name"
          onReset={resetSearch}
        />
        <SearchResultInfo total={results.pagination.total} city={city} />
        {results.data.map((restaurant) => (
          <SearchResultCard restaurant={restaurant} />
        ))}
        <PaginationSelector page={results.pagination.page} pages={results.pagination.pages} onPageChange={setPage} />
      </div>
    </div>
  );
};

export default SearchPage;
