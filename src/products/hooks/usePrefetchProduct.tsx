import { useQueryClient } from "@tanstack/react-query";
import { productActions } from "..";

export const usePrefetchProduct = () => {
  const queryClient = useQueryClient();

  const prefetchProduct = (id: number) => {
    //* Precargando info del producto a visitar al posicionar el mouse en este mismo
    queryClient.prefetchQuery({
      queryKey: ["product", id],
      queryFn: () => productActions.getProduct(id),
    });

    
  };

  return prefetchProduct;
};
