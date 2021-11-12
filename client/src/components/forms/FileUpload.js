import React from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { useSelector } from "react-redux";
import { Avatar, Badge } from "antd";

const FileUpload = (props) => {
    const { user } = useSelector((state) => ({ ...state }));

    const fileUploadAndResize = (e) => {  
    /* In case we upload single file we would take the first element in the array with e.target.files[0]. 
    In case o multiple upload we take all the files with e.target.files.*/
        let files = e.target.files; 
        let allUploadedFiles = props.values.images;

        if (files) {
            props.setLoading(true);

            for (let i = 0; i < files.length; i++) {
                Resizer.imageFileResizer(
                    files[i],
                    720,
                    720,
                    "JPEG",
                    100,
                    0,
                    (uri) => {           
                        axios
                            .post(
                                `${process.env.REACT_APP_API}/upload-images`,
                                { image: uri },
                                {
                                    headers: {
                                        authToken: user ? user.token : "",
                                    },
                                }
                            )
                            .then((res) => {
                                console.log("IMAGE UPLOAD RES DATA", res);
                                props.setLoading(false);
                                allUploadedFiles.push(res.data);
                                props.setValues({ ...props.values, images: allUploadedFiles });
                            })
                            .catch((err) => {
                                props.setLoading(false);
                                console.log("CLOUDINARY UPLOAD ERR", err);
                            });
                    },
                    "base64"
                );
            }
        }  
    };

    const handleImageRemove = (public_id) => {
        props.setLoading(true);
        axios
            .post(
                `${process.env.REACT_APP_API}/remove-image`,
                { public_id },
                {
                    headers: {
                        authToken: user ? user.token : "",
                    },
                }
            )
            .then(() => {
                props.setLoading(false);
                const { images } = props.values;
                let filteredImages = images.filter((item) => {
                    return item.public_id !== public_id;
                });
                props.setValues({ ...props.values, images: filteredImages });
            })
            .catch((err) => {
                console.log(err);
                props.setLoading(false);
            });
    };

    return (
        <>
            <div className="row">
                {props.values.images &&
          props.values.images.map((image) => (
              <Badge
                  count="X"
                  key={image.public_id}
                  onClick={() => handleImageRemove(image.public_id)}
                  style={{ cursor: "pointer" }}
              >
                  <Avatar
                      src={image.url}
                      size={100}
                      shape="square"
                      className="ml-3"
                  />
              </Badge>
          ))}
            </div>
            <div className="row">
                <label className="btn btn-primary btn-raised mt-3">
          Choose File
                    <input
                        type="file"
                        multiple
                        hidden
                        accept="images/*"
                        onChange={fileUploadAndResize}
                    />
                </label>
            </div>
        </>
    );
};

export default FileUpload;
