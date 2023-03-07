import React, { useState, useEffect } from "react";
import "./tradeAndWin.css";
import { Dialog, Grid } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ReactComponent as Star } from "../../../svg/star.svg";
import { IsApprove, Url } from "../../../global";
import Toast from "../../commonComponet/Toast";
import NewDate from "../../commonComponet/NewDate";

const TradeAndWin = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState("product");
  const [open, setOpen] = useState(false);
  const [productList, setProductList] = useState([]);
  const [productDetail, setProductDetail] = useState(null);
  const [orderList, setOrderList] = useState([]);
  const [cartData, setCartData] = useState([]);
  const [availableLot, setAvailableLot] = useState(null);
  const [mainLoader, setMainLoader] = useState({
    order: true,
    Product: true,
    cart: true,
    lot: true,
    button: {},
  });
  useEffect(() => {
    if (id) {
      setTab("order");
    }
  }, []);
  useEffect(() => {
    fetchProduct();
    fetchOrder();
    fetchCart();
    fetchAvailableLots();
  }, []);

  const fetchProduct = async () => {
    try {
      const param = new FormData();
      if (IsApprove !== "") {
        param.append("is_app", IsApprove.is_app);
        param.append("user_id", IsApprove.user_id);
        param.append("auth_key", IsApprove.auth);
      }
      param.append("action", "get_trade_win_products");

      let data = await axios.post(`${Url}/ajaxfiles/trade_and_win.php`, param);
      if (data?.status === 200) {
        mainLoader.Product = false;
        setMainLoader({ ...mainLoader });
        setProductList(data?.data?.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  console.log("mainLoader", mainLoader);
  const fetchOrder = async () => {
    try {
      const param = new FormData();
      if (IsApprove !== "") {
        param.append("is_app", IsApprove.is_app);
        param.append("user_id", IsApprove.user_id);
        param.append("auth_key", IsApprove.auth);
      }
      param.append("action", "order_history");
      mainLoader.order = true;
      setMainLoader({ ...mainLoader });
      let data = await axios.post(`${Url}/ajaxfiles/trade_and_win.php`, param);
      if (data?.status === 200) {
        mainLoader.order = false;
        setMainLoader({ ...mainLoader });
        setOrderList(data?.data?.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddToCart = async (product, action) => {
    try {
      const param = new FormData();
      if (IsApprove !== "") {
        param.append("is_app", IsApprove.is_app);
        param.append("user_id", IsApprove.user_id);
        param.append("auth_key", IsApprove.auth);
      }
      param.append("action", action);
      param.append("item_id", product.item_id);
      mainLoader.button[product.item_id] = true;
      setMainLoader({ ...mainLoader });

      let data = await axios.post(`${Url}/ajaxfiles/trade_and_win.php`, param);
      if (data.status === 200) {
        if (data.data.status === "error") {
          mainLoader.button[product.item_id] = false;
          setMainLoader({ ...mainLoader });
          Toast("error", data.data.message);
        } else {
          fetchCart();
          fetchAvailableLots();
          mainLoader.lot = false;
          setMainLoader({ ...mainLoader });
          Toast("success", data.data.message);
          mainLoader.button[product.item_id] = false;
          setMainLoader({ ...mainLoader });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCart = async () => {
    try {
      const param = new FormData();
      if (IsApprove !== "") {
        param.append("is_app", IsApprove.is_app);
        param.append("user_id", IsApprove.user_id);
        param.append("auth_key", IsApprove.auth);
      }
      param.append("action", "get_cart_data");

      let data = await axios.post(`${Url}/ajaxfiles/trade_and_win.php`, param);
      if (data?.status === 200) {
        mainLoader.cart = false;
        setMainLoader({ ...mainLoader });
        setCartData(data?.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAvailableLots = async () => {
    try {
      const param = new FormData();
      if (IsApprove !== "") {
        param.append("is_app", IsApprove.is_app);
        param.append("user_id", IsApprove.user_id);
        param.append("auth_key", IsApprove.auth);
      }
      param.append("action", "get_available_lots");

      let data = await axios.post(`${Url}/ajaxfiles/trade_and_win.php`, param);
      if (data?.data?.status === "ok") {
        mainLoader.lot = false;
        setMainLoader({ ...mainLoader });
        setAvailableLot(data?.data?.available_lots);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="app-content--inner">
        <div className="app-content--inner__wrapper mh-100-vh">
          {mainLoader.Product == true ||
          mainLoader.order == true ||
          mainLoader.lot == true ||
          mainLoader.cart == true ? (
            <div className="loader1">
              <span className="loader2"></span>
            </div>
          ) : (
            <div style={{ opacity: 1 }}>
              <Grid container>
                <Grid item sm={11}></Grid>
                <Grid item xl={1}></Grid>
                <Grid item xl={10} md={12} lg={12}>
                  <div className="trade-main-body">
                    <h1 className="trade-main-heading">
                      Traded lots: {availableLot}
                    </h1>
                    <NavLink to="/prize-lots" className="trade-link">
                      WHAT ARE PRIZE LOTS?
                    </NavLink>
                    <div className="trade-body">
                      <div className="trade-tab-button">
                        <button
                          className={tab === "product" ? "active-tab" : ""}
                          onClick={() => setTab("product")}
                        >
                          {`CART: ${cartData?.cart_items} ITEMS, ${cartData?.total_added_lots} LOTS`}
                        </button>
                        <button
                          className={tab === "order" ? "active-tab" : ""}
                          onClick={() => setTab("order")}
                        >
                          ORDER HISTORY
                        </button>
                        {cartData?.cart_items == "0" ? (
                          ""
                        ) : (
                          <button onClick={() => navigate("/cart")}>
                            Check Out
                          </button>
                        )}
                      </div>
                      {tab === "product" ? (
                        <div className="trade-product-block">
                          {productList.map((product) => {
                            let isAdded = cartData?.data?.filter(
                              (item) => item.item_id === product.item_id
                            );
                            return (
                              <div
                                className="trade-product-card"
                                key={product?.item_id}
                              >
                                <div
                                  onClick={() => {
                                    setOpen(true);
                                    setProductDetail(product);
                                  }}
                                >
                                  <div className="product-img-block">
                                    <img
                                      src={product?.item_image}
                                      alt="product"
                                    />
                                  </div>
                                  <h1 className="product-name">
                                    {product?.item_name}
                                  </h1>
                                  <div className="product-lots-block">
                                    <p>{`${product?.item_lot_size} lots`}</p>
                                    <div>
                                      <Star />
                                      <p>5</p>
                                    </div>
                                  </div>
                                </div>
                                <div className="product-add-btn">
                                  {" "}
                                  {isAdded?.length > 0 ? (
                                    <>
                                      {mainLoader.button[product?.item_id] ==
                                      true ? (
                                        <button disabled>
                                          <svg
                                            className="spinner"
                                            viewBox="0 0 50 50"
                                            style={{ position: "inherit" }}
                                          >
                                            <circle
                                              className="path"
                                              cx="25"
                                              cy="25"
                                              r="20"
                                              fill="none"
                                              stroke-width="5"
                                            ></circle>
                                          </svg>
                                        </button>
                                      ) : (
                                        <button
                                          onClick={() =>
                                            handleAddToCart(
                                              product,
                                              "remove_cart_item"
                                            )
                                          }
                                        >
                                          REMOVE
                                        </button>
                                      )}
                                    </>
                                  ) : (
                                    <>
                                      {" "}
                                      {mainLoader.button[product?.item_id] ==
                                      true ? (
                                        <button disabled>
                                          <svg
                                            className="spinner"
                                            viewBox="0 0 50 50"
                                            style={{ position: "inherit" }}
                                          >
                                            <circle
                                              className="path"
                                              cx="25"
                                              cy="25"
                                              r="20"
                                              fill="none"
                                              stroke-width="5"
                                            ></circle>
                                          </svg>
                                        </button>
                                      ) : (
                                        <button
                                          onClick={() =>
                                            handleAddToCart(
                                              product,
                                              "add_to_cart"
                                            )
                                          }
                                        >
                                          ADD TO CART
                                        </button>
                                      )}
                                    </>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="trade-order-list">
                          {orderList.length == 0 ? (
                            <div className="noOrderHistory">
                              There are no records to display
                            </div>
                          ) : (
                            <>
                              {" "}
                              {orderList?.map((order) => (
                                <div className="trade-order-body">
                                  <div className="trade-order-img-block">
                                    <img src={order?.item_image} alt="order" />
                                  </div>
                                  <div className="trade-order-name">
                                    <p>{order.item_name}</p>
                                    <p>{`${order.item_lot_size} lots`}</p>
                                  </div>
                                  {order.status == "0" ? (
                                    <p className="text-color-yellow font-12m">
                                      Pending
                                    </p>
                                  ) : order.status == "3" ? (
                                    <p className="trade-order-status  font-12m">
                                      Delivered
                                    </p>
                                  ) : order.status == "4" ? (
                                    <p className="text-color-red font-12m">
                                      Canceled
                                    </p>
                                  ) :order.status == "2" ? (
                                    <p className="trade-order-status font-12m">
                                       Out For Delivery
                                    </p>
                                  ) :order.status == "1" ? (
                                    <p className="trade-order-status font-12m">
                                      In Transit
                                    </p>
                                  ) :""}
                                  {/* <p className="trade-order-status">Delivered</p> */}
                                  <p className="trade-order-date font-12m">
                                    {order.added_datetime}
                                  </p>
                                </div>
                              ))}
                            </>
                          )}
                        </div>
                      )}
                    </div>
                    <Dialog
                      open={open}
                      onClose={() => {
                        setOpen(false);
                        setProductDetail(null);
                      }}
                      className="product-detail-modal"
                    >
                      <CloseIcon
                        onClick={() => {
                          setOpen(false);
                          setProductDetail(null);
                        }}
                        className="product-modal-close"
                      />
                      <div className="product-detail-main">
                        <div className="product-detail-left">
                          <div className="product-img-block">
                            <img
                              src={productDetail?.item_image}
                              alt="product"
                            />
                          </div>
                          <div className="product-sub-img">
                            <div>
                              <img
                                src={productDetail?.item_image}
                                alt="product"
                              />
                            </div>
                            <div>
                              <img
                                src={productDetail?.item_image}
                                alt="product"
                              />
                            </div>
                            <div>
                              <img
                                src={productDetail?.item_image}
                                alt="product"
                              />
                            </div>
                          </div>
                          <h1
                            className="product-name"
                            style={{ marginBottom: "12px" }}
                          >
                            {productDetail?.item_name}
                          </h1>
                          <div className="product-lots-block">
                            <p>{`${productDetail?.item_lot_size} lots`}</p>
                            <div>
                              <Star />
                              <p>5</p>
                            </div>
                          </div>
                          <div className="product-add-btn">
                            {cartData?.data?.filter(
                              (item) => item.item_id === productDetail?.item_id
                            ).length > 0 ? (
                              <button
                                onClick={() =>
                                  handleAddToCart(
                                    productDetail,
                                    "remove_cart_item"
                                  )
                                }
                              >
                                REMOVE
                              </button>
                            ) : (
                              <button
                                onClick={() =>
                                  handleAddToCart(productDetail, "add_to_cart")
                                }
                              >
                                ADD TO CART
                              </button>
                            )}
                          </div>
                        </div>
                        <div>
                          <h1 className="product-detail-heading">
                            DESCRIPTION
                          </h1>
                          <hr className="product-detail-hr" />
                          <h6 className="product-detail-description">
                            {productDetail?.item_full_description}
                          </h6>
                        </div>
                      </div>
                    </Dialog>
                  </div>
                </Grid>
              </Grid>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TradeAndWin;
