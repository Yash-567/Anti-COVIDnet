import React, { Component } from "react";
import classes from "./Gallery.module.css";
import axios from "axios";

class Gallery extends Component {
  state = {
    images: [
      "https://firebasestorage.googleapis.com/v0/b/python-firebase-upload.appspot.com/o/2020-07-18%2F2020-07-18%2023%3A16%3A50%20trial-5.jpg?alt=media",
      "https://firebasestorage.googleapis.com/v0/b/python-firebase-upload.appspot.com/o/2020-07-18%2F2020-07-18%2023%3A17%3A38%20trial-4.jpg?alt=media",
      "https://firebasestorage.googleapis.com/v0/b/python-firebase-upload.appspot.com/o/2020-07-18%2F2020-07-18%2023%3A17%3A45%20trial-3.jpg?alt=media",
      "https://firebasestorage.googleapis.com/v0/b/python-firebase-upload.appspot.com/o/2020-07-18%2F2020-07-18%2023%3A17%3A53%20trial-2.jpg?alt=media",
      "https://firebasestorage.googleapis.com/v0/b/python-firebase-upload.appspot.com/o/2020-07-18%2F2020-07-18%2023%3A18%3A00%20trial-1.jpg?alt=media",
    ],
    date: "2020-09-07",
  };
  replaceAt = (string, index, replacement) => {
    let a = string.substr(0, index) + replacement + string.substr(index + 1);
    return a;
  };
  componentDidMount() {
    axios
      .get(
        "https://firebasestorage.googleapis.com/v0/b/python-firebase-upload.appspot.com/o/"
      )
      .then((response) => {
        console.log(response.data);
        let images = response.data.items;
        images = images.filter(
          (image) => image.name.indexOf(this.state.date) > -1
        );
        images = images.map((image) => {
          console.log(image.name);
          console.log(image.name[10]);
          image.name = this.replaceAt(image.name, 10, "%2F");
          return image;
        });
        this.setState({
          ...this.state,
          images,
        });
      });
  }
  render() {
    return (
      <div className={classes.gallery}>
        <div className="row">
          {this.state.images.map((image) => {
            return (
              <div className="col-lg-3 p-4">
                <img
                  alt="Violation"
                  src={
                    "https://firebasestorage.googleapis.com/v0/b/python-firebase-upload.appspot.com/o/" +
                    image.name +
                    "?alt=media"
                  }
                  style={{ width: "100%", height: "200px" }}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Gallery;
