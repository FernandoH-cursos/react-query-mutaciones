import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Product, productActions } from "..";

export const useProductMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: productActions.createProduct,
    onMutate: (product) => {
      //* Optimistic product
      const optimisticProduct = { id: Math.random(), ...product };

      //* Establece o setea datos manualmente en caché (no realiza petición al servidor), en este caso se setean
      //* los productos
      queryClient.setQueryData<Product[]>(
        ["products", { filterKey: product.category }],
        //* 'old' es el arreglo actual de productos
        (old) => {
          //* Si no hay data devuelve solo el producto nuevo devuelto en la mutación
          if (!old) return [optimisticProduct];

          //* Se establecen los productos existentes más el nuevo producto
          return [...old, optimisticProduct];
        }
      );

      return {
        optimisticProduct,
      };
    },

    //* Como parametro recibe la data devuelta en la mutacion(lo devuelto en un POST en este caso)
    onSuccess: (product, _variables, context) => {
      // console.log({ product, _variables, context });

      //* Removiendo caché de query product creado con id de numero random
      queryClient.removeQueries(["product", context?.optimisticProduct.id]);

      //* Establece o setea datos manualmente en caché (no realiza petición al servidor), en este caso se setean
      //* los productos
      queryClient.setQueryData<Product[]>(
        ["products", { filterKey: product.category }],
        //* 'old' es el arreglo actual de productos
        (old) => {
          //* Si no hay data devuelve solo el producto nuevo devuelto en la mutación
          if (!old) return [product];

          //* Si el producto en cache es igual al producto de la actualizacion optimista devolvemos el producto
          //* que responde la mutacion POST, sino el producto de la caché
          return old.map((cacheProduct) =>
            cacheProduct.id === context?.optimisticProduct.id
              ? product
              : cacheProduct
          );
        }
      );
    },
    onError: (error, variables, context) => {
      console.log({ error, variables, context });

      //* Removiendo caché de query product creado con id de numero random
      queryClient.removeQueries(["product", context?.optimisticProduct.id]);

      queryClient.setQueryData<Product[]>(
        ["products", { filterKey: variables.category }],
        //* 'old' es el arreglo actual de productos
        (old) => {
          //* Si no hay data devuelve un arreglo vacio
          if (!old) return [];

          //* Si el producto en cache es distinto al producto de la actualizacion optimista devolvemos todos los
          //* productos distintos a estos 2 ids que coinciden 
          return old.filter((cacheProduct) => cacheProduct.id !== context?.optimisticProduct.id);
        }
      );
    },
  });

  return mutation;
} 