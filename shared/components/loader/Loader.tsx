import s from "./loader.module.scss";
export const Loader = () => {
  return (
    <div className={s.root}>
      <div className={s.loader}></div>
    </div>
  );
};
