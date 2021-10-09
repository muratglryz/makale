import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
const MAKALE_HEPSI = gql`
  {
    makalegetir {
      id
      baslik
      icerik
    }
  }
`;

export default function MakaleListesi() {
  const { data, loading, error } = useQuery(MAKALE_HEPSI);
  let makaleTemp;
  if (loading) {
  } else if (data) {
    makaleTemp = data.makalegetir.map((makale) => {
      return (
        <div className="col-md-12 list-group" key={makale.id}>
          <Link
            className="list-group-item list-group-item-action"
            to={`/makale/${makale.id}`}
          >
            {makale.baslik}
          </Link>
        </div>
      );
    });
  } else {
  }
  return (
    <main className="container" role="main">
      <div className="d-flex align-items-center p-3 my-3 text-white-50 bg-success rounded box-shadow">
        <div className="lh-100">
          <h6 className="mb-0 text-white lh-100"> Makale Listesi</h6>
        </div>
      </div>{" "}
      <div>{makaleTemp}</div>
    </main>
  );
}
