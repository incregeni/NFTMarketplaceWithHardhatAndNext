import { Header } from "./Header";

export const Layout = (props: { children: any; }) => {
  return (
    <>
      <Header/>
      {props.children}
    </>
  );
}