import { useCreateMyRestaurant } from '@/api/MyRestaurantApi'

import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";
import React from 'react'

const ManageRestaurantPage = () => {
  const {createRestaurant,isLoading}=useCreateMyRestaurant()
  return (
    <div>
      <ManageRestaurantForm onSave={createRestaurant} isLoading={isLoading} />
    </div>
  )
}

export default ManageRestaurantPage
