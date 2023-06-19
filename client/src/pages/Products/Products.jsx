import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../features/products/productsSlice";
import Filter from "../../components/Filter";
import { ProductCardsGrid } from "../../components/ProductCardGrid";
import { ProductFetchingSpinner } from "../../components/Spinner";
import "./Products.css";
import { toast } from "react-toastify";
import { resetIs } from "../../features/user/userSlice";

function ProductsList({
  filteredProductArray,
  wishlist,
  category,
  showProducts,
}) {
  return (
    <>
      <div
        className="productCards"
        style={{ width: "90%", marginLeft: "10px", marginTop: "40px" }}
      >
        <ProductCardsGrid products={filteredProductArray} wishlist={wishlist} />
      </div>
    </>
  );
}

function Products() {
  const location = useLocation();
  const dispatch = useDispatch();

  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get("category");

  const [priceSliderValue, setPriceSliderValue] = useState([100, 200000]);
  const [ratingValue, setRatingValue] = useState(null);
  const [PODEligibility, setPODEligibility] = useState(false);
  const [discount, setDiscount] = useState();
  const [includeOutOfStock, setIncludeOutOfStock] = useState(false);
  const [page, setPage] = useState(1);
  const [product, setProduct] = useState([]);
  const [moreProducts, setMoreProducts] = useState(true);
  const [showSpinner, setShowSpinner] = useState(false);
  const [showLoadMoreBtn, setShowLoadMoreBtn] = useState(false);
  const [sortBy, setSortBy] = useState("newArrivals");
  let filter = {
    price: priceSliderValue,
    rating: ratingValue,
    POD: PODEligibility,
    includeOutOfStock: includeOutOfStock,
    discount: discount,
  };

  let productArray = [];

  const { products, isLoading, isFetching, isError, productMessage } =
    useSelector((state) => state.products);

  const { wishlist, isAddedCart, userSliceMessage } = useSelector(
    (state) => state.user
  );

  let prodReqData = {
    page: page,
    category: category,
    sortBy: sortBy,
    filter: filter,
  };

  useEffect(() => {
    if (isFetching) {
      setShowSpinner(true);
    } else {
      setShowSpinner(false);
    }
  }, [isFetching]);

  useEffect(() => {
    if (isAddedCart) {
      toast.success("Added To Cart");
    }

    return () => {
      dispatch(resetIs());
    };
  }, [isAddedCart]);

  useEffect(() => {
    if (page > 1) fetchProductsData();
  }, [page]);

  useEffect(() => {
    if (products.products?.length > 0) {
      setProduct((prev) => [...prev, ...products.products]);
      setMoreProducts(products.moreProduct);
      if (products.moreProduct === true) {
        setShowLoadMoreBtn(true);
      } else {
        setShowLoadMoreBtn(false);
      }
    }
  }, [products]);

  useEffect(() => {
    setProduct([]);
    fetchProductData();
  }, [
    sortBy,
    priceSliderValue,
    ratingValue,
    PODEligibility,
    discount,
    includeOutOfStock,
  ]);

  const handleSorting = (newValue) => {
    setSortBy(newValue);
  };

  const handleLoadMoreProdButton = async () => {
    try {
      setPage((prev) => prev + 1);
    } catch (error) {
      //console.log(error);
    }
  };

  const fetchProductsData = () => {
    filter = {
      price: priceSliderValue,
      rating: ratingValue,
      POD: PODEligibility,
      includeOutOfStock: includeOutOfStock,
      discount: discount,
    };
    if (moreProducts) {
      dispatch(fetchProducts(prodReqData));
      //console.log("Dispatch More : ", prodReqData);
      prodReqData = {
        page: page,
        category: category,
        sortBy: sortBy,
        filter: filter,
      };
    }
  };

  const fetchProductData = () => {
    filter = {
      price: priceSliderValue,
      rating: ratingValue,
      POD: PODEligibility,
      includeOutOfStock: includeOutOfStock,
      discount: discount,
    };
    setPage(1);
    prodReqData = {
      page: 1,
      category: category,
      sortBy: sortBy,
      filter: filter,
    };
    dispatch(fetchProducts(prodReqData));
    prodReqData = {
      page: page,
      category: category,
      sortBy: sortBy,
      filter: filter,
    };
  };

  if (products?.products?.length > 0) {
    product.map((product) => productArray.push(product));
  }

  return (
    <>
      <div className="page-container">
        <Filter
          priceSliderValue={priceSliderValue}
          setPriceSliderValue={setPriceSliderValue}
          ratingValue={ratingValue}
          setRatingValue={setRatingValue}
          PODEligibility={PODEligibility}
          setPODEligibility={setPODEligibility}
          discount={discount}
          setDiscount={setDiscount}
          includeOutOfStock={includeOutOfStock}
          setIncludeOutOfStock={setIncludeOutOfStock}
        />
        <div className="product-container">
          <div className="product-title-div">
            <div id="products-title">{category}</div>
            <div id="products-sort-box">
              <select
                value={sortBy}
                onChange={(e) => handleSorting(e.target.value)}
              >
                <option value="newArrivals">Newest Arrivals</option>
                <option value="priceHighToLow">Price : High to Low</option>
                <option value="priceLowToHigh">Price : Low to High</option>
                <option value="highRating">High Rating</option>
              </select>
            </div>
          </div>
          <div
            style={{
              marginLeft: "100px",
              width: "fitContent",
              display: "block",
            }}
          >
            <ProductsList
              filteredProductArray={productArray}
              wishlist={wishlist}
              category={category}
            />
          </div>
          {showLoadMoreBtn ? (
            <>
              <div className="load-more-prod-button">
                <input
                  type="button"
                  value="Load More..."
                  onClick={handleLoadMoreProdButton}
                />
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}

export default Products;
