import { PropagateLoader } from "react-spinners";
export function Loader() {
  return  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "45vh",
      // backgroundColor: "#172d40",
    }}
  >
    <PropagateLoader color="#ff6d7f" size={28} />
  </div>;
}
