import './WinModalStyle.css';

const WinModal = (props) => {
    const {player, display} = props
    const style = {display: display ? 'flex' : 'none', zIndex: display? '1' : '-1'}
    return(
        <div className='win-modal' style={style}>
            Player {player ? '1' : '2'} won!
        </div>
    )
}
export default WinModal
