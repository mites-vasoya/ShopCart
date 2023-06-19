import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { reset } from "../features/auth/authSlice";
import ImageSlider from "../components/ImageSlider";
import NewArrivals from "../components/DashboardComponents/NewArrivals";
import TrandingProducts from "../components/DashboardComponents/TrendingProducts";
import { toast } from "react-toastify";
import "./HomePage.css";
import TopSellingProducts from "../components/DashboardComponents/TopSellingProducts";

function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { user, isVerified, isError, message } = useSelector(
    (state) => state.auth
  );
  const [blur, setBlur] = useState(false);
  const [height, setHeight] = useState();

  useEffect(() => {
    if (isError) {
      toast.error("Error : ", message);
    }

    if (!user) {
      navigate("/");
    }

    if (isVerified) {
      setBlur(false);
      reset();
    }

    if (user) {
      if (user.role === "admin") {
        navigate(`/admin/dashboard`);
      } else {
        if (user?.user.isDeleted) {
          //console.log("USER IS DELETED...");
          
          // navigate("/deleteduser");
        } else if (user?.user.isBlocked) {
          navigate("/blockeduser");
        } else if (location.state?.from === "/register") {
          navigate("/user/verification", { state: { email: user.user.email } });
          setBlur(true);
        } else {
          navigate("/");
        }
      }
    }

    return () => {
      dispatch(reset());
    };
  }, [user, isError, message, navigate, dispatch, isVerified]);

  return (
    <>
      <>
        <div className="image-slider-component">
          <ImageSlider />
        </div>
        <div className="new-arrivals-component">
          <NewArrivals />
        </div>
        <div className="trending-products-component">
          <TrandingProducts />
        </div>
        <div className="top-selling-products-component">
          <TopSellingProducts />
        </div>
      </>
    </>
  );
}

export default HomePage;
