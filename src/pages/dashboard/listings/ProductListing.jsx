import React, { useState } from "react";
import { Button } from "@mui/material";

import styles from "./productlisting.module.css";
import CopyToClipboard from "../../../Component/Inputs/CopyToClipboard";

const ProductListing = () => {
  const [title, setTitle] = useState("");
  const [bullet1, setBullet1] = useState("");
  const [bullet2, setBullet2] = useState("");
  const [bullet3, setBullet3] = useState("");
  const [bullet4, setBullet4] = useState("");

  const bullets = [
    {
      name: "Bullet1",
      class: "bullet",
      id: "bullet1",
      value: bullet1,
      setValue: (e) => setBullet1(e.target.value),
    },
    {
      name: "Bullet2",
      class: "bullet",
      id: "bullet2",
      value: bullet2,
      setValue: (e) => setBullet2(e.target.value),
    },
    {
      name: "Bullet3",
      class: "bullet",
      id: "bullet3",
      value: bullet3,
      setValue: (e) => setBullet3(e.target.value),
    },
    {
      name: "Bullet4",
      class: "bullet",
      id: "bullet4",
      value: bullet4,
      setValue: (e) => setBullet4(e.target.value),
    },
  ];

  return (
    <div>
      <h2>Enter the keywords</h2>
      <div className={styles.listing}>
        <div className={styles.inputs}>
          <form className={styles.form}>
            <input
              type="text"
              className={[styles.textInput, styles.input].join(" ")}
              placeholder="Enter some text"
            />
            <textarea
              name=""
              rows={70}
              cols={70}
              className={[styles.keywordsInput, styles.input].join(" ")}
              id=""
              placeholder="Keywords generated"
            />

            <Button className={styles.applyBtn} onClick={() => {}}>
              Apply
            </Button>
          </form>
        </div>

        {/* -------------------- TITLE OUTPUT ------------------------ */}
        <div className={styles.outputs}>
          <div className={[styles.title, styles.output].join(" ")}>
            <div className={styles.outputHeading}>
              <p>Title</p>
              <CopyToClipboard text={title} />
            </div>
            <textarea
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              rows={3}
              className="titleInput"
            />
          </div>

          {/* -------------------- BULLETS OUTPUT ------------------------ */}
          {bullets.map((bullet) => (
            <div className={styles.output} key={bullet.id}>
              <div className={styles.outputHeading}>
                <p>{bullet.name}</p>
                <CopyToClipboard text={bullet.value} />
              </div>
              <textarea
                value={bullet.value}
                rows={5}
                className={bullet.class}
                id={bullet.id}
                onChange={bullet.setValue}
              />
            </div>
          ))}

          {/* <div className={styles.output}>
            <div className={styles.outputHeading}>
              <p>Bullet1</p>
              <CopyToClipboard />
            </div>
            <textarea rows={5} className="bullet" id="bullet1" />
          </div>

          <div className={styles.output}>
            <div className={styles.outputHeading}>
              <p>Bullet 2:</p>
              <CopyToClipboard />
            </div>
            <textarea rows={5} className="bullet" id="bullet2" />
          </div>

          <div className={styles.output}>
            <div className={styles.outputHeading}>
              <p>Bullet 3:</p>
              <CopyToClipboard />
            </div>
            <textarea rows={5} className="bullet" id="bullet3" />
          </div>

          <div className={styles.output}>
            <div className={styles.outputHeading}>
              <p>Bullet 4:</p>
              <CopyToClipboard />
            </div>
            <textarea rows={5} className="bullet" id="bullet4" />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
