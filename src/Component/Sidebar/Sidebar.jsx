import { GrLogout } from 'react-icons/gr'
import { MdOutlineCastForEducation } from "react-icons/md"; 
// import { CgProfile } from 'react-icons/cg'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineBars } from 'react-icons/ai'
import logo from '../../assets/digital-financial-servicesl  logo.png'

const Sidebar = () => {

    const [isActive, setActive] = useState(false);
    // const [role, isLoading] = useRole();

    // Sidebar Responsive Handler
    const handleToggle = () => {
      setActive(!isActive)
    }
    return (
        <div>
                 {/* Small Screen Navbar */}
      <div className='bg-gray-100 text-gray-800 flex justify-between md:hidden'>
        <div>
          <div className='block cursor-pointer p-4 font-bold'>
            <Link to='/'>
            <h1 className='text-2xl font-bold flex gap-2'> <MdOutlineCastForEducation></MdOutlineCastForEducation>MFS</h1>
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className='mobile-menu-button p-4 focus:outline-none focus:bg-gray-200'
        >
          <AiOutlineBars className='h-5 w-5' />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && '-translate-x-full'
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div>
            <div className='w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-cyan-100 mx-auto'>
              <Link to='/'>
              <h1 className='text-2xl font-bold flex gap-2'> 
                <img className='w-3/12' src={logo} alt="" />
                MFS</h1>
                
              </Link>
            </div>
          </div>

          {/* Nav Items */}
          <div className='flex flex-col justify-between flex-1 mt-6'>
            {/* Conditional toggle button here.. */}           
            <nav>
              {/*  Menu Items */}
            
              {/* <ClassItem label='profile' address='/dashboard/profile' icon={CgProfile }></ClassItem>

              {role === 'student' && <StudentMenu></StudentMenu>}
              {role === 'techer' && <TeacherMenu></TeacherMenu>}
           
              {role === 'admin' && <AdminMenu></AdminMenu>} */}

              
           
           
            </nav>
          </div>
        </div>

        <div>
          <hr />
          <button
            // onClick={logOut}
            className='flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform'
          >
            <GrLogout className='w-5 h-5' />

            <span className='mx-4 font-medium'>Logout</span>
          </button>
        </div>
      </div>
        </div>
    );
};

export default Sidebar;