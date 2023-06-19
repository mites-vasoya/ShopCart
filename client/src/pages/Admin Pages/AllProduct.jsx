/* eslint-disable no-lone-blocks */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

//MaterialUI Components import...
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

import DeleteIcon from "@mui/icons-material/DeleteRounded";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import { margin } from "@mui/system";
import { ImageForList } from "../../components/Images/Images";
import Spinner from "../../components/Spinner";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "./AllProduct.css";
import {
  fetchProducts,
  removeProduct,
  reset,
  updateProduct,
} from "../../features/admin/adminSlice";

const columns = [
  {
    id: "prodImage",
    label: "Image",
    width: "10px",
    align: "center",
  },
  {
    id: "prodStatus",
    label: "Status",
    width: "10%",
    align: "center",
  },
  {
    id: "prodName",
    label: "Name",
    width: "55%",
    align: "center",
  },
  {
    id: "prodCategory",
    label: "Category",
    width: "3%",
    align: "center",
  },
  {
    id: "prodDesc",
    label: "Description",
    width: "70%",
    align: "center",
  },
  {
    id: "prodQuantity",
    label: "Quantity",
    width: "16%",
    align: "center",
  },
  {
    id: "prodPrice",
    label: "Price",
    align: "center",
  },
  {
    id: "discount",
    label: "Discount (%)",
    width: "16%",
    align: "center",
  },
  {
    id: "rating",
    label: "Rating",
    width: "5%",
    align: "center",
  },
  {
    id: "paymentType",
    label: "Delivery Type",
    width: "8%",
    align: "center",
  },
  // {
  //   id: 'prodImage',
  //   label: 'Image',
  //   minWidth: 170,
  //   align: 'right',
  // },
];

function Row({ row }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  const handleEditButton = () => {
    const state = row;
    navigate("/admin/editproduct/", { state });
  };

  const handleDeleteConfirmation = (response) => {
    if (response === "yes") {
      setDeleteConfirmation(false);
      //console.log("Response : ", row._id);
      dispatch(removeProduct(row._id));
    } else if (response === "cancel") {
      setDeleteConfirmation(false);
      //console.log("Response : ", response);
    }
  };

  const handleRemoveButton = () => {
    setDeleteConfirmation(true);
  };

  const handleCloseConfirmation = () => {
    setDeleteConfirmation(false);
  };

  return (
    <>
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

          const quantity = row.prodQuantity;
          let status = "";
          const images = row.prodImage;
          if (quantity < 5 && quantity > 0) {
            status = (
              <div
                style={{
                  fontSize: "15px",
                  backgroundColor: "orange",
                  color: "white",
                  height: "fit-content",
                }}
              >
                Low Stock
              </div>
            );
          } else if (quantity === 0) {
            status = (
              <div
                style={{
                  fontSize: "15px",
                  backgroundColor: "#CD0404",
                  color: "white",
                }}
              >
                Out Of Stock
              </div>
            );
          } else {
            status = (
              <div
                style={{
                  fontSize: "15px",
                  backgroundColor: "green",
                  color: "white",
                }}
              >
                Active
              </div>
            );
          }

          return (
            <>
              <TableCell key={column.id} align={column.align}>
                <div
                  style={{
                    whiteSpace: "wrap",
                    textOverflow: "ellipsis",
                    overflow: "clip",
                    height: "100px",
                  }}
                >
                  {column.id === "prodImage" ? (
                    <div className="detailed-page-image">
                      <ImageForList prodImage={images} />
                    </div>
                  ) : column.id === "prodStatus" ? (
                    <div>{status}</div>
                  ) : column.id === "prodName" ? (
                    <>
                      <div className="all-products-prod-name">{value}</div>
                    </>
                  ) : column.id === "prodDesc" ? (
                    <>
                      <div className="all-products-prod-desc">{value}</div>
                    </>
                  ) : column.id === "prodPrice" ? (
                    <>
                      <div style={{ width: "90px" }}>
                        {value.toLocaleString("en-IN") + " ₹"}
                      </div>
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
          <div>
            {/* <Link to="/admin/updateproduct" style={{
            textDecoration: "none",
          }}> */}
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              style={{
                width: "100px",
                margin: "3px",
                textDecoration: "none",
              }}
              onClick={handleEditButton}
            >
              Edit
            </Button>
            {/* </Link> */}
          </div>
          <div>
            <Button
              variant="outlined"
              startIcon={<DeleteIcon />}
              style={{
                width: "100px",
                margin: "3px",
              }}
              color="error"
              onClick={handleRemoveButton}
            >
              Delete
            </Button>
          </div>
        </TableCell>
      </TableRow>

      <Dialog
        open={deleteConfirmation}
        onClose={handleCloseConfirmation}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are You Sure want to Delete this Product ?"}
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

function AllProduct() {
  const dispatch = useDispatch();

  const { products, isLoading, isFetching, isError, message } = useSelector(
    (state) => state.product
  );

  //For Pagination...
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // //console.log("Products : ", products);
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (products) {
      dispatch(fetchProducts());
    }

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  if (isLoading) {
    // //console.log("Fetching Products...");
    return <Spinner />;
  }

  return (
    <>
      <section
        className="all-products-table"
        style={{ marginTop: "55px", zIndex: "0" }}
      >
        {products.length > 0 ? (
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
                    {products
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
                count={products.length}
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
            No Products Found, 
            <Link to="/admin/addproduct">Click Here To Add Products</Link>
          </div>
        )}
      </section>
    </>
  );
}

export default AllProduct;
