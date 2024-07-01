import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const UserAssignedCard = ({correo, cargos, nombres, apellidos, tiempoExperiencia}) => {
  return (
    <div
      className="profile-card w-[300px] rounded-md shadow-xl overflow-hidden z-[100] relative cursor-pointer snap-start shrink-0 bg-white flex flex-col items-center justify-center gap-3 transition-all duration-300 group"
    >
      <div
        className="avatar w-full pt-5 flex items-center justify-center flex-col gap-1"
      >
        <div
          className="img_container w-full flex items-center justify-center relative z-40 after:absolute after:h-[6px] after:w-full after:bg-[#58b0e0] after:top-4 after:group-hover:size-[1%] after:delay-300 after:group-hover:delay-0 after:group-hover:transition-all after:group-hover:duration-300 after:transition-all after:duration-300 before:absolute before:h-[6px] before:w-full before:bg-[#58b0e0] before:bottom-4 before:group-hover:size-[1%] before:delay-300 before:group-hover:delay-0 before:group-hover:transition-all before:group-hover:duration-300 before:transition-all before:duration-300"
        >
          <svg
            className="size-36 z-40 border-4 border-white rounded-full group-hover:border-8 group-hover:transition-all group-hover:duration-300 transition-all duration-300"
            id="avatar"
            viewBox="0 0 61.8 61.8"
            xmlns="http://www.w3.org/2000/svg"
          >
            <AccountCircleIcon color='action'/>
          </svg>
          <div
            className="absolute bg-[#58b0e0] z-10 size-[60%] w-full group-hover:size-[1%] group-hover:transition-all group-hover:duration-300 transition-all duration-300 delay-700 group-hover:delay-0"
          ></div>
        </div>
      </div>
      <div className="headings *:text-center *:leading-4">
        <p className="text-xl font-serif font-semibold text-[#434955]">{nombres + ' ' + apellidos}</p>
        <p className="mt-2 mb-3 text-sm font-semibold text-[#434955]">
            {cargos.map((cargo, index) => {
                if (index === cargos.length - 1) {
                    return cargo
                } else {
                    return cargo + ', '
                }
            })}            
        </p>
      </div>
      <div className="w-full items-center justify-center flex">
        <ul
          className="flex flex-col items-start gap-2 has-[:last]:border-b-0 *:inline-flex *:gap-2 *:items-center *:justify-center *:border-b-[1.5px] *:border-b-stone-700 *:border-dotted *:text-xs *:font-semibold *:text-[#434955] pb-3"
        >
          
          <li>
            <svg
              className="fill-stone-700 group-hover:fill-[#58b0e0]"
              height="15"
              width="15"
              id="mail"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16,14.81,28.78,6.6A3,3,0,0,0,27,6H5a3,3,0,0,0-1.78.6Z"
                fill="#231f20"
              ></path>
              <path
                d="M16.54,16.84h0l-.17.08-.08,0A1,1,0,0,1,16,17h0a1,1,0,0,1-.25,0l-.08,0-.17-.08h0L2.1,8.26A3,3,0,0,0,2,9V23a3,3,0,0,0,3,3H27a3,3,0,0,0,3-3V9a3,3,0,0,0-.1-.74Z"
                fill="#231f20"
              ></path>
            </svg>
            <p> {correo} </p>
          </li>
          
          <li>
            <svg
              id="map"
              viewBox="0 0 16 16"
              className="fill-stone-700 group-hover:fill-[#58b0e0]"
              height="15"
              width="15"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 0C5.2 0 3 2.2 3 5s4 11 5 11 5-8.2 5-11-2.2-5-5-5zm0 8C6.3 8 5 6.7 5 5s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z"
                fill="#444"
              ></path>
            </svg>
            <p>Tiempo de experiencia: {tiempoExperiencia} años.</p>
          </li>
        </ul>
      </div>
      <hr
        className="w-full group-hover:h-5 h-3 bg-[#58b0e0] group-hover:transition-all group-hover:duration-300 transition-all duration-300"
      />
    </div>

  )
}

export default UserAssignedCard