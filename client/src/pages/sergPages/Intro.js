import React from "react";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import FormLogin from "../Components/Forms/FormLogin";

export default function Intro(){
  return(
    <>
      <Header />
      <main>
        <FormLogin />
      </main>
      <Footer />
    </>
  );
}