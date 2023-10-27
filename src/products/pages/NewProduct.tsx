import { useProductMutation } from "..";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

import { Button, Image, Input, Textarea } from "@nextui-org/react";

interface FormInputs{
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export const NewProduct = () => {
  const productMutation = useProductMutation();

  //*'watch' recibe un campo de formulario que se mapea y re-renderiza(es equivalente a un efecto con un estado) 
  const { control, handleSubmit, watch } = useForm<FormInputs>({
    defaultValues: {
      title: "Camiseta JS",
      price: 230.33,
      description: "Camiseta de NodeJS, hermosa para backend dev",
      category: "men's clothing",
      image:
        "https://m.media-amazon.com/images/I/A13usaonutL._AC_CLa%7C2140%2C2000%7C41OKiq-AYhL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0_UY1000_.png",
    },
  });

  //* re-renderizando en tiempo real lo escrito en el campo 'image' 
  const newImage = watch("image");

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    productMutation.mutate(data);
  };
  

  return (
    <div className="w-full flex-col">
      <h1 className="text-2xl font-bold">Nuevo producto</h1>

      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-around items-center">
          <div className="flex-col w-[500px]">
            <Controller
              name="title"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  {...field}
                  className="mt-2"
                  type="text"
                  label="Titulo del producto"
                />
              )}
            />

            <Controller
              name="price"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  //* Convierte el string del precio a numero
                  onChange={(e) => field.onChange(+e.target.value)}
                  value={field.value?.toString()}
                  className="mt-2"
                  type="number"
                  label="Precio del producto"
                />
              )}
            />

            <Controller
              name="image"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  {...field}
                  className="mt-2"
                  type="url"
                  label="Url del producto"
                />
              )}
            />

            <Controller
              name="description"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Textarea
                  {...field}
                  className="mt-2"
                  label="Descripcion del producto"
                />
              )}
            />

            <Controller
              name="category"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <select
                  {...field}
                  className="rounded-md p-3 mt-2 bg-gray-800 w-full"
                >
                  <option value="men's clothing">Men's clothing</option>
                  <option value="women's clothing">Women's clothing</option>
                  <option value="jewelery">Jewelery</option>
                  <option value="electronics">Electronics</option>
                </select>
              )}
            />

            <br />
            <Button
              isDisabled={productMutation.isLoading}
              type="submit"
              className="mt-2"
              color="primary"
            >
              {productMutation.isLoading ? "Cargando..." : "Crear Producto"}
            </Button>
          </div>

          <div
            className="bg-white rounded-2xl p-10 flex items-center"
            style={{
              width: "500px",
              height: "600px",
            }}
          >
            <Image src={newImage} />
          </div>
        </div>
      </form>
    </div>
  );
}