import loading from "assets/loading.gif";
import "./Loading.css";

const Loading = () => {
  return (
    <div className="loading">
      <img src={loading} alt="Loading..." />
    </div>
  );
};

export default Loading;
