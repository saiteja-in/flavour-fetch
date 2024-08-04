import { useSearchRestaurants } from '@/api/RestaurantApi'
import React from 'react'
import { useParams } from 'react-router-dom'

const SearchPage = () => {
    const {city}=useParams()
    const {results}=useSearchRestaurants(city)
  return (
    <span>user searched for {results?.data.map(restaurant => restaurant.restaurantName).join(', ')}</span>
  )
}

export default SearchPage
