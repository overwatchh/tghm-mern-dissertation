import { Helmet } from "react-helmet";
import React from "react";

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Welcome to TGHM",
  keyword: "electronics,buy electronics, chep electronics",
  description: "We sell the best products for chep",
};
export default Meta;
