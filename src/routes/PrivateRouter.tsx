import { Header } from "../components/Header";
import { Outlet } from "react-router-dom";

const PrivateRouter = () => {
    return (
        <div>
            <Header />
            <div className="mt-20">
                <Outlet />
            </div>
            
        </div>
    );
}

export default PrivateRouter;