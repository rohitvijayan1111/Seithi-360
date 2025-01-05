import React from "react";
import { Button, Card } from "react-bootstrap";
import "./NewsCard.css";
import { Details } from "../index";
import { ReactComponent as ArrowIcon } from "../../images/ArrowIcon.svg";

function NewsCard({
  imageUrl,
  alt,
  description,
  title,
  channel,
  published,
  urlNews,
  author,
}) {
  return (
    <Card className="news-card">
      <Card.Img
        className="news-card-img"
        variant="top"
        src={imageUrl}
        alt={alt}
      />
      <Card.Body className="news-card-body">
        <Card.Title className="news-card-title">{title}</Card.Title>
        <Card.Text className="news-card-description">
          {description?.substr(0, 150)}...
        </Card.Text>
        <Details channel={channel} published={published} author={author} />
        <Button className="news-card-btn" href={urlNews} target="_blank">
          Read more <ArrowIcon className="news-card-arrow-icon" />
        </Button>
      </Card.Body>
    </Card>
  );
}

export default NewsCard;
