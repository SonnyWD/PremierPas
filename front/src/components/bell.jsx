import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
function Bell({className}){
    return(
        <button className={className}>
            <FontAwesomeIcon icon={faBell} />
        </button>
    )
}
export default Bell;