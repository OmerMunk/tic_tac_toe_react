import './DashboardStyle.css';
import {useEffect, useState} from "react";
const Dashboard = (props) => {
    const {currentPlayer, reset} = props;
    const [animation, setAnimation] = useState('');

    useEffect(() => {
        if (props.isWin) {
            let interval = setInterval(() => {
                setAnimation(prevAnimation => {
                    if (prevAnimation === 'glow-big') {
                        return 'glow-small';
                    } else {
                        return 'glow-big';
                    }
                });
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [props.isWin]);

    return(
        <div className='dashboard' >
            <div>
                Player {currentPlayer ? '1' : '2'} turn. mark
                <span style={{color: currentPlayer ? "red" : "green"}}>{currentPlayer ? ' X' : ' O'}</span>
            </div>
            <button className={props.clicks === 1 ? 'disabled-reset-button' : `reset-button ${animation}`} disabled={props.clicks === 1} onClick={reset} >Reset</button>
        </div>
    )
}

export default Dashboard
