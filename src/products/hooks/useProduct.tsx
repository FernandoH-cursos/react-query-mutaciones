import { useQuery } from "@tanstack/react-query";
import { productActions } from "..";

interface Options {
  id: number;
}

export const useProduct = ({ id }: Options) => {
  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => productActions.getProduct(id),
    staleTime: 1000 * 60 * 60,
  });

  return {
    product,
    isLoading,
    isError,
    error,
  };
};
