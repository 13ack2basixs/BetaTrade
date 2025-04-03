const Features = () => {
  return (
    <section id="features">
      <div className="features-container">
        <h2>Features</h2>
        <div className="feature-list">
          <div className="feature">
            <h3>Real-time Stock Data</h3>
            <p>ccess live stock data to track market performance and make informed trading decisions</p>
          </div>
          <div className="feature">
            <h3>Paper Trading</h3>
            <p>Trade with simulated funds to practice without any risk</p>
          </div>
          <div className="feature">
            <h3>Portfolio Management</h3>
            <p>Manage your portfolio, track your investments, and visualize your growth over time</p>
          </div>
          <div className="feature">
            <h3>Order History</h3>
            <p>Keep track of your trading activity and analyze your past decisions to learn and improve</p>
          </div>
        </div>
        <div className="future-implementations">
            <p>In the future, we hope to implement these extra features:</p>
            <ul>
                <li>Walkthrough for beginners</li>
                <li>AI model to rate your trading activity</li>
                <li>Gamification to allow you to gain more virtual currency</li>
            </ul>
            <p>So stay tuned!</p>
        </div>
      </div>
    </section>
  );
};

export default Features;
