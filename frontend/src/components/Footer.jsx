export default function Footer() {
    return (
        <div style={{
            padding: "5px 0px", 
            backgroundColor: "rgb(232, 227, 227)", 
            textAlign: 'center', 
            position: 'fixed', 
            borderRadius: '10px', 
            width: '50%', 
            height: '50px', 
            bottom: '0px', 
            left: '50%', 
            transform: 'translateX(-50%)', 
            zIndex: '999'
        }}>
            <div className="text-center">
                <h5 style={{ margin: '5px 0' }}>
                    Made by <a href="" style={{ textDecoration: "none", color: "red" }}>Team 6556</a>
                </h5>
            </div>
        
        </div>
    );
}
