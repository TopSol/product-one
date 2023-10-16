import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
function Loader() {
  return (
    <LoadingOutlined
      style={{
        fontSize: 24,
      }}
      spin
    />
  );
}

export default Loader;
