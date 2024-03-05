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

const CategoryPage = (props: Props) => {
  const dispatch = useDispatch();
  const { data: sessionData } = useSession();
  const { data: restaurantData, isLoading: loadingRestaurant } =
    api.restaurant.getOne.useQuery({ id: sessionData?.user.id as "" });
  const { mutateAsync: createCatApi, isLoading: loadingCreateCat } =
    api.category.create.useMutation({
      onSuccess: async () => {
        await refetchDataCat();
        return;
      },
    });

  const { mutateAsync: deleteCat, isLoading: loadingDeleteCat } =
    api.category.delete.useMutation({
      onSuccess: async () => {
        await refetchDataCat();
        return;
      },
    });

  const {
    data: dataCatApi,
    isLoading: loadingDataCat,
    refetch: refetchDataCat,
  } = api.category.getAllByRestaurantId.useQuery({
    id: restaurantData?.id as "",
  });

  const { mutate: updateCatApi, isLoading: loadingUpdateCat } =
    api.category.update.useMutation({
      onSuccess: async () => {
        await refetchDataCat();
        return;
      },
    });

  useEffect(() => {
    dispatch(
      setShowLoading(
        loadingCreateCat ||
        loadingDataCat ||
        loadingDeleteCat ||
        loadingUpdateCat ||
        loadingRestaurant
      ),
    );
    return;
  }, [loadingRestaurant, loadingCreateCat, loadingDataCat, loadingDeleteCat, loadingUpdateCat]);

  return (
    <div>
      <Text value={"Categories"} />

      <Column>
        <Button onClick={() => createCatApi({ name: "Appetizers" })}>
          Create
        </Button>

        <Row gap={4}>
          {dataCatApi?.length
            ? dataCatApi.map((item, key) => (
              <div key={key}>
                <Column gap={1}>
                  <Link href={`/restaurant/category/${item.id}`}>
                    <Text value={`${item.name} (${item.menus.length})`} />
                  </Link>
                  <Button
                    onClick={() =>
                      updateCatApi({
                        id: item.id,
                        name: "name cat updated",
                      })
                    }
                  >
                    Update
                  </Button>
                  <Button onClick={() => deleteCat({ id: item.id })}>
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

export default withAuth(CategoryPage);
