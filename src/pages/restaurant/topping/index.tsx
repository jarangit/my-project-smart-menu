/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/ban-types */
import Column from "@ui-center/molecules/column";
import Row from "@ui-center/molecules/row";
import Button from "@ui-cms/atoms/button";
import Text from "@ui-cms/atoms/text";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setShowLoading } from "~/app-state/redux/features/ui-state.slice";
import { api } from "~/utils/api";
import withAuth from "~/utils/withAuth";

type Props = {};
const mockImage =
  "https://smart-menu-web-storage.s3.ap-southeast-1.amazonaws.com/coffee-drink-with-lots-whipped-cream.jpg";
const ToppingPage = (props: Props) => {
  const dispatch = useDispatch();
  const { data: sessionData } = useSession();
  const { data: restaurantData, isLoading: loadingRestaurant } =
    api.restaurant.getOne.useQuery({ id: sessionData?.user.id as "" });

  const {
    data: dataToppingApi,
    isLoading: loadingDataTopping,
    refetch: refetchDataTopping,
  } = api.topping.getAllByRestaurantId.useQuery({
    id: restaurantData?.id as "",
  });

  const { mutateAsync: createToppingApi, isLoading: loadingCreateTopping } =
    api.topping.create.useMutation({
      onSuccess: async () => {
        await refetchDataTopping();
        return;
      },
    });

  const { mutateAsync: deleteTopping, isLoading: loadingDeleteTopping } =
    api.topping.delete.useMutation({
      onSuccess: async () => {
        await refetchDataTopping();
        return;
      },
    });

  console.log(
    "%cMyProject%cline:39%cdataToppingApi",
    "color:#fff;background:#ee6f57;padding:3px;border-radius:2px",
    "color:#fff;background:#1f3c88;padding:3px;border-radius:2px",
    "color:#fff;background:rgb(20, 68, 106);padding:3px;border-radius:2px",
    dataToppingApi,
  );

  const { mutate: updateToppingApi, isLoading: loadingUpdateTopping } =
    api.topping.update.useMutation({
      onSuccess: async () => {
        await refetchDataTopping();
        return;
      },
    });

  useEffect(() => {
    dispatch(
      setShowLoading(
        loadingCreateTopping ||
          loadingDataTopping ||
          loadingDeleteTopping ||
          loadingUpdateTopping ||
          loadingRestaurant,
      ),
    );
    return;
  }, [
    loadingRestaurant,
    loadingCreateTopping,
    loadingDataTopping,
    loadingDeleteTopping,
    loadingUpdateTopping,
  ]);

  return (
    <div>
      <Text value={"Toppings"} />

      <Column>
        <Button
          onClick={() =>
            createToppingApi({
              name: "Whipped Cream",
              imageUrl: mockImage,
              price: 5,
            })
          }
        >
          Create
        </Button>

        <Row gap={4}>
          {dataToppingApi?.length
            ? dataToppingApi.map((item, key) => (
                <div key={key}>
                  <Column gap={1}>
                    <Link href={`/restaurant/category/${item.id}`}>
                      <Text value={`${item.name} (${item.menus.length})`} />
                    </Link>
                    <Button
                      onClick={() =>
                        updateToppingApi({
                          id: item.id,
                          name: "name cat updated",
                          imageUrl: mockImage,
                          price: item.price,
                        })
                      }
                    >
                      Update
                    </Button>
                    <Button onClick={() => deleteTopping({ id: item.id })}>
                      Delete
                    </Button>
                  </Column>
                </div>
              ))
            : ""}
        </Row>
      </Column>
    </div>
  );
};

export default withAuth(ToppingPage);
