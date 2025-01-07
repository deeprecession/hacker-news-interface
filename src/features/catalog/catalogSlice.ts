import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductData } from "../../pages/product/ProductData";
import fetchAllProducts from "./fetchProducts";
import filterProducts from "./filterProducts";

const emptyState: CatalogState = {
	allProducts: [],
	filteredProducts: [],

	likedProducts: {},

	filterByLike: false,
	filterByTitle: "",
	filterByCategory: "",

	status: "idle",
	errorMsg: "",
};

export const fetchProductsThunk = createAsyncThunk<ProductData[]>(
	"productList",
	async (_, { rejectWithValue }) => {
		try {
			return await fetchAllProducts();
		} catch (err) {
			return rejectWithValue("failed to get products");
		}
	},
);

export interface CatalogState {
	allProducts: ProductData[];
	filteredProducts: ProductData[];

	likedProducts: { [id: number]: boolean };

	filterByLike: boolean;
	filterByTitle: string;
	filterByCategory: string;

	status: "idle" | "loading" | "failed";
	errorMsg: string | null;
}

export const catalogSlice = createSlice({
	name: "catalog",
	initialState: emptyState,
	reducers: {
		setAllProducts: (state, action: PayloadAction<ProductData[]>) => {
			state.allProducts = action.payload;

			state.filteredProducts = filterProducts(state);
		},

		setToFilterByTitle: (state, action: PayloadAction<string>) => {
			state.filterByTitle = action.payload;

			state.filteredProducts = filterProducts(state);
		},

		setToFilterLiked: (state, action: PayloadAction<boolean>) => {
			state.filterByLike = action.payload;

			state.filteredProducts = filterProducts(state);
		},

		setToFilterByCategory: (state, action: PayloadAction<string>) => {
			state.filterByCategory = action.payload;

			state.filteredProducts = filterProducts(state);
		},

		addLiked: (state, action: PayloadAction<number>) => {
			state.likedProducts[action.payload] = true;
		},

		removeLiked: (state, action: PayloadAction<number>) => {
			delete state.likedProducts[action.payload];
		},

		toggleLiked: (state, action: PayloadAction<number>) => {
			const productId = action.payload;

			if (productId in state.likedProducts) {
				delete state.likedProducts[action.payload];
			} else {
				state.likedProducts[action.payload] = true;
			}
		},
	},

	selectors: {
		selectAllProducts: (state) => state.allProducts,
		selectFilteredProducts: (state) => state.filteredProducts,
		selectProductById: (state, productId: number): ProductData | undefined => {
			return state.allProducts?.[productId];
		},
		isProductLiked: (state, id: number): boolean => {
			return id in state.likedProducts;
		},
	},

	extraReducers: (builder) => {
		builder
			.addCase(fetchProductsThunk.pending, (state) => {
				state.status = "loading";
				state.errorMsg = null;
			})
			.addCase(fetchProductsThunk.fulfilled, (state, action) => {
				state.status = "idle";

				state.allProducts = action.payload;
				state.filteredProducts = action.payload;
			})
			.addCase(fetchProductsThunk.rejected, (state, action) => {
				state.status = "failed";
				state.errorMsg = action.error.message ?? null;
			});
	},
});

export const {
	setToFilterByCategory,
	setToFilterLiked,
	setToFilterByTitle,
	setAllProducts,
	toggleLiked,
	addLiked,
	removeLiked,
} = catalogSlice.actions;

export const {
	isProductLiked,
	selectAllProducts,
	selectFilteredProducts,
	selectProductById,
} = catalogSlice.selectors;
