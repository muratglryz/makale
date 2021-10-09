import React from "react";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";

const MAKALE_GETIR = gql`
  query tekmakale($id: ID!) {
    tekmakale(id: $id) {
      id
      baslik
      icerik
    }
  }
`;
const MAKALE_SIL = gql`
  mutation makalesil($id: ID!) {
    makaleSil(id: $id)
  }
`;
export default function MakaleDetay(props) {
  let id = props.match.params.id;
  const { data, loading, error } = useQuery(MAKALE_GETIR, {
    variables: { id },
  });
  const [silMakale] = useMutation(MAKALE_SIL);
  const onClick = () => {
    silMakale({ variables: { id } });
    window.location = "/";
  };
  return (
    <main className="container" role="main">
      <div className="d-flex align-items-center p-3 my-3 text-white-50 bg-success rounded box-shadow">
        <div className="lh-100">
          <h6 className="mb-0 text-white lh-100"> Makale Detay</h6>
        </div>
      </div>{" "}
      {data && (
        <div className="col-md-12">
          <h2>{data.tekmakale.baslik}</h2>
          <div className="list-group">
            <p className="list-group-item list-group-item-action">
              {data.tekmakale.icerik}
            </p>
            <div className="col-md-12">
              <a className="btn btn-danger m-2 float-right" onClick={onClick}>
                Sil
              </a>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
