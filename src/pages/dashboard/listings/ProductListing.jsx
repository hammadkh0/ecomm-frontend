import React, { useState } from "react";
import { Button } from "@mui/material";
import { Grammarly, GrammarlyEditorPlugin } from "@grammarly/editor-sdk-react";
import keyword_extractor from "keyword-extractor";

import CopyToClipboard from "../../../Component/Inputs/CopyToClipboard";
import styles from "./productlisting.module.css";

const ProductListing = () => {
  const [input, setInput] = useState("");
  const [keywords, setKeywords] = useState("");
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

  const handleInput = (e) => {
    const words = e.target.value;
    setInput(words);
    if (words.length > 3) {
      const myKeywords = keyword_extractor.extract(words, {
        language: "english",
        remove_digits: true,
        return_changed_case: false,
        remove_duplicates: true,
        return_max_ngrams: 0,
      });
      setKeywords(myKeywords.join("\n"));
    }
  };
  return (
    <>
      <p>Enter keywords to generate listing or write your own manually</p>
      <div className={styles.listing}>
        <div className={styles.inputs}>
          <form className={styles.form}>
            <input
              type="text"
              className={[styles.textInput, styles.input].join(" ")}
              placeholder="Enter some keywords"
              value={input}
              onChange={handleInput}
            />
            <textarea
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              rows={7}
              className={[styles.keywordsInput, styles.input].join(" ")}
              id="keywords"
              placeholder="Keywords generated"
            />

            <Button className={styles.applyBtn} onClick={() => {}}>
              Generate Listing
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

            <GrammarlyEditorPlugin
              clientId={`${import.meta.env.VITE_GRAMMARLY_CLIENT_ID}`}
            >
              <textarea
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                rows={3}
                className="titleInput"
              />
            </GrammarlyEditorPlugin>
          </div>

          {/* -------------------- BULLETS OUTPUT ------------------------ */}
          <Grammarly clientId={`${import.meta.env.VITE_GRAMMARLY_CLIENT_ID}`}>
            {bullets.map((bullet) => (
              <div className={styles.output} key={bullet.id}>
                <div className={styles.outputHeading}>
                  <p>{bullet.name}</p>
                  <CopyToClipboard text={bullet.value} />
                </div>
                <GrammarlyEditorPlugin>
                  <textarea
                    value={bullet.value}
                    rows={5}
                    className={bullet.class}
                    id={bullet.id}
                    onChange={bullet.setValue}
                  />
                </GrammarlyEditorPlugin>
              </div>
            ))}
          </Grammarly>
        </div>
      </div>
    </>
  );
};

export default ProductListing;
