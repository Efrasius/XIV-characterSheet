import PropTypes from 'prop-types'
import '../style/header.css'

function Header(props) {
    const {pageTitle} = props;

    return(
        <header>
            <div className="banner">
                <h1 className="pageTitle">{pageTitle}</h1>
            </div>
        </header>
    )
}

Header.propTypes = {
    pageTitle: PropTypes.string
}

export default Header;