import type { ChildrenType } from "../../types/Types";

const Container = ({ children }: ChildrenType) => {
  return <div className="container">{children}</div>;
};

export default Container;
