import { ProductData } from "../../pages/product/ProductData";
import catchError from "../../utils/catchError";

type FakeJsonResponse = {
	products: ProductData[];
};

const fetchAllProducts = async (): Promise<ProductData[]> => {
	const res = await fetch(`https://dummyjson.com/products?limit=0`);

	if (!res.ok) {
		throw new Error(`failed to fetch products: ${res.status}`);
	}

	const [err, jsonResopnse] = await catchError<FakeJsonResponse>(res.json());
	if (err) {
		throw new Error(
			`failed to parse fetched product data: ${err?.message || "Unknown error"}`,
		);
	}

	return jsonResopnse.products;
};

export default fetchAllProducts;
