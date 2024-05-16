import React from "react";
import { styles } from "../../utils/styles";
import Layout from "../General/layout.jsx";
import logoImage from "../../assets/TskManagerLogoRemovebg.png";
export default function About() {
  return (
    <Layout title="">
      <div style={styles.component_background}>
        <div style={{ width: "600px", margin: "0 auto", textAlign: "center" }}>
          <div className={styles.largetext}>
            Introducing TskManager, a powerful and intuitive online platform
            designed to help you manage your personal tasks efficiently and stay
            organized. TskManager offers a comprehensive set of tools and
            features to assist you in prioritizing, tracking, and completing
            your tasks effectively.
          </div>
          <div className="flex items-center justify-center">
            <img
              className="w-20 h-15 mx-4 md:mx-8"
              src={logoImage}
              alt="logo"
            />
          </div>
          <div
            className={`${styles.largetext} py-10 border-t border-blueGray-200`}
            style={{ textAlign: "center" }}
          >
            With TskManager, you can easily create and categorize your tasks
            based on different aspects of your life, such as work, personal
            projects, health, or errands. The user-friendly interface allows you
            to input task details, set due dates, and assign priorities,
            ensuring that nothing falls through the cracks.
          </div>
          <div className="flex items-center justify-center">
            <img
              className="w-20 h-15 mx-4 md:mx-8"
              src={logoImage}
              alt="logo"
            />
          </div>
          <div
            className={`${styles.largetext} py-10 border-t border-blueGray-200`}
            style={{ textAlign: "center" }}
          >
            TskManager also offers insightful analytics and reporting features
            to help you gain valuable insights into your task management
            patterns and productivity. Monitor your task completion rates,
            identify areas for improvement, and celebrate your accomplishments.
          </div>
          <div className="flex items-center justify-center">
            <img
              className="w-20 h-15 mx-4 md:mx-8"
              src={logoImage}
              alt="logo"
            />
          </div>
          <div
            className={`${styles.largetext} py-10 border-t border-blueGray-200`}
            style={{ textAlign: "center" }}
          >
            Your data's security and privacy are of utmost importance.
            TskManager employs robust security measures to safeguard your
            information, ensuring that your tasks and personal data are
            protected.
          </div>
          <div className="flex items-center justify-center">
            <img
              className="w-20 h-15 mx-4 md:mx-8"
              src={logoImage}
              alt="logo"
            />
          </div>
          <div
            className={`${styles.largetext} py-10 border-t border-blueGray-200`}
            style={{ textAlign: "center" }}
          >
            Whether you're a busy professional, a student juggling multiple
            responsibilities, or simply someone looking to stay organized in
            their personal life, TskManager is your trusted companion for
            efficient personal task management. Take control of your tasks,
            reduce stress, and accomplish more with TskManager.
          </div>
        </div>
      </div>
    </Layout>
  );
}
