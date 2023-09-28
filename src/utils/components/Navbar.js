"use client";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import logo from "../../../public/logo.png";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [userData, setUserData] = useState(null);

  console.log(userData);

  useEffect(() => {
    getAuthUserData();
  }, []);

  async function getAuthUserData() {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/me`);
      const jsonData = await response.json();
      if (response.status === 200) {
        setUserData(jsonData.result);
      } else {
        toast.error(jsonData.message);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleLogout = () => {
    toast.success(`👍logged out successfully!`);
  };

  return (
    <nav className="navbar navbar-dark shadow shadow-md">
      <div className="container-fluid">
        <Link className="navbar-brand" href="/">
          <Image src={logo} alt="logo" width={70} height={40} className="d-inline-block align-text-center" />
        </Link>
        <div>
          <div className="dropdown">
            <div className="d-flex align-items-center rounded rounded-circle " type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <Image src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp" width={50} height={50} alt="avatar" className="avatar rounded-circle" />
              <i className="bi bi-chevron-double-down text-white ms-2"></i>
            </div>
            <div className="dropdown-menu dropdown-menu-end shadow shadow-md" aria-labelledby="dropdownMenuButton">
              <span className="dropdown-item user-name">
                <i className="bi bi-person text-dark"></i>
                {userData?.firstname} {userData?.lastname}
              </span>
              <Link className="dropdown-item" href="/">
                <i className="bi bi-person-lines-fill text-dark"></i> Profile
              </Link>
              <span className="dropdown-item " onClick={handleLogout}>
                <i className="bi bi-box-arrow-left text-dark"></i> Logout
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

// "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
