import { Link } from "react-router-dom";
import { ReactComponent as LogoDark1 } from "src/assets/images/logos/dark1-logo.svg";
import logoImg from 'src/assets/images/logos/logo.png';
import { styled } from "@mui/material";

const LinkStyled = styled(Link)(() => ({
 
  width: "auto",
 
  overflow: "hidden",
  display: "block",
}));

const Logo = ({height}) => {
  return (
    <LinkStyled
      to="#"
      
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <img style={{ background: "#222629",  padding:"10px",borderRadius: '5px', width:"200px"}} src={logoImg} alt="Logo" />
    </LinkStyled>
  );
};

export default Logo;
