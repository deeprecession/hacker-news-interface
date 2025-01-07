import { Link } from "react-router-dom";
import style from "./ProductCard.module.css";

import { ProductData } from "../../../product/ProductData";
import { getPriceString } from "../../../../utils/getPriceString";
import StarSVG from "../../../../components/StarSVG";
import LikeButton from "../../../../components/LikeButton/LikeButton";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import {
  addProduct,
  getProductCount,
  removeOneProduct,
} from "../../../../features/shoppingCart/shoppingCartSlice";
import Button from "../../../../components/BuyButton/Button";
import { toast } from "react-toastify";
import {
  isProductLiked,
  toggleLiked,
} from "../../../../features/catalog/catalogSlice";
import Counter from "../../../../components/Counter/Counter";

interface ProductCardProps {
  product: ProductData;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
}: ProductCardProps) => {
  const isLiked = useAppSelector((state) => isProductLiked(state, product.id));
  const priceStr = getPriceString(product.price);
  const productCount = useAppSelector((state) =>
    getProductCount(state, product.id),
  );

  const dispatch = useAppDispatch();

  const likeClickHandler = () => {
    dispatch(toggleLiked(product.id));
  };

  const addToChartHandler = () => {
    toast("Successful added to cart", { type: "success" });

    dispatch(addProduct(product));
  };

  return (
    <Link className={style.link} to={`/products/${product.id.toString()}`}>
      <article className={style.product}>
        <div className={style.image}>
          <img loading="lazy" src={product.thumbnail} alt={product.title}></img>
        </div>

        <div className={style.price}>{priceStr}</div>

        <div className={style.title}>{product.title}</div>

        <div className={style.rating}>
          {product.rating.toFixed(1)}

          <div className={style.star}>
            <StarSVG />
          </div>
        </div>

        <LikeButton isLiked={isLiked} clickHandler={likeClickHandler} />

        {productCount === 0 ? (
          <div className={style.buyBtn}>
            <Button onClick={addToChartHandler} content="Add to chart" />
          </div>
        ) : (
          <div className={style.buyBtn}>
            <Counter
              incHandler={() => {
                dispatch(addProduct(product));
              }}
              decHandler={() => {
                dispatch(removeOneProduct(product));
              }}
              defaultValue={productCount}
            />
          </div>
        )}
      </article>
    </Link>
  );
};

export default ProductCard;
