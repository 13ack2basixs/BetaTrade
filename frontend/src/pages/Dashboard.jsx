import AppLogo from "../components/Common/AppLogo";
import UserHeader from "../components/Common/UserHeader";
import TotalBalanceCard from "../components/Dashboard/TotalBalanceCard";
import ProfitTargetCard from "../components/Dashboard/ProfitTargetCard";
import DailyPnlCard from "../components/Dashboard/DailyPnlCard";
import GeneralCard from "../components/Dashboard/GeneralCard";
import DiversificationCard from "../components/Dashboard/DiversificationCard";
import OrderHistoryCard from "../components/Dashboard/OrderHistoryCard";
import styled from 'styled-components';
import { useState } from 'react';

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
    "best worst profitFactor diversification diversification"
    "orderHistory orderHistory orderHistory orderHistory orderHistory";

  @media (max-width: 768px) {
  grid-template-columns: 1fr; 
  grid-template-areas:
    "total"
    "profitTarget"
    "dailyPnl"
    "best"
    "worst"
    "profitFactor"
    "diversification"
    "orderHistory";
  }
`;

const Dashboard = () => {
  const [refresh, setRefresh] = useState(false);

  return (
    <div>
      <AppLogo />
      <UserHeader setRefresh={setRefresh} /> {/* Send prop to deposit funds button */}
      <Grid>
        <div style={{ gridArea: "total" }}>
          <TotalBalanceCard refresh={refresh}/> {/* Send prop to cashAndAssets API fetch */}
        </div>

        <div style={{ gridArea: "profitTarget" }}>
          <ProfitTargetCard />
        </div>

        <div style={{ gridArea: "dailyPnl" }}>
          <DailyPnlCard />
        </div>

        <div style={{ gridArea: "best" }}>
          <GeneralCard title="Best Trade" value={0} />
        </div>

        <div style={{ gridArea: "worst" }}>
          <GeneralCard title="Worst Trade" value={0} />
        </div>

        <div style={{ gridArea: "profitFactor" }}>
          <GeneralCard title="Profit Factor" value={0} />
        </div>

        <div style={{ gridArea: "diversification" }}>
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
