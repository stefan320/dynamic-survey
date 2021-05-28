import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  Header: {
    borderBottom: `1px solid ${theme.palette.primary.main}`,
  },
  Header__Container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    display: "block",
    maxWidth: "4rem",
    padding: "0.5rem 0",
    margin: "0 auto",
  },
}));
