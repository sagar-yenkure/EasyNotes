import { useNavigate } from "react-router-dom"

// import { useSelector } from "react-redux"


function Navbar() {
  const navigate=useNavigate()

  const handlelogout=()=>{
    localStorage.removeItem("token")
    navigate("/")

  }
  return(
    <>
    <div className="bg-black text-white font-bold flex justify-between p-5 text-xl">
      <h1>
      Tasky - TASK MANAGER
      </h1>
      <button onClick={handlelogout} title="logout" className="px-4 rounded-xl py-1 bg-red-500 text-white">
        logout
      </button>
    </div>
    </>
  )


  
}
export default Navbar

