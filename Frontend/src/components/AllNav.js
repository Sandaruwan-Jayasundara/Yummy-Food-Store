import AdminPanel from "./Administration/AdminPanel";
import Home from "./Customer/Main Pages/Home";
import Login from "./Authentications/Login";
import BottomBar from "./Customer/Main Pages/Supportive Files/CustomerBottomBar";
import CustomerNavbar from "./Customer/Main Pages/Supportive Files/CustomerNavbar";
import CustomerDashboard from "./Customer/CustomerDashboard";

function AllNav() {
  const role = localStorage.getItem("user");

  if (role === "Admin" || role === "BranchManager" || role === "DeliveryManager") {
    return <AdminPanel />;
  } else {
    return(
      <div>
      <CustomerNavbar />
      <BottomBar />
      <CustomerDashboard />
      </div>
    )
    //<CustomerDashboard />
  }
}

export default AllNav;
