import { FormEvent } from "react";
import style from "./LikeFilter.module.css";
import { useAppDispatch } from "../../../../hooks/reduxHooks";
import { setToFilterLiked } from "../../../../features/catalog/catalogSlice";
import Toggle from "react-toggle";

const LikeFilterCheckbox = () => {
  const dispatch = useAppDispatch();

  const onChange = (e: FormEvent<HTMLInputElement>) => {
    const formValue = e.currentTarget.checked;
    dispatch(setToFilterLiked(formValue));
  };

  return (
    <div className={style.container}>
      <label htmlFor="likeFilter">Show only liked items</label>
      <Toggle
        id="likeFilter"
        onChange={onChange}
        name="likeFilter"
        icons={false}
      ></Toggle>
    </div>
  );
};

export default LikeFilterCheckbox;
