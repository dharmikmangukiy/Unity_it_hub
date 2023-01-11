import React, { useState, useEffect } from "react";
import { Grid, Input } from "@mui/material";
import TopButton from "../../customComponet/TopButton";
import { Paper } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputBase from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import ErrorIcon from "@mui/icons-material/Error";
import CustomImageModal from "../../customComponet/CustomImageModal";
import {
  BootstrapInput,
  ColorButton,
} from "../../customComponet/CustomElement";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { IsApprove, Url } from "../../../global";
import axios from "axios";
import InfoIcon from "@mui/icons-material/Info";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import "./profile.css";
import { useNavigate } from "react-router-dom";

const MyDocuments = () => {
  const navigate = useNavigate();
  const [filterData, setFilterData] = useState(null);
  const [option, setOption] = useState(true);
  const [change1, setChange1] = useState(false);
  const [change, setChange] = useState(false);
  const [fontimg, setFontimg] = useState("");
  const [backimg, setBackimg] = useState("");
  const [mainLoader, setMainLoader] = useState(true);
  const [addfontimg, setAddFontimg] = useState("");
  const [addbackimg, setAddBackimg] = useState("");
  const [sendKycRequest, setSendKycRequest] = useState({
    proof1: false,
    proof2: false,
    proof3: false,
  });
  const [twoSide, setTwoSide] = useState({
    addition: false,
    main: false,
  });
  const [proofAdd, setProofAdd] = useState([]);
  const [kycStatus, setKycStatus] = useState("");
  const [document, setDocument] = useState(false);
  const [addressProof, setAddressProof] = useState([]);
  const [additional, setAdditional] = useState([]);
  const [kycStatusMessage, setKycStatusMessage] = useState("");
  const [adddoc, setAddDoc] = useState({
    fontimg: "",
    backimg: "",
    isLoder: "",
  });
  const [doc, setDoc] = useState({
    proof: "Proof of ID",
    id: "id",
    fontimg: "",
    backimg: "",
    idnumber: "",
    isLoder: false,
  });
  console.log("twoside", twoSide);
  const onOtherImage = () => {
    if (doc.proof == "Addition Documents") {
      if (!additional) {
        toast.error("Upload a Image");
      } else {
        const param = new FormData();
        if (IsApprove !== "") {
          param.append("is_app", IsApprove.is_app);
          param.append("user_id", IsApprove.user_id);
          param.append("auth_key", IsApprove.auth);
        }
        param.append("additional_documents", additional);

        axios.post(Url + "/ajaxfiles/update_kyc.php", param).then((res) => {
          if (res.data.message == "Session has been expired") {
            navigate("/");
          }
          if (res.data.status == "error") {
            toast.error(res.data.message);
          } else {
            toast.success(res.data.message);
            setSendKycRequest((prevalue) => {
              return {
                ...prevalue,
                proof3: true,
              };
            });
            fatchKycStatus();
          }
        });
      }
    } else if (doc.proof == "Proof of Address") {
      if (!addressProof) {
        toast.error("Upload a Image");
      } else {
        const param = new FormData();
        if (IsApprove !== "") {
          param.append("is_app", IsApprove.is_app);
          param.append("user_id", IsApprove.user_id);
          param.append("auth_key", IsApprove.auth);
        }
        param.append("proof_of_address", addressProof[0]);
        axios.post(Url + "/ajaxfiles/update_kyc.php", param).then((res) => {
          if (res.data.message == "Session has been expired") {
            navigate("/");
          }
          if (res.data.status == "error") {
            toast.error(res.data.message);
          } else {
            toast.success(res.data.message);

            setSendKycRequest((prevalue) => {
              return {
                ...prevalue,
                proof2: true,
              };
            });
            fatchKycStatus();
          }
        });
      }
    }
  };
  console.log(addressProof[0]);
  console.log("addfontimg", addfontimg);
  const onSubmit = () => {
    console.log("fontimg", fontimg);
    // if (!doc.idnumber) {
    //   toast.error("Id Number is required");
    // } else
    if (!doc.fontimg && !fontimg) {
      toast.error("Please upload documents front side image");
    } else if (twoSide.main && !doc.backimg && !backimg) {
      toast.error("Please upload documents back side image");
    } else {
      doc.isLoder = true;
      setDoc({ ...doc });
      const param = new FormData();
      if (IsApprove !== "") {
        param.append("is_app", IsApprove.is_app);
        param.append("user_id", IsApprove.user_id);
        param.append("auth_key", IsApprove.auth);
      }
      if (doc.fontimg) {
        param.append("aadhar_card_front_image", doc.fontimg);
      }
      if (doc.backimg && twoSide.main) {
        param.append("aadhar_card_back_image", doc.backimg);
      }
      param.append("aadhar_card_number", doc.idnumber);
      param.append("double_sided_documents", twoSide.main ? 1 : 0);

      axios.post(Url + "/ajaxfiles/update_kyc.php", param).then((res) => {
        if (res.data.message == "Session has been expired") {
          navigate("/");
        }
        if (res.data.status == "error") {
          toast.error(res.data.message);
          doc.isLoder = false;
          setDoc({ ...doc });
        } else {
          toast.success(res.data.message);
          fatchKycStatus();
          doc.isLoder = false;
          setDoc({ ...doc });
        }
      });
    }
  };
  const onaddsubmit = () => {
    if (!adddoc.fontimg && !addfontimg) {
      toast.error("Please upload additional documents front side image");
    } else if (!adddoc.backimg && twoSide.addition && !addbackimg) {
      toast.error("Please upload additional documents back side image");
    } else {
      const param = new FormData();
      if (IsApprove !== "") {
        param.append("is_app", IsApprove.is_app);
        param.append("user_id", IsApprove.user_id);
        param.append("auth_key", IsApprove.auth);
      }
      if (adddoc.fontimg) {
        param.append("additional_documents", adddoc.fontimg);
      }
      if (adddoc.backimg && twoSide.addition) {
        param.append("additional_documents_back", adddoc.backimg);
      }
      param.append("additional_double_sided", twoSide.addition ? 1 : 0);

      adddoc.isLoder = true;
      setAddDoc({ ...adddoc });
      axios.post(Url + "/ajaxfiles/update_kyc.php", param).then((res) => {
        if (res.data.message == "Session has been expired") {
          navigate("/");
        }
        if (res.data.status == "error") {
          toast.error(res.data.message);
          adddoc.isLoder = false;
          setAddDoc({ ...adddoc });
        } else {
          adddoc.isLoder = false;
          setAddDoc({ ...adddoc });
          toast.success(res.data.message);
          fatchKycStatus();
        }
      });
    }
  };

  const fatchKycStatus = async () => {
    const param = new FormData();
    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("user_id", IsApprove.user_id);
      param.append("auth_key", IsApprove.auth);
    }
    setMainLoader(true);
    await axios
      .post(Url + "/ajaxfiles/get_kyc_status.php", param)
      .then((res) => {
        if (res.data.message == "Session has been expired") {
          navigate("/");
        }
        if (res.data.status == "error") {
          setDocument(false);
          setSendKycRequest((prevalue) => {
            return {
              ...prevalue,
              proof1: false,
            };
          });
          setMainLoader(false);
        } else {
          doc.idnumber = res.data.kyc_data.aadhar_card_number;
          setDoc({ ...doc });
          setKycStatus(res.data.kyc_data);
          setBackimg(res.data.kyc_data.aadhar_card_back_image);
          setFontimg(res.data.kyc_data.aadhar_card_front_image);
          setAddBackimg(res.data.kyc_data.additional_documents_back);
          setAddFontimg(res.data.kyc_data.additional_documents);
          setKycStatusMessage(res.data.message);
          if (res.data.kyc_data.aadhar_card_back_image != "") {
            twoSide.main = true;
            setTwoSide({ ...twoSide });
          }

          if (res.data.kyc_data.additional_documents_back != "") {
            twoSide.addition = true;
            setTwoSide({ ...twoSide });
          }
          setDocument(true);
          setMainLoader(false);

          if (
            res.data.kyc_data.master_status == "2" ||
            res.data.kyc_data.master_status == "0"
          ) {
            setSendKycRequest((prevalue) => {
              return {
                ...prevalue,
                proof1: false,
              };
            });
            console.log("sendKycRequest", sendKycRequest);
          } else {
            setSendKycRequest((prevalue) => {
              return {
                ...prevalue,
                proof1: true,
              };
            });
            console.log("sendKycRequest", sendKycRequest);
          }
        }
      });
  };

  const onRemoveImage = (type) => {
    const param = new FormData();
    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("user_id", IsApprove.user_id);
      param.append("auth_key", IsApprove.auth);
    }
    param.append("remove_kyc_image", type);
    axios.post(Url + "/ajaxfiles/kyc_remove_image.php", param).then((res) => {
      if (res.data.message == "Session has been expired") {
        navigate("/");
      }
      if (res.data.status == "error") {
        toast.error(res.data.message);
      } else {
        if (type == "aadhar_card_front_image") {
          setDoc((prevalue) => {
            return {
              ...prevalue,
              fontimg: "",
            };
          });
          setFontimg("");
        } else if (type == "aadhar_card_back_image") {
          setDoc((prevalue) => {
            return {
              ...prevalue,
              backimg: "",
            };
          });
          setBackimg("");
        } else if (type == "additional_documents") {
          setAddDoc((prevalue) => {
            return {
              ...prevalue,
              fontimg: "",
            };
          });
          setAddFontimg("");
        } else if (type == "additional_documents_back") {
          setAddDoc((prevalue) => {
            return {
              ...prevalue,
              backimg: "",
            };
          });
          setAddBackimg("");
        }
      }
    });
  };

  useEffect(() => {
    fatchKycStatus();
  }, []);

  useEffect(() => {
    if (sendKycRequest) {
      if ((fontimg == "" || fontimg == null) && doc.fontimg) {
        if (!doc.fontimg) {
          setFontimg(undefined);
          return;
        }

        const objectUrl = URL.createObjectURL(doc.fontimg);
        setFontimg(objectUrl);
        return () => URL.revokeObjectURL(objectUrl);
      }
    }
  }, [doc]);

  useEffect(() => {
    if ((addfontimg == "" || addfontimg == null) && adddoc.fontimg) {
      if (!adddoc.fontimg) {
        setAddFontimg(undefined);
        return;
      }

      const objectUrl = URL.createObjectURL(adddoc.fontimg);
      setAddFontimg(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
    console.log("addfontimg", addfontimg);
  }, [adddoc]);

  useEffect(() => {
    if (sendKycRequest) {
      if ((backimg == "" || backimg == null) && doc.backimg) {
        if (!doc.backimg) {
          setBackimg(undefined);
          return;
        }

        const objectUrl = URL.createObjectURL(doc.backimg);
        setBackimg(objectUrl);
        return () => URL.revokeObjectURL(objectUrl);
      }
    }
  }, [doc]);

  useEffect(() => {
    if (sendKycRequest) {
      if ((addbackimg == "" || addbackimg == null) && adddoc.backimg) {
        if (!adddoc.backimg) {
          setAddBackimg(undefined);
          return;
        }

        const objectUrl = URL.createObjectURL(adddoc.backimg);
        setAddBackimg(objectUrl);
        return () => URL.revokeObjectURL(objectUrl);
      }
    }
    console.log("addbackimg", addbackimg);
  }, [adddoc]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDoc((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
    console.log(event.target.value);
  };
  // const [click, setClick] = React.useState();
  toast.configure();
  const buttonstyle = {
    background: "linear-gradient(45deg, #eeeff8 30%, #eeeff8 90%)",
    borderRadius: "20px",
    boxShadow: "0",
  };

  // useEffect(() => {
  //   console.log("use proof", proofAdd);
  // }, [proofAdd]);
  const documentShow = () => {
    var html = [];
    if (kycStatus.aadhar_card_front_image) {
      html.push(
        <div>
          {/* <img src={kycStatus.aadhar_card_front_image} alt="" /> */}
          <div className="uploaded-proof-view-section">
            <div className="uploaded-proof-element">
              <label className="filable">Front Image</label>
              <CustomImageModal
                image={kycStatus.aadhar_card_front_image}
                className="docimage"
              />
            </div>
            {/* {kycStatus.aadhar_card_back_image ? <img src={kycStatus.aadhar_card_back_image} alt="" />:""} */}
            {kycStatus.aadhar_card_back_image ? (
              <div className="uploaded-proof-element">
                <label className="filable">Back Image</label>
                <CustomImageModal
                  image={kycStatus.aadhar_card_back_image}
                  className="docimage"
                />{" "}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      );
      //  return(
      //    <>
      //      <div>
      //        <h2>Proof of ID</h2>
      //        <img src={kycStatus.aadhar_card_front_image} alt="" />
      //        {kycStatus.aadhar_card_back_image ? <img src={kycStatus.aadhar_card_back_image} alt="" />:""}
      //      </div>
      //    </>
      //  )
    }
    console.log("backimg", backimg);

    // if (kycStatus.additional_documents) {
    //   html.push(
    //     <div className="my-document-view-section">
    //       <h2 className="margin-right-15px">Addition Documents</h2>
    //       {/* <img src={kycStatus.additional_documents} alt="" /> */}
    //       <CustomImageModal image={kycStatus.additional_documents} />
    //       {/* {kycStatus.aadhar_card_back_image ? <img src={kycStatus.aadhar_card_back_image} alt="" />:""} */}
    //     </div>
    //   );
    // }
    if (kycStatus.proof_of_address) {
      html.push(
        <div>
          <h2 className="margin-right-15px">Proof of Address</h2>
          {/* <img src={kycStatus.proof_of_address} alt="" /> */}
          <CustomImageModal image={kycStatus.proof_of_address} />
          {/* {kycStatus.aadhar_card_back_image ? <img src={kycStatus.aadhar_card_back_image} alt="" />:""} */}
        </div>
      );
    }

    return html;
  };

  return (
    <div>
      <div className="app-content--inner">
        <div className="app-content--inner__wrapper mh-100-vh">
          {mainLoader == true ? (
            <div className="loader1">
              <div className="clock">
                <div className="pointers"></div>
              </div>
            </div>
          ) : (
            <div style={{ opacity: 1 }}>
              <Grid container>
                <Grid item sm={12}></Grid>
                <Grid item xl={1}></Grid>
                <Grid item xl={10} md={12} lg={12}>
                  {/* <TopButton /> */}
                  <Grid container spacing={3}>
                    <Grid item md={12}>
                      <Paper
                        elevation={1}
                        style={{ borderRadius: "10px" }}
                        className="w-100 mb-5"
                      >
                        <div className="card-header d-flex align-items-center justify-content-between card-header-alt p-3">
                          <h5 className="font-weight-bold mb-0 text-dark">
                            My Documents{" "}
                            <span
                              className={`approvedocument ${
                                kycStatus.master_status == 1
                                  ? "approve"
                                  : kycStatus.master_status == 2
                                  ? "rejected"
                                  : kycStatus.master_status == 0
                                  ? "padding"
                                  : ""
                              }`}
                            >
                              {" "}
                              {kycStatus.master_status == 1
                                ? "Approved"
                                : kycStatus.master_status == 2
                                ? "Approval Rejected"
                                : kycStatus.master_status == 0
                                ? "Approval Pending"
                                : ""}
                            </span>
                          </h5>
                        </div>
                        <div className="divider"></div>
                        <div className="card-body position-relative bg-transparent p-0">
                          <Grid container spacing={3}>
                            <Grid
                              item
                              md={12}
                              className="d-flex flex-column position-relative mh-150"
                            >
                              {!document ? (
                                <div className="d-flex align-items-center text-dark w-100 h-100">
                                  <i className="m-auto">No document uploaded</i>
                                </div>
                              ) : (
                                documentShow()
                              )}
                            </Grid>
                          </Grid>
                        </div>
                      </Paper>
                    </Grid>
                    <Grid
                      item
                      md={
                        !kycStatus.additional_documents &&
                        kycStatus.master_status == "1"
                          ? 12
                          : 8
                      }
                      className="d-flex"
                    >
                      <Paper
                        elevation={1}
                        style={{ borderRadius: "10px" }}
                        className="w-100 mb-5"
                      >
                        <div className="card-header font-weight-bold mb-0 text-dark h5">
                          Upload New Document{" "}
                          <span
                            className={`approvedocument ${
                              kycStatus.master_status == 1
                                ? "approve"
                                : kycStatus.master_status == 2
                                ? "rejected"
                                : kycStatus.master_status == 0
                                ? "padding"
                                : ""
                            }`}
                          >
                            {kycStatus.master_status == 1
                              ? " Approved"
                              : kycStatus.master_status == 2
                              ? "Approval Rejected"
                              : kycStatus.master_status == 0
                              ? "Approval Pending"
                              : ""}
                          </span>
                        </div>
                        <div className="divider"></div>
                        <div className="card-body">
                          {/* <Grid container spacing={1} className="ml-n1">
                            <Grid item sm={9} className="p-1">
                              <FormControl className="w-100">
                                <Select
                                  value={doc.proof}
                                  name="proof"
                                  disabled
                                  label="Proof of ID"
                                  onChange={handleChange}
                                  displayEmpty
                                  inputProps={{ "aria-label": "Without label" }}
                                  input={<BootstrapInput />}
                                  className="mt-0 ml-0"
                                >
                                  <MenuItem
                                    value="Proof of ID"
                                    onClick={() => {
                                      setOption(true);
                                      setChange(false);
                                      setChange1(false);
                                    }}
                                  >
                                    Proof of ID
                                  </MenuItem>

                                   <MenuItem
                                  value="Proof of Address"
                                  onClick={() => {
                                    setOption(false);
                                    setChange(true);
                                    setChange1(false);
                                  }}
                                >
                                  Proof of Address
                                </MenuItem>

                                <MenuItem
                                  value="Addition Documents"
                                  onClick={() => {
                                    setOption(false);
                                    setChange(false);
                                    setChange1(true);
                                  }}
                                >
                                  Addition Documents
                                </MenuItem> 
                                </Select>
                              </FormControl>
                            </Grid>
                            <Grid item sm={3} className="p-1">
                              {option && (
                                <FormControl className="w-100">
                                  <Select
                                    value={doc.id}
                                    disabled
                                    name="id"
                                    label="ID"
                                    onChange={handleChange}
                                    inputProps={{
                                      "aria-label": "Without label",
                                    }}
                                    input={<BootstrapInput />}
                                    className="mt-0 ml-0"
                                  >
                                    <MenuItem value="id">ID</MenuItem>
                                     <MenuItem value="Password">PASSWORD</MenuItem> 
                                  </Select>
                                </FormControl>
                              )}

                              {change1 && (
                                <ColorButton
                                  type="submit"
                                  variant="contained"
                                  size="medium"
                                  className="w-100 p-0 h-100 !important d-flex align-items-stretch text-capitalize d-none"
                                >
                                  {additional.length < 3 ? (
                                    <Input
                                      accept="image/*"
                                      id="uploadDoc"
                                      type="file"
                                      name="fontimg"
                                      // value={doc.fontimg}
                                      onChange={(e) => {
                                        console.log(additional, "additional");
                                        setAdditional([
                                          ...additional,
                                          e.target.files[0],
                                        ]);
                                        //   setProofAdd(
                                        //     proofAdd.concat(e.target.files)
                                        //   )
                                      }}
                                      style={{ display: "none" }}
                                    />
                                  ) : (
                                    ""
                                  )}{" "}
                                  <label
                                    htmlFor="uploadDoc"
                                    className="w-100 h-100 d-flex align-items-center justify-content-center"
                                  >
                                    <CloudUploadIcon className="m-2" />
                                    Browse
                                  </label>
                                </ColorButton>
                              )}
                              {change && (
                                <ColorButton
                                  type="submit"
                                  variant="contained"
                                  size="medium"
                                  className="w-100 p-0 h-100 !important d-flex align-items-stretch text-capitalize d-none"
                                >
                                  {addressProof.length < 3 ? (
                                    <Input
                                      accept="image/*"
                                      id="uploadDoc"
                                      type="file"
                                      name="fontimg"
                                      // value={doc.fontimg}
                                      onChange={(e) => {
                                        console.log(
                                          addressProof,
                                          "addressProof"
                                        );
                                        setAddressProof([
                                          ...addressProof,
                                          e.target.files[0],
                                        ]);
                                        //   setProofAdd(
                                        //     proofAdd.concat(e.target.files)
                                        //   )
                                      }}
                                      style={{ display: "none" }}
                                    />
                                  ) : (
                                    ""
                                  )}{" "}
                                  <label
                                    htmlFor="uploadDoc"
                                    className="w-100 h-100 d-flex align-items-center justify-content-center"
                                  >
                                    <CloudUploadIcon className="m-2" />
                                    Browse
                                  </label>
                                </ColorButton>
                              )}
                            </Grid>
                          </Grid> */}
                          <div>
                            <label
                              htmlFor="upi_crypto_ac_number"
                              className="text-info font-weight-bold form-label-head w-100 "
                            >
                              Id Number
                            </label>
                            <BootstrapInput
                              // type="number"
                              disabled={sendKycRequest.proof1}
                              value={doc.idnumber}
                              onChange={handleChange}
                              name="idnumber"
                              displayEmpty
                              inputProps={{
                                "aria-label": "Without label",
                              }}
                            />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <input
                              type="checkbox"
                              name="tos"
                              value={!twoSide.main}
                              checked={twoSide.main}
                              disabled={
                                kycStatus.master_status == 1 ? true : false
                              }
                              onChange={(e) => {
                                twoSide.main = e.target.checked;
                                setTwoSide({ ...twoSide });
                                console.log(
                                  "e.target.checked",
                                  e.target.checked
                                );
                              }}
                              id="gridCheck"
                              className="form-check-input"
                            />
                            <label
                              htmlFor="gridCheck"
                              className="form-check-label"
                            >
                              <span> Double side</span>
                            </label>
                          </div>
                          {/* {doc.proof == "Proof of ID" ? (
                            !sendKycRequest.proof1 == true &&
                            kycStatus.master_status == "0" ? (
                              <div className="text-dark w-100 h-100 kyc-status-section padingtop5">
                                <h5 className="text-center font-weight-bold text-dark ">
                                  <div>
                                    <InfoIcon
                                      style={{
                                        fontSize: "5rem",
                                        color: "rgb(204 207 23)",
                                        paddingBottom: "1rem",
                                      }}
                                    />
                                  </div>
                                  {kycStatusMessage}
                                </h5>
                              </div>
                            ) : (
                              ""
                            )
                          ) : (
                            ""
                          )}

                          {doc.proof == "Proof of ID" ? (
                            sendKycRequest.proof1 == true &&
                            kycStatus.master_status == "1" ? (
                              <div className="text-dark w-100 h-100 kyc-status-section padingtop5">
                                <h5 className="text-center font-weight-bold text-dark">
                                  <div>
                                    <CheckCircleOutlineIcon
                                      style={{
                                        fontSize: "5rem",
                                        color: "rgb(18 219 52)",
                                        paddingBottom: "1rem",
                                      }}
                                    />
                                  </div>
                                  {kycStatusMessage}
                                </h5>
                              </div>
                            ) : (
                              ""
                            )
                          ) : (
                            ""
                          )}

                          {doc.proof == "Proof of ID" ? (
                            !sendKycRequest.proof1 == true &&
                            kycStatus.master_status == "2" ? (
                              <div className="text-dark w-100 h-100 kyc-status-section padingtop5">
                                <h5 className="text-center font-weight-bold text-dark ">
                                  <div>
                                    <CancelIcon
                                      style={{
                                        fontSize: "5rem",
                                        color: "rgb(255 3 3)",
                                        paddingBottom: "1rem",
                                      }}
                                    />
                                  </div>
                                  {kycStatusMessage}{" "}
                                  {kycStatus.feedback_remarks}
                                </h5>
                              </div>
                            ) : (
                              ""
                            )
                          ) : (
                            ""
                          )} */}

                          {change1 && (
                            <Grid container className="text-center my-4">
                              <Grid item sm={12}>
                                {additional.map((proof, index) => {
                                  return (
                                    <Paper
                                      elevation={1}
                                      className="d-flex p-3 justify-content-between align-items-center mb-2"
                                      style={{ borderRadius: "10px" }}
                                      key={index}
                                    >
                                      <span className="text-dark font-size-sm font-weight-bold">
                                        {proof.name}
                                      </span>
                                      <CloseOutlinedIcon
                                        className="fontimgclose"
                                        onClick={() => {
                                          // proofAdd.splice(index, 1);
                                          console.log(additional, "asdASF");
                                          setAdditional(
                                            additional.filter(
                                              (v, i) => i !== index
                                            )
                                          );
                                        }}
                                      />
                                    </Paper>
                                  );
                                })}
                              </Grid>
                            </Grid>
                          )}
                          {change && (
                            <Grid container className="text-center my-4">
                              <Grid item sm={12}>
                                {addressProof.map((proof, index) => {
                                  return (
                                    <Paper
                                      elevation={1}
                                      className="d-flex p-3 justify-content-between align-items-center mb-2"
                                      style={{ borderRadius: "10px" }}
                                      key={index}
                                    >
                                      <span className="text-dark font-size-sm font-weight-bold">
                                        {proof.name}
                                      </span>
                                      <CloseOutlinedIcon
                                        className="fontimgclose"
                                        onClick={() => {
                                          // proofAdd.splice(index, 1);
                                          console.log(addressProof, "asdASF");
                                          setAddressProof(
                                            addressProof.filter(
                                              (v, i) => i !== index
                                            )
                                          );
                                        }}
                                      />
                                    </Paper>
                                  );
                                })}
                              </Grid>
                            </Grid>
                          )}
                          {option && (
                            <Grid
                              container
                              spacing={7}
                              className="mt-4 mb-2 justify-content-center"
                              style={{ marginLeft: "-28px" }}
                            >
                              <Grid
                                item
                                sm={6}
                                lg={4}
                                className="d-flex flex-column align-items-center upload-zone p-4"
                              >
                                <h6 className="mb-3  font-size-xs font-weight-bold">
                                  FRONT SIDE*
                                </h6>
                                <div className="uploaderDropZone">
                                  <Input
                                    accept="image/*"
                                    id="FILE_FRONT_SIDE"
                                    type="file"
                                    name="fontimg"
                                    // value={doc.fontimg}
                                    onChange={(e) => {
                                      setDoc((prevalue) => {
                                        return {
                                          ...prevalue,
                                          fontimg: e.target.files[0],
                                        };
                                      });
                                    }}
                                    style={{ display: "none" }}
                                  />

                                  {!fontimg ? (
                                    <label
                                      htmlFor="FILE_FRONT_SIDE"
                                      className="text-dark font-weight-bold font-size-xs"
                                    >
                                      UPLOAD
                                    </label>
                                  ) : (
                                    <>
                                      {sendKycRequest.proof1 ? (
                                        ""
                                      ) : (
                                        <button
                                          className="bg-transparent p-0 border-0"
                                          onClick={() => {
                                            onRemoveImage(
                                              "aadhar_card_front_image"
                                            );
                                          }}
                                        >
                                          <CloseOutlinedIcon className="fontimgclose" />
                                        </button>
                                      )}
                                      <img
                                        src={fontimg}
                                        className="deposit-upload-image-preview1"
                                      />
                                    </>
                                  )}
                                </div>
                              </Grid>
                              {twoSide.main ? (
                                <Grid
                                  item
                                  sm={6}
                                  lg={4}
                                  className="d-flex flex-column align-items-center upload-zone p-4"
                                >
                                  <h6 className="mb-3 font-size-xs font-weight-bold">
                                    BACK SIDE*
                                  </h6>
                                  <div className="uploaderDropZone">
                                    <Input
                                      accept="image/*"
                                      id="FILE_BACK_SIDE"
                                      type="file"
                                      name="backimg"
                                      // value={doc.backimg}
                                      onChange={(e) =>
                                        setDoc((prevalue) => {
                                          return {
                                            ...prevalue,
                                            backimg: e.target.files[0],
                                          };
                                        })
                                      }
                                      style={{ display: "none" }}
                                    />

                                    {!backimg ? (
                                      <label
                                        htmlFor="FILE_BACK_SIDE"
                                        className="text-dark font-weight-bold font-size-xs"
                                      >
                                        UPLOAD
                                      </label>
                                    ) : (
                                      <>
                                        {sendKycRequest.proof1 ? (
                                          ""
                                        ) : (
                                          <button
                                            className="bg-transparent p-0 border-0"
                                            onClick={() => {
                                              onRemoveImage(
                                                "aadhar_card_back_image"
                                              );
                                            }}
                                            /* onClick={() => {
                                            setDoc((prevalue) => {
                                              return {
                                                ...prevalue,
                                                backimg: "",
                                              };
                                            });
                                            setBackimg("");
                                          }} */
                                          >
                                            <CloseOutlinedIcon className="fontimgclose" />
                                          </button>
                                        )}
                                        <img
                                          src={backimg}
                                          className="deposit-upload-image-preview1"
                                        />

                                        {/* <div className="received-file">
                                    <div className="w-100 h-100">
                                      {doc.backimg.name}
                                    </div>
                                    <button
                                      className="bg-transparent p-0 border-0"
                                      onClick={() =>
                                        setDoc((prevalue) => {
                                          return {
                                            ...prevalue,
                                            backimg: "",
                                          };
                                        })
                                      }
                                    >
                                      <CloseOutlinedIcon className="fontimgclose" />
                                    </button>
                                  </div> */}
                                      </>
                                    )}
                                  </div>
                                </Grid>
                              ) : (
                                ""
                              )}

                              {/* <hr className="ml-2 mr-2 uploadmr" ></hr>
                            <Grid item xs={12} className="py-0 pr-4 pl-4 pb-1">
                              <form noValidate className="autocomplete-off">
                                <h6 className="font-weight-bold mb-4 pb-1 d-flex">
                                  Fill in your Details for a seamless experience{" "}
                                  <small className="d-baseline">
                                    {" "}
                                    (Optional)
                                  </small>
                                </h6>
                                <Grid container spacing={1} className="ml-n1">
                                  <Grid item sm={6} className="p-1">
                                    <FormControl className="w-100">
                                      <label className="font-weight-bold font-size-sm d-flex justify-content-start">
                                        Document No
                                      </label>
                                      <BootstrapInput
                                        value={doc.documentNo}
                                        name="documentNo"
                                        onChange={handleChange}
                                        inputProps={{
                                          "aria-label": "Without label",
                                        }}
                                      />
                                    </FormControl>
                                  </Grid>
                                  <Grid item sm={6} className="p-1">
                                    <FormControl className="w-100 mb-2">
                                      <label className="font-weight-bold font-size-sm d-flex justify-content-start">
                                        Country Of Issue
                                      </label>
                                      <Select
                                        value={doc.id}
                                        name="id"
                                        label="ID"
                                        onChange={handleChange}
                                        displayEmpty
                                        inputProps={{
                                          "aria-label": "Without label",
                                        }}
                                        input={<BootstrapInput />}
                                        className="mt-0 ml-0"
                                      >
                                        <MenuItem value=""></MenuItem>
                                      </Select>
                                    </FormControl>
                                  </Grid>
                                  <Grid item sm={6} className="p-1">
                                    <FormControl className="w-100 mb-2">
                                      <label className="font-weight-bold font-size-sm d-flex justify-content-start">
                                        Date Of Issue
                                      </label>

                                      <BootstrapInput
                                        id="date"
                                        type="date"
                                        defaultValue=""
                                        sx={{ width: "100%" }}
                                        inputlabelprops={{
                                          shrink: true,
                                        }}
                                        inputProps={{ max: "2022-04-13" }}
                                        onChange={(e) =>
                                          setFilterData({
                                            ...filterData,
                                            deposit_from: e.target.value,
                                          })
                                        }
                                      />
                                    </FormControl>
                                  </Grid>
                                  <Grid item sm={6} className="p-1">
                                    <FormControl className="w-100 mb-2">
                                      <label className="font-weight-bold font-size-sm d-flex justify-content-start">
                                        Date Of Expiry
                                      </label>

                                      <BootstrapInput
                                        id="date"
                                        type="date"
                                        defaultValue=""
                                        sx={{ width: "100%" }}
                                        inputlabelprops={{
                                          shrink: true,
                                        }}
                                        onChange={(e) =>
                                          setFilterData({
                                            ...filterData,
                                            deposit_from: e.target.value,
                                          })
                                        }
                                      />
                                    </FormControl>
                                  </Grid>
                                </Grid>
                              </form>
                            </Grid> */}
                            </Grid>
                          )}

                          <div
                            className="text-dark font-size-xs d-flex justify-content-between align-items-center"
                            style={{ marginTop: "100px" }}
                          >
                            <i>
                              (Maximum size of document 5MB, Allow File Formats
                              *jpg, *png)
                            </i>
                            {doc.proof == "Proof of ID" ? (
                              doc.isLoder ? (
                                <ColorButton
                                  tabindex="0"
                                  size="large"
                                  className=" btn-gradient  btn-success "
                                  sx={{
                                    padding: "20px 57px",
                                    marginTop: "10px",
                                  }}
                                  disabled
                                >
                                  <svg class="spinner" viewBox="0 0 50 50">
                                    <circle
                                      class="path"
                                      cx="25"
                                      cy="25"
                                      r="20"
                                      fill="none"
                                      stroke-width="5"
                                    ></circle>
                                  </svg>
                                </ColorButton>
                              ) : (
                                <ColorButton
                                  onClick={onSubmit}
                                  variant="contained"
                                  disabled={sendKycRequest.proof1}
                                  size="medium"
                                  className="text-center text-capitalize"
                                >
                                  Save
                                </ColorButton>
                              )
                            ) : doc.proof == "Proof of Address" ? (
                              <ColorButton
                                onClick={onOtherImage}
                                variant="contained"
                                disabled={sendKycRequest.proof2}
                                size="medium"
                                className="text-center text-capitalize"
                              >
                                Save
                              </ColorButton>
                            ) : (
                              <ColorButton
                                onClick={onOtherImage}
                                variant="contained"
                                disabled={sendKycRequest.proof3}
                                size="medium"
                                className="text-center text-capitalize"
                              >
                                Save
                              </ColorButton>
                            )}
                            {/* <ColorButton
                            onClick={onSubmit}
                            variant="contained"
                            disabled={!sendKycRequest}
                            size="medium"
                            className="p-3 pr-4 pl-4 text-center text-capitalize"
                          >
                            Save
                          </ColorButton> */}
                          </div>
                        </div>
                      </Paper>
                    </Grid>
                    {!kycStatus.additional_documents &&
                    kycStatus.master_status == "1" ? (
                      ""
                    ) : (
                      <Grid item md={4}>
                        <Paper elevation={1} style={{ borderRadius: "10px" }}>
                          <div className="card-header card-header-alt p-3">
                            <h5 className="font-weight-bold mb-0 text-dark">
                              Additional Documents
                            </h5>
                          </div>
                          <div className="divider"></div>
                          <Grid container spacing={3}>
                            <Grid item md={12}>
                              <div style={{ padding: "15px" }}>
                                <input
                                  type="checkbox"
                                  name="tos"
                                  value={!twoSide.addition}
                                  checked={twoSide.addition}
                                  disabled={
                                    kycStatus.master_status == 1 ? true : false
                                  }
                                  onChange={(e) => {
                                    twoSide.addition = e.target.checked;
                                    setTwoSide({ ...twoSide });
                                  }}
                                  id="gridAdditionCheck"
                                  className="form-check-input"
                                />
                                <label
                                  htmlFor="gridAdditionCheck"
                                  className="form-check-label"
                                >
                                  <span>Double side</span>
                                </label>
                              </div>
                              <h6
                                className="mb-3 mt-3 font-size-xs font-weight-bold"
                                style={{ textAlign: "center" }}
                              >
                                FRONT SIDE*
                              </h6>
                              <div className="centerflexjus">
                                <div className="uploaderDropZone">
                                  <Input
                                    accept="image/*"
                                    id="FILE_FRONT_SIDE1"
                                    type="file"
                                    name="fontimg"
                                    // value={doc.fontimg}
                                    onChange={(e) =>
                                      setAddDoc((prevalue) => {
                                        return {
                                          ...prevalue,
                                          fontimg: e.target.files[0],
                                        };
                                      })
                                    }
                                    style={{ display: "none" }}
                                  />

                                  {!addfontimg ? (
                                    <label
                                      htmlFor="FILE_FRONT_SIDE1"
                                      className="text-dark font-weight-bold font-size-xs"
                                    >
                                      UPLOAD
                                    </label>
                                  ) : (
                                    <>
                                      {sendKycRequest.proof1 ? (
                                        ""
                                      ) : (
                                        <button
                                          className="bg-transparent p-0 border-0"
                                          onClick={() => {
                                            onRemoveImage(
                                              "additional_documents"
                                            );
                                            /* setAddDoc((prevalue) => {
                                              return {
                                                ...prevalue,
                                                fontimg: "",
                                              };
                                            });
                                            setAddFontimg(""); */
                                          }}
                                        >
                                          <CloseOutlinedIcon className="fontimgclose" />
                                        </button>
                                      )}
                                      <img
                                        src={addfontimg}
                                        className="deposit-upload-image-preview1"
                                      />
                                    </>
                                  )}
                                </div>
                              </div>
                            </Grid>
                            {twoSide.addition ? (
                              <Grid item md={12}>
                                <h6
                                  className="mb-3 font-size-xs font-weight-bold"
                                  style={{ textAlign: "center" }}
                                >
                                  BACK SIDE*
                                </h6>
                                <div className="centerflexjus">
                                  <div className="uploaderDropZone">
                                    <Input
                                      accept="image/*"
                                      id="FILE_BACk_SIDE1"
                                      type="file"
                                      name="backimg"
                                      // value={doc.fontimg}
                                      onChange={(e) =>
                                        setAddDoc((prevalue) => {
                                          return {
                                            ...prevalue,
                                            backimg: e.target.files[0],
                                          };
                                        })
                                      }
                                      style={{ display: "none" }}
                                    />

                                    {!addbackimg ? (
                                      <label
                                        htmlFor="FILE_BACk_SIDE1"
                                        className="text-dark font-weight-bold font-size-xs"
                                      >
                                        UPLOAD
                                      </label>
                                    ) : (
                                      <>
                                        {sendKycRequest.proof1 ? (
                                          ""
                                        ) : (
                                          <button
                                            className="bg-transparent p-0 border-0"
                                            onClick={() => {
                                              /* setAddBackimg("");
                                            setAddDoc((prevalue) => {
                                              return {
                                                ...prevalue,
                                                backimg: "",
                                              };
                                            }); */
                                              onRemoveImage(
                                                "additional_documents_back"
                                              );
                                            }}
                                          >
                                            <CloseOutlinedIcon className="fontimgclose" />
                                          </button>
                                        )}
                                        <img
                                          src={addbackimg}
                                          className="deposit-upload-image-preview1"
                                        />
                                      </>
                                    )}
                                  </div>
                                </div>
                              </Grid>
                            ) : (
                              ""
                            )}

                            <Grid item md={12} style={{ marginBottom: "10px" }}>
                              <div className="centerflexjus">
                                {adddoc.isLoder ? (
                                  <ColorButton
                                    tabindex="0"
                                    size="large"
                                    className=" btn-gradient  btn-success "
                                    sx={{
                                      padding: "20px 57px",
                                      marginTop: "10px",
                                    }}
                                    disabled
                                  >
                                    <svg class="spinner" viewBox="0 0 50 50">
                                      <circle
                                        class="path"
                                        cx="25"
                                        cy="25"
                                        r="20"
                                        fill="none"
                                        stroke-width="5"
                                      ></circle>
                                    </svg>
                                  </ColorButton>
                                ) : (
                                  <ColorButton
                                    style={{ marginTop: "10px" }}
                                    onClick={onaddsubmit}
                                    disabled={sendKycRequest.proof1}
                                  >
                                    Save
                                  </ColorButton>
                                )}
                              </div>
                            </Grid>
                          </Grid>
                        </Paper>
                      </Grid>
                    )}
                  </Grid>
                  <Grid item md={12}>
                    <Grid item md={12}>
                      <Paper
                        elevation={1}
                        style={{ borderRadius: "10px" }}
                        className="w-100 mb-1"
                      >
                        <div className="card-header card-header-alt p-3 text-center">
                          <h4 className="font-weight-bold mb-0 text-dark text-center">
                            Uploaded Document
                          </h4>
                        </div>
                        <div className="card-body position-relative py-3 px-3 px-md-5">
                          <Grid
                            container
                            spacing={3}
                            className="justify-xs-center"
                          >
                            <Grid
                              item
                              md={12}
                              // className="font-italic text-dark"
                            >
                              <div className="docMain">
                                <div className="centerflexjus">
                                  <div className="docH1Text">
                                    {" "}
                                    <h5 className="d-flex">
                                      <div>
                                        <ErrorIcon
                                          sx={{
                                            color: "green",
                                            fontSize: "25px",
                                            marginRight: "5px",
                                          }}
                                        />
                                      </div>
                                      <div>
                                        Make sure the document shows your
                                        photo,full name,date of birth and date
                                        of issue
                                      </div>
                                    </h5>
                                  </div>
                                </div>
                                <div className="picdocMain">
                                  <div className="firstimageofdoc">
                                    <img
                                      src="./image/image1.png"
                                      alt=""
                                      className="firstimageofdoc1"
                                    />
                                    <div>
                                      <h2
                                        style={{
                                          color: "green",
                                          fontWeight: "700",
                                        }}
                                      >
                                        Do
                                      </h2>
                                      <ul style={{ listStyle: "disc inside" }}>
                                        <li>Photo is clear</li>
                                        <li>Good photo quality</li>
                                        <li>All 4 corners are visible</li>
                                      </ul>
                                    </div>
                                  </div>
                                  <div className="firstimageofdoc">
                                    <img
                                      src="./image/image2.png"
                                      alt=""
                                      className="firstimageofdoc2"
                                    />
                                    <div>
                                      <h2
                                        style={{
                                          color: "red",
                                          fontWeight: "700",
                                        }}
                                      >
                                        Don't
                                      </h2>
                                      <ul style={{ listStyle: "disc inside" }}>
                                        <li>Photo is blurred</li>
                                        <li>Light reflection</li>
                                        <li>Poor photo quality</li>
                                        <li>Not all corners are visible</li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Grid>
                          </Grid>
                        </div>
                      </Paper>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyDocuments;
