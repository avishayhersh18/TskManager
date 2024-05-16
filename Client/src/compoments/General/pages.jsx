import NewCatergory from "../Tasks/NewCategory.jsx";
import PresentMissionPage from "../Tasks/PresentMissionPage.jsx";
import About from "../Pages/about.jsx";
import ContantUs from "../Pages/contactus.jsx";
import Login from "../Login/login.jsx";
import Profile from "../Profile/profile.jsx";
import EditProfile from "../Profile/EditProfile.jsx";
import Register from "../Login/register.jsx";

export const pages = {
  home: <PresentMissionPage />,
  new_category: <NewCatergory />,
  about: <About />,
  contant_us: <ContantUs />,
  login: <Login />,
  register: <Register />,
  profile: <Profile />,
  editPro: <EditProfile />,
};
