import AppLogo from "../components/Common/AppLogo";
import UserHeader from "../components/Common/UserHeader";
import PnLPositionCard from "../components/Dashboard/PnLPositionCard";
import ProfitTargetCard from "../components/Dashboard/ProfitTargetCard";
import DailyPnlCard from "../components/Dashboard/DailyPnlCard";
import DiversificationCard from "../components/Dashboard/DiversificationCard";
import OrderHistoryCard from "../components/Dashboard/OrderHistoryCard";
import MarketClosedModal from "../components/Common/MarketClosedModal";
import useMarketStatus from "../hooks/useMarketStatus";
import styled from 'styled-components';
import { useState } from 'react';
import { useUser } from "../context/UserContext";

const Grid = styled.div`
  display: grid;
  /* Define 5 columns – you can adjust fractions as needed */
  grid-template-columns: repeat(3, 1fr) 1fr 1fr;
  /* Define 5 rows */
  grid-template-rows: auto auto auto auto auto;
  grid-gap: 1.5rem;
  padding: 2rem;
  
  /* Define named grid areas */
  grid-template-areas:
    "total total total profitTarget dailyPnl"
    "total total total diversification diversification"
    "total total total diversification diversification"
    "total total total diversification diversification"
    "orderHistory orderHistory orderHistory orderHistory orderHistory";

  @media (max-width: 768px) {
  grid-template-columns: 1fr; 
  grid-template-areas:
    "total"
    "profitTarget"
    "dailyPnl"
    "diversification"
    "orderHistory";
  }
`;

const Dashboard = () => {
  const [refresh, setRefresh] = useState(false);
  const isMarketOpen = useMarketStatus();
  const { seenMarketModal, setSeenMarketModal } = useUser(); // Show modal once per user session

  if (isMarketOpen === null) {
    return null;
  }  

  return (
    <div>
      {!isMarketOpen && !seenMarketModal && <MarketClosedModal setSeenMarketModal={setSeenMarketModal}/>} {/* Show market closed modal if market closed */}
      <AppLogo />
      <UserHeader setRefresh={setRefresh} /> {/* Send prop to deposit funds button */}
      <Grid>
        <div style={{ gridArea: "total", height: "100%" }}>
          <PnLPositionCard refresh={refresh}/> {/* Send prop to cashAndAssets API fetch */}
        </div>

        <div style={{ gridArea: "profitTarget" }}>
          <ProfitTargetCard />
        </div>

        <div style={{ gridArea: "dailyPnl" }}>
          <DailyPnlCard />
        </div>

        <div style={{ gridArea: "diversification", height: "100%" }}>
          <DiversificationCard />
        </div>

        <div style={{ gridArea: "orderHistory" }}>
          <OrderHistoryCard />
        </div>
      </Grid>
    </div>
  );
};

export default Dashboard;
