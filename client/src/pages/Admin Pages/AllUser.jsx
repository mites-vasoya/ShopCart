/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  fetchOrderUserwise,
  reset,
  blockUnblockUser,
  deleteUser,
} from "../../features/users/usersSlice";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { toast } from "react-toastify";
import { TablePagination } from "@mui/material";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUp from "@mui/icons-material/KeyboardArrowUp";
import Spinner from "../../components/Spinner";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import "../Admin Pages/AllUser.css";

const columns = [
  {
    id: "name",
    label: "User Name",
    width: "120px",
    align: "center",
  },
  {
    id: "email",
    label: "Email ",
    width: "60px",
    align: "center",
  },
  {
    id: "phoneNumber",
    label: "Mobile No.",
    width: "120px",
    align: "center",
  },
  {
    id: "emailVerified",
    label: "Is Email Verified",
    width: "120px",
    align: "center",
  },
  {
    id: "userStatus",
    label: "User Status",
    width: "100px",
    align: "center",
  },
  {
    id: "orders",
    label: "Orders",
    width: "120px",
    align: "center",
  },
  {
    id: "buttons",
    label: "",
    width: "120px",
    align: "center",
  },
];

const subColumns = [
  // {
  //   id: "userId",
  //   label: "userId",
  //   width: "120px",
  //   align: "center",
  // },
  {
    id: "createdAt",
    label: "Order Date",
    width: "120px",
    align: "center",
    format: (value) => value.slice(0, 10),
    textAlign: "center",
  },
  {
    id: "prodName",
    label: "Product Name",
    width: "650px",
    align: "center",
    textAlign: "left",
  },
  {
    id: "status",
    label: "Status",
    width: "100px",
    align: "center",
    textAlign: "center",
  },
  {
    id: "quantity",
    label: "Quantity",
    width: "180px",
    align: "center",
    textAlign: "center",
  },

  {
    id: "totalAmount",
    label: "Total Amount (₹)",
    width: "80px",
    align: "right",
    textAlign: "right",
    format: (value) => value.toLocaleString("en-IN"),
  },
  {
    id: "paymentType",
    label: "Delivery Type",
    width: "80px",
    align: "center",
    textAlign: "center",
  },
];

function OrderRow(props) {
  const { order } = props;
  const { userId } = props;
  // //console.log("Order Data : ", userId);

  //Filtering Orders by User...

  // eslint-disable-next-line no-lone-blocks

  // eslint-disable-next-line no-unused-expressions
  return userId === order.userId ? (
    <TableRow
      hover
      role="checkbox"
      tabIndex={-1}
      key={order._id}
      sx={{ margin: "2px", padding: "0px", width: "100px" }}
    >
      {subColumns.map((column) => {
        const value = order[column.id];
        return (
          <TableCell align={column.textAlign}>
            {column.id === "totalAmount" ? (
              <>{column.format ? column.format(value) + " ₹" : value + " ₹"}</>
            ) : (
              <>{column.format ? column.format(value) : value}</>
            )}
          </TableCell>
        );
      })}
    </TableRow>
  ) : (
    ""
  );
}

function Row({ user }) {
  const [open, setOpen] = useState(false);
  const [blockConfirmation, setBlockConfirmation] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  const dispatch = useDispatch();
  const { ordersUserwise, isError, message } = useSelector(
    (state) => state.users
  );

  const isBlocked = user.isBlocked;
  const isDeleted = user.isDeleted;

  const handleOrdersButton = () => {
    setOpen(!open);
  };

  const handleBlockConfirmation = (response) => {
    if (response === "yes") {
      setBlockConfirmation(false);
      const userData = {
        userId: user._id,
        blocked: !user.isBlocked,
      };
      dispatch(blockUnblockUser(userData));
    } else if (response === "cancel") {
      setBlockConfirmation(false);
    }
  };

  const handleCloseConfirmation = () => {
    setBlockConfirmation(false);
  };

  const handleBlockButton = () => {
    setBlockConfirmation(true);
  };

  const handleDeleteConfirmation = (response) => {
    if (response === "yes") {
      setDeleteConfirmation(false);
      //console.log("Response : ", response);
      const userId = { userId: user._id };
      dispatch(deleteUser(userId));
    } else if (response === "cancel") {
      setDeleteConfirmation(false);
      //console.log("Response : ", response);
    }
  };

  const handleDeleteButton = () => {
    setDeleteConfirmation(true);
  };

  return (
    <>
      <TableRow
        hover
        role="checkbox"
        tabIndex={-1}
        // key={row._id}
        sx={{ margin: "2px", padding: "0px" }}
      >
        {columns.map((column) => {
          const value = user[column.id];
          return (
            <TableCell key={value} align={column.align}>
              {column.id === "buttons" ? (
                isDeleted === true ? (
                  <></>
                ) : isBlocked === false ? (
                  <>
                    <div className="block-delete-button">
                      <input
                        type="button"
                        value="Block User"
                        id="block-user-btn"
                        onClick={handleBlockButton}
                      />
                      <input
                        type="button"
                        value="Delete User"
                        id="delete-user-btn"
                        onClick={handleDeleteButton}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="block-delete-button">
                      <input
                        type="button"
                        value="Unblock User"
                        id="block-user-btn"
                        onClick={handleBlockButton}
                      />
                      <input
                        type="button"
                        value="Delete User"
                        id="delete-user-btn"
                        onClick={handleDeleteButton}
                      />
                    </div>
                  </>
                )
              ) : column.id === "userStatus" ? (
                user["isDeleted"] === true ? (
                  <>
                    <div
                      style={{
                        width: "100px",
                        marginRight: "auto",
                        marginLeft: "auto",
                        backgroundColor: "#900000",
                        color: "white",
                        padding: "2px 0px",
                      }}
                    >
                      Deleted
                    </div>
                  </>
                ) : user["isBlocked"] === true ? (
                  <>
                    <div
                      style={{
                        width: "100px",
                        marginRight: "auto",
                        marginLeft: "auto",
                        backgroundColor: "#E86A33",
                        color: "white",
                        padding: "2px 0px",
                      }}
                    >
                      Blocked
                    </div>
                  </>
                ) : (
                  <>
                    <>
                      <div
                        style={{
                          width: "100px",
                          marginRight: "auto",
                          marginLeft: "auto",
                          backgroundColor: "#41644A",
                          color: "white",
                          padding: "2px 0px",
                        }}
                      >
                        Active
                      </div>
                    </>
                  </>
                )
              ) : column.id !== "orders" ? (
                String(value)
              ) : (
                //Collapse Button...

                <IconButton
                  aria-label="expand row"
                  size="small"
                  onClick={handleOrdersButton}
                >
                  {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                </IconButton>
              )}
            </TableCell>
          );
        })}
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    {subColumns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{
                          width: column.width,
                          fontWeight: "bold",
                          borderBottom: "1px solid black",
                        }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ordersUserwise.map((order) => {
                    const userId = user._id;
                    return <OrderRow order={order} userId={userId} />;
                  })}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>

      <Dialog
        open={blockConfirmation}
        onClose={handleCloseConfirmation}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {isBlocked ? (
          <>
            <DialogTitle id="alert-dialog-title">
              {"Are You Sure want to Unblock this user ?"}
            </DialogTitle>
          </>
        ) : (
          <>
            <DialogTitle id="alert-dialog-title">
              {"Are You Sure want to Block this user ?"}
            </DialogTitle>
          </>
        )}

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
            onClick={() => handleBlockConfirmation("yes")}
            autoFocus
          >
            Yes
          </Button>
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
            onClick={() => handleBlockConfirmation("cancel")}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={deleteConfirmation}
        onClose={handleCloseConfirmation}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are You Sure want to Delete this user ?"}
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
            onClick={() => handleDeleteConfirmation("yes")}
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
            onClick={() => handleDeleteConfirmation("cancel")}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

function AllUser() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const {
    users,
    ordersUserwise,
    isUserFetching,
    isOrderFetching,
    isUsersFetched,
    isError,
    userSliceMessage,
  } = useSelector((state) => state.users);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    if (isError) {
      toast.error(userSliceMessage);
    }

    if (users) {
      dispatch(fetchUsers());
    }

    if (ordersUserwise) {
      dispatch(fetchOrderUserwise());
      // //console.log("Orders Userwise : ", ordersUserwise);
    }

    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError, userSliceMessage]);

  if (isUserFetching || isOrderFetching) {
    return <Spinner />;
  }
  return (
    <section className="all-users-table" style={{ marginTop: "55px" }}>
      {users.length > 0 ? (
        <div className="users">
          <Paper
            sx={{
              width: "95%",
              overflow: "hidden",
              marginLeft: "auto",
              marginRight: "auto",
              border: "0.1px solid black",
            }}
          >
            <TableContainer
              sx={{ height: "750px" }}
              style={{ overflowY: "scroll" }}
            >
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
                          zIndex: "0",
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
                  {users
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((user) => {
                      return <Row user={user} />;
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={users.length}
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
          No Users Found
        </div>
      )}
    </section>
  );
}

export default AllUser;
