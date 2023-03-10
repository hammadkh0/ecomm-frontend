import { Button, Rating } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import TransitionsModal from "../../../Component/featureSection/utils/Modal/Modal";
import Style from "./product.module.css";

const Product = () => {
  const { state } = useLocation();
  const [product, setProduct] = useState("");
  const [reviews, setReviews] = useState([]);
  const [negativeReviews, setNegativeReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = React.useState(true);
  const [error, setError] = React.useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    axios
      .post(`${import.meta.env.VITE_FLASK_URL}/ecomm/products/${state.asin}`, {
        link: state.link,
      })
      .then(({ data }) => {
        const productData = data.product;
        console.log(data.product);
        setProduct(productData);
        setIsLoading(false);
        setOpen(false);
      })
      .catch((err) => {
        setError(err.ERROR);
        setIsLoading(false);
        setOpen(false);
      });
  }, []);

  const getReviews = async () => {
    const res = await axios.get(
      `https://api.rainforestapi.com/request?api_key=5CE91649F9134F298BC90D84D6F604E0&type=reviews&amazon_domain=${state.domain}&asin=${state.asin}&max_page=2&review_stars=all_stars&sort_by=most_recent`
    );

    const reviewsData = res.data.reviews;
    setReviews(reviewsData);
    console.log(reviewsData);
    setNegativeReviews([]);
  };

  const findNegativeReviews = async () => {
    // await getReviews();

    const filteredReviews = reviews.map((review) => {
      return { id: review.id, body: review.body };
    });

    try {
      const res = await fetch("http://localhost:5000/sentiment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          "Access-Control-Allow-Methods": "*",
          "Access-Control-Allow-Origin": "http://localhost:5000",
        },
        body: JSON.stringify({
          reviews: filteredReviews,
        }),
        mode: "cors",
      });
      const data = await res.json();

      const arr = [];
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < reviews.length; j++) {
          if (data[i].id === reviews[j].id) {
            arr.push(reviews[i]);
          }
        }
      }

      setNegativeReviews(arr);
      setReviews([]);
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) {
    return (
      <TransitionsModal
        open={open}
        handleClose={handleClose}
        handleOpen={handleOpen}
      />
    );
  }
  if (error) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <h1>{error}</h1>
      </div>
    );
  }
  return (
    <>
      <div className={Style.wrapper}>
        <div className={Style.mainDiv}>
          <img
            className={Style.productImg}
            src={product.images[0]}
            alt="productImg"
          />
          <div className={Style.headerContent}>
            <h1 className={Style.title}>{product.title}</h1>

            <p className={Style.categories}>{state.categories_flat}</p>
            <p className={Style.price}>
              Price:
              {product.price}
            </p>

            <div className={Style.features}>
              <h3>Features</h3>
              {product.attributes &&
                product.attributes.map((attr, idx) => (
                  <div key={idx}>
                    <p className={Style.featureName}>{attr.name}</p>
                    <p className={Style.feature}>{attr.value}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className={Style.featureBullets}>
          <h3>Keywords list</h3>
          <ul>
            {product.keywords_list &&
              product.keywords_list.map((word, idx) => <li key={idx}>{word}</li>)}
          </ul>
        </div>

        <div className={Style.featureBullets}>
          <h3>About this item:</h3>
          <ul>
            {product.feature_bullets &&
              product.featured_bullets.map((bullet, idx) => (
                <li key={idx}>
                  <p>{bullet}</p>
                </li>
              ))}
          </ul>
        </div>

        <div className={Style.description}>
          <h3>Prodcut Description</h3>
          <p id="desc">{product.description}</p>
        </div>

        <div style={{ display: "flex", marginBottom: "1rem" }}>
          <Button
            variant="outlined"
            sx={{ marginLeft: "10px", marginTop: "1rem", color: "#1C8090" }}
            onClick={getReviews}
          >
            Find Reviews
          </Button>
          <Button
            disabled={!reviews.length}
            variant="outlined"
            color="error"
            sx={{ marginLeft: "10px", marginTop: "1rem" }}
            onClick={findNegativeReviews}
          >
            Find Negative Reviews
          </Button>
        </div>

        {negativeReviews.length ? (
          <div className={Style.reviews}>
            <h3>Negative Reviews ({negativeReviews.length})</h3>
            {negativeReviews.map((review, idx) => (
              <div className={Style.reviewCard} key={idx}>
                Rating:
                <Rating
                  name="read-only"
                  value={review.rating}
                  precision={0.5}
                  readOnly
                />
                <p>{review.body}</p>
              </div>
            ))}
          </div>
        ) : reviews.length ? (
          <div className={Style.reviews}>
            <h3>Reviews ({reviews.length})</h3>
            {reviews.map((review, idx) => (
              <div className={Style.reviewCard} key={idx}>
                Rating:
                <Rating
                  name="read-only"
                  value={review.rating}
                  precision={0.5}
                  readOnly
                />
                <p>{review.body}</p>
              </div>
            ))}
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Product;
