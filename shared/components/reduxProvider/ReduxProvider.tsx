import { PropsWithChildren } from "react";
import { Provider } from "react-redux";

import { store } from "@/shared/assets/api/store";

export const ReduxProvider = (props: PropsWithChildren) => {
  return <Provider store={store}>{props.children}</Provider>;
};
