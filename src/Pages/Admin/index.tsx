import Dashboard from "./Dashboard";
import Home from "../Home";
import {useStateValue} from "../../context/StateProvider";
import {Roles} from "../../const/roles";

const Admin = () => {
    const [{role}] = useStateValue()
    return (
        <>
            {role === Roles.restaurant ? <Dashboard/> : <Home/>}
        </>
    );
};

export default Admin;
