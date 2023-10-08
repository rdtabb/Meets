import type { ChildrenType } from "../../types/Types";
import { memo } from "react";

const Container = ({ children }: ChildrenType) => {
  return <div className="container">{children}</div>;
};

export default memo(Container);
