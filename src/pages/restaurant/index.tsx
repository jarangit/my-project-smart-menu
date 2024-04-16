import RestaurantTemplate from "@ui-cms/templates/restaurant/restaurant-template";
import React from "react";
import withAuth from "~/utils/withAuth";

const RestaurantPage = () => {
  return (
    <div>
      <RestaurantTemplate />
    </div>
  );
};

export default withAuth(RestaurantPage);
