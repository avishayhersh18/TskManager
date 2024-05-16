import userProfile from "../../assets/profileUserIcon.png";
import { useContext } from "preact/hooks";
import Context from "../../utils/context.jsx";
const UserProfile = () => {
  const { state, dispatch } = useContext(Context);
  return (
    <button
      className="relative text-white font-semibold py-2 px-4 rounded transition duration-300 ease-in-out"
      onClick={() => {
        dispatch({ type: "SET_VIEW", param: "profile" });
      }}
    >
      <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-8 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 bg-white text-black px-2 py-1 rounded shadow">
        View profile
      </span>
      <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 text-xs bg-red-500 text-white py-1 px-2 rounded opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
        View Profile
      </span>
      <div className="flex text-center border-5">
        <div className="w-7 flex flex-col h-8 mx-auto rounded-full overflow-hidden">
          <div></div>
          <img
            className="object-cover w-7 h-10"
            src={userProfile}
            alt="Profile"
          />
        </div>
        <div className="mt-2 px-2 text-xs sm:text-sm">
          {JSON.parse(localStorage.getItem("user")).Name}
        </div>
      </div>
    </button>
  );
};

export default UserProfile;
