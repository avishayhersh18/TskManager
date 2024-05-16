import { useState, useEffect, useContext } from "preact/hooks";
import { styles } from "../../utils/styles";
import Menu from "./menu.jsx";
import Context from "../../utils/context";
import BackGround from "../../assets/Background2.jpg";
export default function Layout({ children, title }) {
  return (
    <div
      class={`${styles.screen} min-h-screen min-w-screen`}
      style={{
        backgroundImage: `url(${BackGround})`,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
      }}
    >
      <section
        class="gradient-form  min-h-screen min-w-screen "
        style={{
          backgroundImage: `url(${BackGround})`,
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div class="flex flex-col justify-center w-full items-center bg-black bg-opacity-20 ">
          <Menu />
          <div class="">
            <div class={styles.title}>{title}</div>

            <div class=" md:p-5">{children}</div>
          </div>
        </div>
      </section>
    </div>
  );
}
