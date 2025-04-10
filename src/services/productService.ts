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

  addProduct(product: ProductInterface) {
    let url: string = "/product/add";

    const controller = new AbortController();

    const request = apiClient.post<ProductInterface>(url, product, {
      signal: controller.signal,
    })

    return {request, cancel: () => controller.abort()}
  }
}

export default new ProductService();