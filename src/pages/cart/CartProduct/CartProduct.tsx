import { Link } from "react-router-dom";
import style from "./CartProduct.module.css";
import { getPriceString } from "../../../utils/getPriceString";
import {
  addProduct,
  CartProduct,
  getProductCount,
  removeOneProduct,
  removeWholeProduct,
} from "../../../features/shoppingCart/shoppingCartSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import LikeButton from "../../../components/LikeButton/LikeButton";
import {
  isProductLiked,
  toggleLiked,
} from "../../../features/catalog/catalogSlice";
import GarbageSVG from "../../../components/GarbageSVG";
import Counter from "../../../components/Counter/Counter";

interface ProductCardProps {
  cardProduct: CartProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({
  cardProduct,
}: ProductCardProps) => {
  const dispatch = useAppDispatch();

  const priceStr = getPriceString(cardProduct.product.price);

  const product = cardProduct.product;

  const isLiked = useAppSelector((state) => isProductLiked(state, product.id));

  const likeClickHandler = () => {
    dispatch(toggleLiked(product.id));
  };

  const productCount = useAppSelector((state) =>
    getProductCount(state, product.id),
  );

  return (
    <article className={style.container}>
      <div className={style.image}>
        <img loading="lazy" src={product.thumbnail} alt={product.title}></img>
      </div>

      <div className={style.price}>{priceStr}</div>

      <Link to={`/products/${product.id}`} className={style.title}>
        {product.title}
      </Link>

      <div className={style.count}>
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

      <div
        onClick={() => dispatch(removeWholeProduct(product))}
        className={style.removeBtn}
      >
        <GarbageSVG />
      </div>

      <div className={style.likeBtn}>
        <LikeButton isLiked={isLiked} clickHandler={likeClickHandler} />
      </div>
    </article>
  );
};

export default ProductCard;
