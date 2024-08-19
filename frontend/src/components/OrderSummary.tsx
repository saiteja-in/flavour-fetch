import { CartItem } from "@/pages/DetailPage";
import { Restaurant } from "@/types";
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";

type Props = {
  restaurant: Restaurant;
  cartItems: CartItem[];
};
const OrderSummary = ({ restaurant, cartItems }: Props) => {
  const getTotalCost = () => {
    const totalrupees = (cartItems || []).reduce(
      (total, cartItem) =>
        total + (cartItem?.price || 0) * (cartItem?.quantity || 0),
      0
    );
    const totalWithDelivery = totalrupees + (restaurant?.deliveryPrice || 0);
    return totalWithDelivery;
  };

  return (
    <>
      <CardHeader>
        <CardTitle className="flex text-2xl font-bold tracking-tight justify-between">
          <span>Your Order</span>
          <span>₹{getTotalCost()}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        {cartItems?.map((item, index) => (
          <div key={index} className="flex justify-between">
            <span>
              <Badge variant="outline" className="mr-2">
                {item.quantity}
              </Badge>
              {item.name}
            </span>
            <span className="flex items.center gap-1">
              ₹{item.price * item.quantity}
            </span>
          </div>
        ))}
        <Separator />
        <div className="flex justify-between">
          <span>Delivery</span>
          <span>₹{restaurant.deliveryPrice}</span>
        </div>
        <Separator />
      </CardContent>
    </>
  );
};

export default OrderSummary;
