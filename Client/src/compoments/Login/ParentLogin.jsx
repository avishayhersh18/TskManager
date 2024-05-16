import React from "react";
import { styles } from "../../utils/styles";
import { useReducer } from "preact/hooks";
import { initState, reducer } from "../../utils/reducer";

import BackGround from "../../assets/Background2.jpg";

export default function ParentLogin({ children }) {
  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <section
      class="gradient-form min-h-screen min-w-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${BackGround})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div class="container h-full p-10">
        <div class="g-6 flex h-full flex-wrap items-center justify-center text-white dark:text-neutral-200">
          <div class="w-full">
            <div class="block rounded-lg bg-black bg-opacity-80 shadow-lg t dark:bg-neutral-800">
              <div class="g-0 lg:flex lg:flex-wrap">
                <div class="px-4 md:px-0 lg:w-6/12">
                  <div class="md:mx-6 md:p-12">{children}</div>
                </div>

                <div
                  class="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none"
                  style={styles.gradient_background}
                >
                  <div class="px-4 py-6 text-white md:mx-6 md:p-12">
                    <h4 class="mb-6 text-2xl font-semibold">
                      We are more than just a company
                    </h4>
                    <p class={styles.text}>
                      TskManager a powerful and intuitive online platform
                      designed to help you manage your personal tasks
                      efficiently and stay organized. TskManager offers a
                      comprehensive set of tools and features to assist you in
                      prioritizing, tracking, and completing your tasks
                      effectively. With TskManager, you can easily create and
                      categorize your tasks based on different aspects of your
                      life, such as work, personal projects, health, or errands.
                      The user-friendly interface allows you to input task
                      details, set due dates, and assign priorities, ensuring
                      that nothing falls through the cracks.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
