import ProductInterface from "../interfaces/ProductInterface";
import { apiClient } from "./apiClient";

class ProductService{
  getAllProducts() {
    let url: string = "/product/viewall";

    const controller = new AbortController();

    const request = apiClient.get<ProductInterface[]>(url, {
      signal: controller.signal,
    })

    return {request, cancel: () => controller.abort()}
  }
}

export default new ProductService();