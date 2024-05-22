import { NavLink, PathOption } from "@/shared/components";

import s from "./navlinks.module.scss";

type Props = {
  paths: PathOption[];
};

export const NavLinks = ({ paths }: Props) => {
  return (
    <div className={s.pages}>
      {paths.map((path) => (
        <NavLink key={path.title} path={path} />
      ))}
    </div>
  );
};
