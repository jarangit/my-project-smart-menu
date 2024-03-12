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
const MeatPage = (props: Props) => {
  const dispatch = useDispatch();
  const { data: sessionData } = useSession();
  const { data: restaurantData, isLoading: loadingRestaurant } =
    api.restaurant.getOne.useQuery({ id: sessionData?.user.id as "" });

  const { data: dataMeatFromSystem } = api.meatStore.getAll.useQuery();
  const {
    data: dataMeatApi,
    isLoading: loadingDataMeat,
    refetch: refetchDataMeat,
  } = api.meat.getAllByRestaurantId.useQuery({
    id: restaurantData?.id as "",
  });

  const { mutateAsync: createMeatApi, isLoading: loadingCreateMeat } =
    api.meat.create.useMutation({
      onSuccess: async () => {
        await refetchDataMeat();
        return;
      },
    });
  const { mutateAsync: createMany, isLoading: loadingCreateManyMeat } =
    api.meat.createMany.useMutation();

  const { mutateAsync: deleteMeat, isLoading: loadingDeleteMeat } =
    api.meat.delete.useMutation({
      onSuccess: async () => {
        await refetchDataMeat();
        return;
      },
    });

  const { mutate: updateMeatApi, isLoading: loadingUpdateMeat } =
    api.meat.update.useMutation({
      onSuccess: async () => {
        await refetchDataMeat();
        return;
      },
    });

  const onCreateMeatByDefaultValue = async () => {
    const items = dataMeatFromSystem?.map((item) => ({
      // id: item.id,
      name: item.name,
    }));
    if (items && items.length > 0) {
      void createMany({ items: items });
    }
    return;
  };

  useEffect(() => {
    dispatch(
      setShowLoading(
        loadingCreateMeat ||
          loadingDataMeat ||
          loadingDeleteMeat ||
          loadingUpdateMeat ||
          loadingRestaurant ||
          loadingCreateManyMeat,
      ),
    );
    return;
  }, [
    loadingRestaurant,
    loadingCreateMeat,
    loadingDataMeat,
    loadingDeleteMeat,
    loadingUpdateMeat,
    loadingCreateManyMeat,
  ]);

  return (
    <div>
      <Text value={"Meats"} />
      <Column>
        <Column className="border p-3">
          <Text value={"Category of system"} />
          {dataMeatFromSystem?.length
            ? dataMeatFromSystem.map((item, key) => (
                <div key={key}>
                  <Row>
                    <div>{item.name}</div>
                    <Button className={`bg-gray-500 text-gray-400`}>
                      Select
                    </Button>
                  </Row>
                </div>
              ))
            : ""}

          <Button onClick={() => onCreateMeatByDefaultValue()}>Save</Button>
        </Column>
      </Column>
      <Column>
        <Button
          onClick={() =>
            createMeatApi({
              name: "Chicken",
            })
          }
        >
          Create
        </Button>

        <Row gap={4}>
          {dataMeatApi?.length
            ? dataMeatApi.map((item, key) => (
                <div key={key}>
                  <Column gap={1}>
                    <Link href={`/restaurant/category/${item.id}`}>
                      <Text value={`${item.name} (${item.menus.length})`} />
                    </Link>
                    <Button
                      onClick={() =>
                        updateMeatApi({
                          id: item.id,
                          name: "name meat updated",
                        })
                      }
                    >
                      Update
                    </Button>
                    <Button onClick={() => deleteMeat({ id: item.id })}>
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

export default withAuth(MeatPage);
