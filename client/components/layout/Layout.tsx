import { Header } from "../../components";

export const Layout = (props: { children: any }) => {
  return (
    <>
      <Header/>
      {props.children}
    </>
  );
}