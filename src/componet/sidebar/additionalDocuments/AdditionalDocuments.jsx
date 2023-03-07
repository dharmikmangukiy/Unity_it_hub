import { FormControl, Grid, Input, Paper, FormHelperText } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IsApprove, Url } from "../../../global";
import Toast from "../../commonComponet/Toast";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

import "./AdditionalDocuments.css";
import {
  BootstrapInput,
  ColorButton,
} from "../../customComponet/CustomElement";
export const AdditionalDocuments = () => {
  const navigate = useNavigate();
  const [mainLoader, setMainLoader] = useState(true);
  const [listData, setListData] = useState([]);
  const [info, setInfo] = useState({
    fontimg: "",
    ftype: "",
    perviewfontimg: "",
    backimg: "",
    btype: "",
    perviewbackimg: "",
    twoSide: false,
    doc_name: "",
    isLoader: false,
  });
  const [infoTrue, setInfoTrue] = useState({
    fontimg: false,

    backimg: false,
    doc_name: false,
  });
  const fatchDocuments = () => {
    const param = new FormData();
    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("user_id", IsApprove.user_id);
      param.append("auth_key", IsApprove.auth);
    }
    setMainLoader(true);
    param.append("end_date", "");
    param.append("start_date", "");
    param.append("start", 0);
    param.append("length", 20);

    axios
      .post(Url + "/datatable/additional_documents_list.php", param)
      .then((res) => {
        if (res.data.message == "Session has been expired") {
          navigate("/");
        }
        if (res.data.status == "error") {
          Toast("error", res.data.message);
        } else {
          setListData(res.data.aaData);
          setMainLoader(false);
        }
      });
  };
  const onsubmit = () => {
    if (info.doc_name == "") {
      Toast("error", "Document Name is required");
    } else if (info.fontimg == "") {
      Toast("error", "Font Image is required");
    } else if (info.backimg == "" && info.twoSide == true) {
      Toast("error", "Back Image is required");
    } else {
      const param = new FormData();
      if (IsApprove !== "") {
        param.append("is_app", IsApprove.is_app);
        param.append("user_id", IsApprove.user_id);
        param.append("auth_key", IsApprove.auth);
      }
      param.append("document_name", info.doc_name);
      param.append("document_double_sided", info.twoSide == true ? 1 : 0);
      param.append("document_front_image", info.fontimg);
      param.append("document_back_image", info.backimg);
      param.append("action", "add_documents");

      info.isLoader = true;
      setInfo({ ...info });

      axios
        .post(Url + "/ajaxfiles/additional_documents.php", param)
        .then((res) => {
          if (res.data.message == "Session has been expired") {
            navigate("/");
          }
          if (res.data.status == "error") {
            Toast("error", res.data.message);
            info.isLoader = false;
            setInfo({ ...info });
          } else {
            setInfo({
              fontimg: "",
              ftype: "",
              perviewfontimg: "",
              backimg: "",
              btype: "",
              perviewbackimg: "",
              twoSide: false,
              doc_name: "",
              isLoader: false,
            });
            setInfoTrue({
              fontimg: false,

              backimg: false,
              doc_name: false,
            });
            Toast("success", res.data.message);

            fatchDocuments();
          }
        });
    }
  };
  useEffect(() => {
    fatchDocuments();
  }, []);
  return (
    <div>
      <div className="app-content--inner">
        <div className="app-content--inner__wrapper mh-100-vh">
          {mainLoader == true ? (
            <div className="loader1">
              <span className="loader2"></span>
            </div>
          ) : (
            <div style={{ opacity: 1 }}>
              <Grid container>
                <Grid item sm={11}></Grid>
                <Grid item xl={1}></Grid>
                <Grid item xl={10} md={12} lg={12}>
                  <Grid container spacing={3}>
                    <Grid item md={12}>
                      <Paper
                        elevation={1}
                        style={{ borderRadius: "10px" }}
                        className="w-100 mb-5"
                      >
                        <div className="card-header font-weight-bold mb-0 text-dark h5">
                          Document
                        </div>
                        <div className="divider"></div>
                        <div className="addDoc-listView">
                          {listData.map((item, index) => {
                            var type1=item.document_front_image.split(".").pop()== "pdf"
                            ? "application/pdf"
                            : "image";
                            var type2=item.document_front_image.split(".").pop()== "pdf"
                            ? "application/pdf"
                            : "image";
                            return (
                              <>
                                <div className="addDoc-listView-block" key={index}>
                                <div className="text-info font-weight-bold">
                                Document Name:-{item.document_name}
                                </div>
                                <div className="addDoc-listView-block-sub">
                                    <Grid container spacing={3}>
                                        <Grid item md={6}>
                                            <div >
                                                <div>
                                                    <h5>FRONT SIDE</h5>
                                                </div>
                                                <div className="addDoc-listView-block-sub-imgF">
                                                    {
                                                        type1=="image" ?<img src={item.document_front_image} alt="" width="200px" />:<embed
                                                        src={item.document_front_image}
                                                      />
                                                    }
                                                </div>
                                            </div>
                                        </Grid>
                                        <Grid item md={6}></Grid>

                                    </Grid>
                                </div>
                                </div>
                                <div className="divider"></div>
                              </>
                            );
                          })}
                        </div>
                      </Paper>
                      <Paper
                        elevation={1}
                        style={{ borderRadius: "10px" }}
                        className="w-100 mb-5"
                      >
                        <div className="card-header font-weight-bold mb-0 text-dark h5">
                          Add New Documents
                        </div>
                        <div className="divider"></div>
                        <div className="addDoc-main">
                          <div className="addDoc-textbox">
                            <div>
                              <label className="text-info font-weight-bold form-label-head w-100 required">
                                Document Name
                              </label>
                              <FormControl
                                className="w-100"
                                error={
                                  info.doc_name == "" &&
                                  infoTrue.doc_name == true
                                    ? true
                                    : false
                                }
                              >
                                <BootstrapInput
                                  //   value={info.amount}
                                  name="doc_name"
                                  type="text"
                                  className="w-100"
                                  //   onBlur={trueFalse}
                                  onChange={(e) => {
                                    info.doc_name = e.target.value;
                                    setInfo({ ...info });
                                  }}
                                  onBlur={() => {
                                    infoTrue.doc_name = true;
                                    setInfoTrue({ ...infoTrue });
                                  }}
                                  displayEmpty
                                  inputProps={{
                                    "aria-label": "Without label",
                                  }}
                                />
                                {info.doc_name == "" && infoTrue.doc_name ? (
                                  <FormHelperText>
                                    Document Name is required
                                  </FormHelperText>
                                ) : (
                                  ""
                                )}
                              </FormControl>
                            </div>
                            <div className="addDoc-checkBox">
                              <input
                                type="checkbox"
                                name="tos"
                                // value={!twoSide.main}
                                // checked={twoSide.main}
                                // disabled={
                                //   kycStatus.master_status == 1 ? true : false
                                // }
                                onChange={(e) => {
                                  info.twoSide = e.target.checked;
                                  setInfo({ ...info });
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
                          </div>
                          <Grid
                            container
                            spacing={7}
                            className="justify-content-center"
                            style={{ marginLeft: "-28px", marginTop: "-7px" }}
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
                                  id="FILE_FRONT_SIDE4"
                                  type="file"
                                  name="fontimg"
                                  value=""
                                  // value={doc.fontimg}
                                  onChange={(e) => {
                                    var objectUrl1 = URL.createObjectURL(
                                      e.target.files[0]
                                    );

                                    setInfo((prevalue) => {
                                      return {
                                        ...prevalue,
                                        fontimg: e.target.files[0],
                                        ftype: e.target.files[0].type,
                                        perviewfontimg: objectUrl1,
                                      };
                                    });
                                  }}
                                  style={{ display: "none" }}
                                />

                                {!info.perviewfontimg ? (
                                  <label
                                    htmlFor="FILE_FRONT_SIDE4"
                                    className="text-dark font-weight-bold font-size-xs"
                                  >
                                    UPLOAD
                                  </label>
                                ) : (
                                  <>
                                    <button
                                      className="bg-transparent p-0 border-0"
                                      onClick={() => {
                                        info.perviewfontimg = "";
                                        info.fontimg = "";
                                        setInfo({ ...info });
                                      }}
                                    >
                                      <CloseOutlinedIcon className="fontimgclose" />
                                    </button>

                                    {info?.ftype == "application/pdf" ? (
                                      <embed
                                        src={info.perviewfontimg}
                                        className="deposit-upload-image-preview1"
                                      />
                                    ) : (
                                      <img
                                        src={info.perviewfontimg}
                                        className="deposit-upload-image-preview1"
                                      />
                                    )}
                                  </>
                                )}
                                {/* {infotrue.fontimg2 == true &&
                                  !formImage.perviewfontimg ? (
                                    <span className="doc-Requied">
                                      Requied!
                                    </span>
                                  ) : (
                                    ""
                                  )} */}
                              </div>
                            </Grid>
                            {info.twoSide ? (
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
                                    id="FILE_BACK_SIDE4"
                                    type="file"
                                    name="backimg"
                                    value=""
                                    // value={doc.backimg}
                                    onChange={(e) => {
                                      var objectUrl1 = URL.createObjectURL(
                                        e.target.files[0]
                                      );
                                      setInfo((prevalue) => {
                                        return {
                                          ...prevalue,
                                          backimg: e.target.files[0],
                                          btype: e.target.files[0].type,
                                          perviewbackimg: objectUrl1,
                                        };
                                      });
                                    }}
                                    style={{ display: "none" }}
                                  />

                                  {!info.perviewbackimg ? (
                                    <label
                                      htmlFor="FILE_BACK_SIDE4"
                                      className="text-dark font-weight-bold font-size-xs"
                                    >
                                      UPLOAD
                                    </label>
                                  ) : (
                                    <>
                                      <button
                                        className="bg-transparent p-0 border-0"
                                        onClick={() => {
                                          info.backimg = "";
                                          info.perviewbackimg = "";
                                          setInfo({ ...info });
                                        }}
                                      >
                                        <CloseOutlinedIcon className="fontimgclose" />
                                      </button>

                                      {info?.btype == "application/pdf" ? (
                                        <embed
                                          src={info.perviewbackimg}
                                          className="deposit-upload-image-preview1"
                                        />
                                      ) : (
                                        <img
                                          src={info.perviewbackimg}
                                          className="deposit-upload-image-preview1"
                                        />
                                      )}
                                    </>
                                  )}
                                  {/* {infotrue.backimg2 == true &&
                                    !formImage.perviewbackimg ? (
                                      <span className="doc-Requied">
                                        Requied!
                                      </span>
                                    ) : (
                                      ""
                                    )} */}
                                </div>
                              </Grid>
                            ) : (
                              ""
                            )}
                          </Grid>
                          <div className="text-dark font-size-xs d-flex justify-content-between align-items-center">
                            <i>
                              (Maximum size of document 5MB, Allow File Formats
                              *jpg, *png, *pdf)
                            </i>
                            {info.isLoader == true ? (
                              <>
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
                              </>
                            ) : (
                              <ColorButton onClick={onsubmit}>save</ColorButton>
                            )}
                          </div>
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
