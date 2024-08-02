import { useCreateMyRestaurant, useGetMyRestaurant, useUpdateMyRestaurant } from '@/api/MyRestaurantApi'

import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";
import React from 'react'

const ManageRestaurantPage = () => {
  const {createRestaurant,isLoading:isCreateLoading}=useCreateMyRestaurant()
  const {restaurant}=useGetMyRestaurant()
  const {updateRestaurant,isLoading:isUpdateLoading}=useUpdateMyRestaurant()
  const isEditing=!!restaurant;
  // This line checks if the `restaurant` variable is truthy (i.e., not null or undefined) and assigns the result to `isEditing`. 
  // This is a shorthand way to determine if the restaurant data is available for editing.
  return (
    <div>
      <ManageRestaurantForm  restaurant={restaurant} onSave={isEditing ?updateRestaurant:createRestaurant} isLoading={isCreateLoading || isUpdateLoading} />
    </div>
  )
}

export default ManageRestaurantPage
