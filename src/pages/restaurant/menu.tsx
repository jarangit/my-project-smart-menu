/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/ban-types */
import Column from "@ui-center/molecules/column";
import Grid from "@ui-center/molecules/grid";
import Row from "@ui-center/molecules/row";
import Button from "@ui-cms/atomics/button";
import Text from "@ui-cms/atomics/text";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setShowLoading } from "~/app-state/redux/features/ui-state.slice";
import { api } from "~/utils/api";
import withAuth from "~/utils/withAuth";

type Props = {};

const MenuPage = (props: Props) => {
  const dispatch = useDispatch()
  const { mutateAsync: mutateCreateMenu, isLoading: loadingCreateMenu } = api.menu.create.useMutation();
  const { data: sessionData } = useSession();
  const {
    data: restaurantData,
    isLoading: loadingRestaurant,
    refetch,
  } = api.restaurant.getOne.useQuery({ id: sessionData?.user.id as "" });
  const { mutateAsync: mutateDeleteMenu, isLoading: loadingDeleteMenu } = api.menu.delete.useMutation();
  const { mutateAsync: mutateUpdateMenu, isLoading: loadingUpdateMenu } = api.menu.update.useMutation();
  const onCreate = async () => {
    const data = {
      name: "Berger 21",
      imageUrl:
        "https://smart-menu-web-storage.s3.ap-southeast-1.amazonaws.com/coffee-drink-with-lots-whipped-cream.jpg",
      price: 99,
      discount: 0,
      isDiscount: false,
      detail: "detail",
      isSell: false,
      isHot: false,
      isNews: false,
      isPromotion: false,
    };
    await mutateCreateMenu(data);
    await refetch();
    return;
  };
  const onUpdate = async (menuId: number) => {
    const data = {
      name: "Berger updated",
      imageUrl:
        "https://smart-menu-web-storage.s3.ap-southeast-1.amazonaws.com/coffee-drink-with-lots-whipped-cream.jpg",
      price: 299,
      discount: 0,
      isDiscount: false,
      detail: "detail",
      isSell: false,
      isHot: false,
      isNews: false,
      isPromotion: false,
    };
    await mutateUpdateMenu({
      id: menuId,
      ...data,
    });
    await refetch();
    return;
  };

  const onDelete = async (menuId: number) => {
    await mutateDeleteMenu({
      menuId: menuId,
    });
    await refetch();
    console.log("deleted menu");
    return;
  };


  useEffect(() => {
    dispatch(setShowLoading(loadingCreateMenu || loadingRestaurant || loadingUpdateMenu || loadingDeleteMenu))
    return
  }, [loadingRestaurant, loadingCreateMenu, loadingUpdateMenu, loadingDeleteMenu])


  return (
    <Column gap={12}>
      <Text value="Your menus" className="text-xl font-bold uppercase" />
      <Column className="">
        <Button onClick={() => onCreate()}>Create menu</Button>
      </Column>
      {restaurantData ? (
        <Grid col={3} className="grid-cols-4" gap={4}>
          {restaurantData && restaurantData?.menus?.length
            ? restaurantData?.menus?.map((item, key) => (
              <div key={key} className="col-span-1">
                <Column>
                  <div className="w-fit overflow-hidden rounded-lg">
                    <Image
                      src={item.imageUrl}
                      alt=""
                      width={250}
                      height={250}
                    />
                  </div>
                  <Text value={`ID:${item.id}`} />
                  <Text value={item.name} />
                  <Text value={`${item.price} BTH`} />
                  <Column gap={1}>
                    <Button onClick={() => onUpdate(item.id)}>Update</Button>
                    <Button onClick={() => onDelete(item.id)}>Delete</Button>
                  </Column>
                </Column>
              </div>
            ))
            : ""}
        </Grid>
      ) : (
        ""
      )}
    </Column>
  );
};

export default withAuth(MenuPage);
