import { Link } from "react-router-dom";
import { ReactComponent as LogoDark1 } from "src/assets/images/logos/dark1-logo.svg";
import logoImg from 'src/assets/images/logos/logo.png';
import { styled } from "@mui/material";

const LinkStyled = styled(Link)(() => ({
  background: "#222629",
  width: "100%",
  padding:"10px",
  overflow: "hidden",
  display: "block",
}));

const Logo = ({height}) => {
  return (
    <LinkStyled
      to="#"
      width={100}
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <img style={{width:"100%"}} src={logoImg} alt="Logo" />
    </LinkStyled>
  );
};

export default Logo;
