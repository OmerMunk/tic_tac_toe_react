import './CellStyle.css';
import {PLAYER_1_STAMP} from "../Board/Board";

const Cell = (props) => {
    const {onClick, content, xAxis, yAxis} = props
    return (
        <div
            onClick={() => {
                onClick(xAxis, yAxis)
            }}
            className='cell'
            style={{color: content === PLAYER_1_STAMP ? "red" : "green", fontSize: `${props.fontSize}px`}}

        >
            {content}
        </div>
    )
}

export default Cell
