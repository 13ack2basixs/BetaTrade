import AppLogo from "../components/Common/AppLogo";
import UserHeader from "../components/Common/UserHeader";
import StockChart from "../components/Market/StockChart";

const Market = () => {
    return (
        <div>
            <AppLogo />
            <UserHeader />
            <StockChart />
        </div>
    );
};

export default Market;