import style from "../styles/Home.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(style);

const Home = () => {
  return (
    <div className={cx("container")}>
      <img
        src={
          "http://www.palacetours.com/uploads/tours/tour966/a65668d5cc65418e84380446dcbfcb7c.jpg"
        }
      />
      <img
        src={
          "http://www.palacetours.com/uploads/tours/tour966/a65668d5cc65418e84380446dcbfcb7c.jpg"
        }
      />
      <img
        src={
          "http://www.palacetours.com/uploads/tours/tour966/a65668d5cc65418e84380446dcbfcb7c.jpg"
        }
      />
      <img
        src={
          "http://www.palacetours.com/uploads/tours/tour966/a65668d5cc65418e84380446dcbfcb7c.jpg"
        }
      />
    </div>
  );
};

export default Home;
