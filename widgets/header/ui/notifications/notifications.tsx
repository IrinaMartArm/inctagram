import { Bell } from "@/public";

import s from "./notifications.module.scss";

type Props = {
  notificationsCount?: number;
};

export const Notifications = ({ notificationsCount = 0 }: Props) => {
  const isShowMessagesCont = notificationsCount > 0;

  return (
    <button className={s.wrapper}>
      {isShowMessagesCont && (
        <div className={s.notifications}>{notificationsCount}</div>
      )}
      <Bell />
    </button>
  );
};
