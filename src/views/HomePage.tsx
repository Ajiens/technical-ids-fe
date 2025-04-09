import { useEffect, useState } from "react";
import ProductInterface from "@/interfaces/ProductInterface";
import { DataTable } from "./product/DataTable";
import { columns } from "./product/Columns";
import productService from "@/services/productService";
import BaseResponse from "@/interfaces/BaseResponse";

function HomePage() {
  const [data, setData] = useState<ProductInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try{
        const response = await getData();
        setData(response);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch data");
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="container mx-auto py-10">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <DataTable columns={columns} data={data} />
      )}
    </div>
  );
}

export default HomePage;

async function getData(): Promise<ProductInterface[]> {
  const { request } = productService.getAllProducts();

  try {
    const response = await request;
    const apiResponse: BaseResponse<ProductInterface[]> = response.data;
    if (apiResponse.status === 200) {
      return apiResponse.data;
    } else {
      throw new Error(apiResponse.message);
    }
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}
