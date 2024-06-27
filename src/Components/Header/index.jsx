const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: 'white',
    padding: '25px',
  };
  

function Header() {
  return (
    <header style={divStyle}> 
      {/* <div style={divStyle}> */}
        <div
          className="d-flex align-center cursor-pointer position-relative"
          id=""
        >
          <a
            href="https://www.smartdubai.ae/"
            aria-label="Dubai Government Logo"
            className="dda-main-header__gov-logo"
            rel="noopener noreferrer nofollow"
          >
            <img
              src="https://cloudfront.dm.gov.ae/themes/assets/images/govtLogo-new.svg"
              className="dda-main-header__logo"
              alt="Dubai Municipality logo"
            />
          </a>
        </div>
        

        <div
          className="d-flex align-center cursor-pointer position-relative"
          id="selectEntity"
        >
          <a href="https://www.dm.gov.ae" aria-label="Dubai Municipality">
            <img
              src="https://cloudfront.dm.gov.ae/themes/assets/images/dmLogo.svg"
              className="dda-main-header__logo"
              alt="Dubai Municipality logo"
            />
          </a>
        </div>
      {/* </div> */}
    </header>
  );
}

export default Header;
