import { Header } from "./Header/Header";

export const Layout = (props: { children: any }) => {
  return (
    <>
      <Header/>
      {props.children}
    </>
  );
}