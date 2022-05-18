import React, { useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardImage,
  MDBContainer,
  MDBIcon,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import { getRelatedFoods, getFood } from "../redux/features/foodSlice";
import RelatedFoods from "../components/RelatedFoods";
import DisqusThread from "../components/DisqusThread";

const SingleFood = () => {
  const dispatch = useDispatch();
  const { food, relatedFoods } = useSelector((state) => ({ ...state.food }));
  const { id } = useParams();
  const navigate = useNavigate();
  const tags = food?.tags;

  useEffect(() => {
    tags && dispatch(getRelatedFoods(tags));
  }, [tags]);

  useEffect(() => {
    if (id) {
      dispatch(getFood(id));
    }
  }, [id]);
  return (
    <>
      <MDBContainer>
        <MDBCard className="mb-3 mt-2">
          <MDBCardImage
            position="top"
            style={{ width: "100%", maxHeight: "600px" }}
            src={food.imageFile}
            alt={food.title}
          />
          <MDBCardBody>
            <MDBBtn
              tag="a"
              color="none"
              style={{ float: "left", color: "#000" }}
              onClick={() => navigate("/")}
            >
              <MDBIcon
                fas
                size="lg"
                icon="long-arrow-alt-left"
                style={{ float: "left" }}
              />
            </MDBBtn>
            <h3>{food.title}</h3>
            <span>
              <p className="text-start FoodName">Created By: {food.name}</p>
            </span>
            <div style={{ float: "left" }}>
              <span className="text-start">
                {food && food.tags && food.tags.map((item) => `#${item} `)}
              </span>
            </div>
            <br />
            <MDBCardText className="text-start mt-2">
              <MDBIcon
                style={{ float: "left", margin: "5px" }}
                far
                icon="calendar-alt"
                size="lg"
              />
              <small className="text-muted">
                {moment(food.createdAt).fromNow()}
              </small>
            </MDBCardText>
            <MDBCardText className="lead mb-0 text-start">
              {food.description}
            </MDBCardText>
          </MDBCardBody>
          <RelatedFoods relatedFoods={relatedFoods} foodId={id} />
        </MDBCard>
        {/* <DisqusThread id={id} title={food.title} path={`/food/${id}`} /> */}
      </MDBContainer>
    </>
  );
};

export default SingleFood;
