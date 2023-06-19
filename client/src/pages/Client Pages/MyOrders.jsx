import React, { useEffect, useState } from "react";
import {
  IconButton,
  ImageList,
  ImageListItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Button,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import "./MyOrders.css";
import { reset } from "../../features/admin/adminSlice";
import { Link, useNavigate } from "react-router-dom";
import { Rating } from "@mui/material";
import { toast } from "react-toastify";
import { fetchAllOrders, giveRating } from "../../features/user/userSlice";

const columns = [
  {
    id: "_id",
    label: "Order ID",
    align: "center",
  },
  {
    id: "prodName",
    label: "Product Name",
    align: "center",
    textAlign: "left",
    width: "40%",
  },
  {
    id: "createdAt",
    label: "Order Date",
    align: "center",
    textAlign: "center",
    format: (value) => value.split("T")[0],
  },
  {
    id: "status",
    label: "Status",
  },
  {
    id: "quantity",
    label: "Quantity",
    align: "center",
    textAlign: "center",
    valueAlign: "center",
  },
  {
    id: "totalAmount",
    label: "Amount",
    align: "center",
    valueAlign: "right",
    textAlign: "center",
    format: (value) => value.toLocaleString("en-IN") + " ₹",
  },
  {
    id: "paymentType",
    label: "Payment Method",
    align: "center",
    textAlign: "center",
  },
  {
    id: "rating",
    label: "Rate Product",
    align: "center",
    textAlign: "center",
    width: "10%",
  },
  {
    id: "messageAdmin",
    label: "",
    align: "center",
    textAlign: "center",
  },
];

function Row({ row }) {
  const dispatch = useDispatch();

  let status = "";

  const [openRating, setOpenRating] = useState(false);
  const [ratingValue, setRatingValue] = useState(0);
  const [readOnly, setReadOnly] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [ratingData, setRatingData] = useState({});

  const handleConfirmation = (response) => {
    if (response === "yes") {
      setConfirmation(false);
      setReadOnly(true);
      dispatch(giveRating(ratingData));
      toast.success("Thank You for Feedback...");
    } else if (response === "cancel") {
      setConfirmation(false);
      setReadOnly(false);
      //console.log("Response : ", response);
    }
  };

  const handleCloseConfirmation = () => {
    setConfirmation(false);
  };

  const handleRatingChanges = (event, newValue) => {
    setRatingValue(newValue);

    setRatingData({
      orderId: row._id,
      userId: row.userId,
      productId: row.productId,
      ratingValue: newValue,
    });

    setConfirmation(true);
  };

  return (
    <>
      <TableRow
        hover
        role="checkbox"
        tabIndex={-1}
        sx={{ margin: "2px", padding: "0px" }}
      >
        {columns.map((column) => {
          const value = row[column.id];
          let rate = false;

          if (column.id === "status") {
            status = value;
          }

          if (status === "Success" && (!row.rating || row.rating === 0)) {
            rate = true;
          }

          return (
            <TableCell key={value} align={column.textAlign}>
              {column.id !== "messageAdmin" ? (
                column.id === "totalAmount" || column.id === "createdAt" ? (
                  column.format(value)
                ) : column.id === "prodName" ? (
                  <>
                    <div className="client-order-prod-name">{value}</div>
                  </>
                ) : column.id === "rating" ? (
                  <>
                    {rate === true ? (
                      <>
                        {openRating === true ? (
                          <>
                            <Rating
                              name="simple-controlled"
                              value={ratingValue}
                              onChange={handleRatingChanges}
                              readOnly={readOnly}
                              style={{ zIndex: 0 }}
                            />
                          </>
                        ) : (
                          <div
                            className="rate-text"
                            onClick={() => setOpenRating(true)}
                          >
                            Rate this Product
                          </div>
                        )}
                      </>
                    ) : status === "Success" && rate === false ? (
                      <>
                        <Rating
                          name="read-only"
                          value={row.rating}
                          style={{ zIndex: 0 }}
                          readOnly
                        />
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  value
                )
              ) : status === "Pending" || status === "Success" ? (
                <>
                  <Link to="/buyer/chat">
                    <button className="message-seller-button">
                      Mesage Seller
                    </button>
                  </Link>
                </>
              ) : (
                <></>
              )}
            </TableCell>
          );
        })}
      </TableRow>

      <Dialog
        open={confirmation}
        onClose={handleCloseConfirmation}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are You Sure want to Give Rating ?"} <br />
        </DialogTitle>
        <DialogActions>
          <Button
            sx={{
              height: "35px",
              color: "black",
              fontSize: "15px",
              "&:hover": {
                backgroundColor: "#2a3035",
                border: "0px solid #2a3035",
                color: "white",
              },
            }}
            onClick={() => handleConfirmation("yes")}
            autoFocus
          >
            Yes
          </Button>
          <Button
            sx={{
              height: "35px",
              color: "black",
              fontSize: "15px",
              boxSizing: "border-box",
              "&:hover": {
                backgroundColor: "#2a3035",
                border: "0px solid #2a3035",
                color: "white",
              },
            }}
            onClick={() => handleConfirmation("cancel")}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default function MyOrders() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { orders, isRated } = useSelector((state) => state.user);
  let userId;

  useEffect(() => {
    if (!user) {
      navigate("/");
    }

    if (user) {
      // //console.log("User : ", user)
      dispatch(fetchAllOrders(userId));
    }

    return () => {
      reset();
    };
  }, [dispatch, user, isRated]);

  if (user) {
    userId = user.user._id;
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  //console.log("Order : ", orders);
  return (
    <>
      <section className="content" style={{ marginTop: "55px" }}>
        {orders?.length > 0 ? (
          <div className="users">
            <Paper
              sx={{
                width: "95%",
                overflow: "hidden",
                marginLeft: "2.3%",
                border: "0.1px solid black",
              }}
            >
              <TableContainer sx={{ height: "750px" }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    {/* Print Titles... */}
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column._id}
                          align={column.align}
                          style={{
                            width: column.width,
                            fontWeight: "bold",
                            borderBottom: "1px solid black",
                            zIndex: "1",
                            backgroundColor: "#2a3035",
                            color: "#f0f3ed",
                          }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orders
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => {
                        return <Row row={row} />;
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={orders.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </div>
        ) : (
          <div
            style={{
              textAlign: "center",
              fontFamily: "sans-serif",
              fontSize: "35px",
              fontWeight: "bold",
            }}
          >
            No Orders Found
          </div>
        )}
      </section>
    </>
  );
}
