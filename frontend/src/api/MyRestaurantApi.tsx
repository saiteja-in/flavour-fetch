import { useAuth0 } from "@auth0/auth0-react";
import { Restaurant } from "@/types";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyRestaurant = () => {
    const { getAccessTokenSilently } = useAuth0();
  
    const getMyRestaurantRequest = async (): Promise<Restaurant> => {
      const accessToken = await getAccessTokenSilently();
  
      const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to get restaurant");
      }
      return response.json();
    };
  
    const { data: restaurant, isLoading } = useQuery(
      "fetchMyRestaurant",
      getMyRestaurantRequest
    );
  
    return { restaurant, isLoading };
  };

export const useCreateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createMyRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantFormData,
    });
    const responseData = await response.json(); // Await the response.json()

    console.log(responseData.message);
    if (!response.ok) {
      throw new Error(
        "Failed to create restaurant(User restaurant already exists)"
      );
    }

    return responseData;
  };

  const {
    mutate: createRestaurant,
    isLoading,
    isSuccess,
    error,
  } = useMutation(createMyRestaurantRequest);

  if (isSuccess) {
    toast.success("Restaurant created!");
  }

  if (error) {
    toast.error((error as Error).message); // Type assertion to Error
  }

  return { createRestaurant, isLoading };
};
