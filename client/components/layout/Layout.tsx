import { Header } from "../../components";
import { Footer } from "../footer/Footer";

export const Layout = (props: { children: any }) => {
  return (
    <>
      <Header/>
      {props.children}
      <Footer />
    </>
  );
}