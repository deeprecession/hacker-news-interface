import style from "./Counter.module.css";

type CounterProps = {
  defaultValue: number;
  incHandler: () => void;
  decHandler: () => void;
};

const Counter = ({
  defaultValue,
  incHandler: incHanlder,
  decHandler: decHanlder,
}: CounterProps) => {
  return (
    <div className={style.container}>
      <button
        className={style.button}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();

          decHanlder();
        }}
      >
        -
      </button>
      <h3 className={style.value}>{defaultValue}</h3>
      <button
        className={style.button}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();

          incHanlder();
        }}
      >
        +
      </button>
    </div>
  );
};

export default Counter;
