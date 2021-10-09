import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

const MAKALE_EKLE = gql`
  mutation makaleOlustur($baslik: String!, $icerik: String!) {
    makaleOlustur(baslik: $baslik, icerik: $icerik) {
      id
      baslik
      icerik
    }
  }
`;

export default function MakaleEkle() {
  const [veriler, setveriler] = new useState({
    baslik: "",
    icerik: "",
  });
  const [makaleEkle, { loading }] = useMutation(MAKALE_EKLE, {
    update(proxy, sonuc) {
      console.log(sonuc);
    },
    variables: veriler,
  });
  const onChange = (e) => {
    setveriler({ ...veriler, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(veriler);
    makaleEkle();
    window.location = "/";
  };
  return (
    <main className="container" role="main">
      <div className="d-flex align-items-center p-3 my-3 text-white-50 bg-success rounded box-shadow">
        <div className="lh-100">
          <h6 className="mb-0 text-white lh-100"> Makale Ekle</h6>
        </div>
      </div>{" "}
      <div className="col-md-12">
        <form onSubmit={onSubmit}>
          <label className="col-form-label" htmlFor="baslik">
            Makale Başlık
          </label>
          <input
            className="form-control"
            type="text"
            id="baslik"
            name="baslik"
            onChange={onChange}
          />
          <label className="col-form-label" htmlFor="icerik">
            Makale İçerik
          </label>
          <textarea
            className="form-control"
            type="text"
            id="icerik"
            name="icerik"
            onChange={onChange}
          ></textarea>
          <button className="btn btn-success m-2 float-right">Kaydet</button>
        </form>
      </div>
    </main>
  );
}
