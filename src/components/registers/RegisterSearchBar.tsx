import { Toolbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchBar from "./search_bar/SearchBar";
import RegistersModal from "./RegistersModal";

const RegisterSearchBar = () => {
  const navigate = useNavigate();

  return (
    <div className="p-0 flex flex-col items-center justify-end">
      <Toolbar
        sx={{
          width: "90%",
          "@media (min-width: 600px)": {
            paddingLeft: 0,
            paddingRight: 0,
          },
        }}
        className="justify-end flex-row"
      >
        <div className="flex justify-start w-full ">
          <button
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-black py-2 px-4 rounded mr-2"
            onClick={() => navigate("/registers/estadisticas")}
          >
            Ver estadisticas
          </button>
        </div>
        <div className="flex justify-end w-full space-x-2 items-center">
          <SearchBar />
          <RegistersModal buttonStyles="bg-green-500 px-4 py-2 rounded-md" />
        </div>
      </Toolbar>
    </div>
  );
};

export default RegisterSearchBar;
