import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  acceptOrder,
  cancelOrder,
  fetchAllOrders,
} from "../../features/admin/adminSlice";
import Spinner from "../../components/Spinner";
import "./Orders.css";

const columns = [
  {
    id: "_id",
    label: "orderId",
    width: "10px",
    align: "center",
  },
  {
    id: "createdAt",
    label: "Order Date",
    width: "10%",
    align: "center",
    format: (value) => value.split("T")[0],
  },
  {
    id: "status",
    label: "Status",
    width: "8%",
    align: "center",
  },
  {
    id: "userId",
    label: "User Name",
    width: "15%",
    align: "center",
  },
  {
    id: "prodName",
    label: "Name",
    width: "35%",
    align: "center",
  },

  {
    id: "quantity",
    label: "Quantity",
    width: "3%",
    align: "center",
  },
  {
    id: "totalAmount",
    label: "Amount",
    width: "7%",
    align: "center",
  },
  {
    id: "paymentType",
    label: "Payment Type",
    width: "8%",
    align: "center",
  },
];

function Row(props) {
  const { row } = props;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleConfirmButton = () => {
    // //console.log("Confirm Button Clicked", row._id);
    dispatch(acceptOrder(row._id));
  };
  const handleCancelButton = () => {
    // //console.log("Cancel Button Clicked", row._id);
    dispatch(cancelOrder(row._id));
  };

  return (
    <TableRow
      hover
      role="checkbox"
      tabIndex={-1}
      key={row}
      sx={{
        margin: "2px",
        padding: "10px",
        height: "10px",
      }}
    >
      {columns.map((column) => {
        const value = row[column.id];

        return (
          <>
            <TableCell
              key={column.id}
              align={column.align}
              style={{ height: "20px" }}
            >
              <div>
                {column.id === "userId" ? (
                  value?.name
                ) : column.id === "prodStatus" ? (
                  <div>{value}</div>
                ) : column.id === "createdAt" ? (
                  column.format(value)
                ) : column.id === "totalAmount" ? (
                  <>{value.toLocaleString("en-IN") + " ₹"}</>
                ) : column.id === "prodName" ? (
                  <>
                    <div className="all-order-prod-name">{value}</div>
                  </>
                ) : (
                  value
                )}
              </div>
            </TableCell>
          </>
        );
      })}
      <TableCell>
        {row.status === "Pending" ? (
          <>
            <div>
              <Button
                variant="outlined"
                style={{
                  width: "100px",
                  margin: "3px",
                  textDecoration: "none",
                }}
                onClick={handleConfirmButton}
              >
                Confirm
              </Button>
            </div>
            <div>
              <Button
                variant="outlined"
                style={{
                  width: "100px",
                  margin: "3px",
                }}
                color="error"
                onClick={handleCancelButton}
              >
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <></>
        )}
      </TableCell>
    </TableRow>
  );
}

function Orders() {
  const dispatch = useDispatch();

  const { allOrders, isLoading } = useSelector((state) => state.admin);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // //console.log("allOrders : ", allOrders);
  return (
    <>
      <section className="all-orders-table" style={{}}>
        {allOrders.length > 0 ? (
          <div className="product">
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
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
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
                      <TableCell
                        style={{
                          borderBottom: "1px solid black",
                          backgroundColor: "#2a3035",
                          color: "#f0f3ed",
                        }}
                      ></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {allOrders
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => {
                        return <Row row={row}></Row>;
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={allOrders.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </div>
        ) : (
          <></>
        )}
      </section>
    </>
  );
}

export default Orders;
