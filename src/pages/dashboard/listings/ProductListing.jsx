import React, { useContext, useState } from "react";
import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Grammarly, GrammarlyEditorPlugin } from "@grammarly/editor-sdk-react";
import ReactCountryFlag from "react-country-flag";
import { getCode } from "country-list";

import { AuthContext } from "../../../context/auth-context";
import CopyToClipboard from "../../../Component/Inputs/CopyToClipboard";
import styles from "./productlisting.module.css";
import SavedKeywordsModal from "../../../Component/Modals/SavedKeywordsModal";

const ProductListing = () => {
  const auth = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const [keywords, setKeywords] = useState("");
  const [keywordsList, setKeywordsList] = useState([]); // [{keyword: "abc", count: 2}, {keyword: "xyz", count: 1}
  const [savedKeywords, setSavedKeywords] = useState([]);
  const [title, setTitle] = useState("");
  const [bullet1, setBullet1] = useState("");
  const [bullet2, setBullet2] = useState("");
  const [bullet3, setBullet3] = useState("");
  const [bullet4, setBullet4] = useState("");
  const [markdown, setMarkdown] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("");
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

  const badgeRefs = Array(keywordsList.length).fill(null);

  const handleInput = (e) => {
    const words = e.target.value;
    setKeywords(words);
  };

  const applyKeywords = () => {
    const words = keywords.split(" ").map((word) => ({ word, keywordCount: 0 }));
    setKeywordsList(words);
  };

  const viewSavedKeywords = () => {
    setSavedKeywords(JSON.parse(localStorage.getItem("savedKeywords")) || []);
    setShow(true);
  };

  // some magic idk how it works but it does so don't touch it or it will break everything and you will be sad :(
  function setKeywordRef(el, index) {
    if (el && badgeRefs[index] !== null) {
      // get width of keyword by getting width of the element that contains the keyword
      const keywordWidth = el.offsetWidth;

      // get width and height of badge
      const badgeWidth = badgeRefs[index].offsetWidth;
      const badgeHeight = badgeRefs[index].offsetHeight;

      // calculate top and right position of badge
      const badgeTop = -Math.round(badgeHeight / 2);
      const badgeRight = Math.round(keywordWidth - badgeWidth + 4);
      /* 
        -> set position of badge. It does by setting the top and right css properties of the badge relative to the div that contains the keyword.
        -> The div that contains the keyword is positioned relative and the badge is positioned absolute.
        -> It wont work if you set the style in the css file
      */
      badgeRefs[index].style.top = `${badgeTop}px`;
      badgeRefs[index].style.right = `${badgeRight}px`;
    }
  }

  function setBadgeRef(el, index) {
    if (badgeRefs[index] === null) {
      badgeRefs[index] = el;
      // badgeRefs contains the refs of all the badges
    }
  }

  const translateListing = async () => {
    const res = await fetch(`${import.meta.env.VITE_FLASK_URL}/ecomm/translate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
        AccessControlAllowOrigin: "*",
      },
      body: JSON.stringify({
        markdown,
        targetLanguage,
      }),
    });

    const data = await res.json();
    console.log(data);
    setMarkdown(data);
  };

  // update keyword count of every keyword in the keywords array on every change in the title textarea and bullets textarea
  const updateKeywordCount = () => {
    const titleWords = title.split(" ");
    const bullet1Words = bullet1.split(" ");
    const bullet2Words = bullet2.split(" ");
    const bullet3Words = bullet3.split(" ");
    const bullet4Words = bullet4.split(" ");

    const updatedKeywords = keywordsList.map(({ word: keyword }) => {
      let count = 0;
      console.log(
        "🚀 ~ file: ProductListing.jsx:163 ~ updatedKeywords ~ keyword:",
        keyword
      );
      console.log(
        "🚀 ~ file: ProductListing.jsx:163 ~ updatedKeywords ~ titleWords:",
        titleWords
      );

      titleWords.forEach((word) => {
        if (word.toLowerCase() === keyword.toLowerCase()) {
          count++;
        }
      });
      bullet1Words.forEach((word) => {
        if (word.toLowerCase() === keyword.toLowerCase()) {
          count++;
        }
      });
      bullet2Words.forEach((word) => {
        if (word.toLowerCase() === keyword.toLowerCase()) {
          count++;
        }
      });
      bullet3Words.forEach((word) => {
        if (word.toLowerCase() === keyword.toLowerCase()) {
          count++;
        }
      });
      bullet4Words.forEach((word) => {
        if (word.toLowerCase() === keyword.toLowerCase()) {
          count++;
        }
      });
      console.log("count", count);
      return {
        word: keyword,
        keywordCount: count,
      };
    });
    // console.log(
    //   "🚀 ~ file: ProductListing.jsx:127 ~ updateKeywordCount ~ updatedKeywords:",
    //   updatedKeywords
    // );
    setKeywordsList(updatedKeywords);
  };
  return (
    <>
      <SavedKeywordsModal
        open={show}
        handleClose={() => setShow(false)}
        savedKeywords={savedKeywords}
        setKeywordsList={setKeywordsList}
        setKeywords={setKeywords}
      />

      <div className={styles.listing}>
        {/* ----------------------- INPUTS --------------------------- */}
        <div id="card" className={styles.card}>
          <h3>Enter keywords to generate listing</h3>
          <div className={styles.inputs}>
            <form className={styles.form}>
              <div>
                {!keywordsList.length ? (
                  <textarea
                    className={[styles.textInput, styles.input].join(" ")}
                    placeholder="Enter some keywords"
                    value={keywords}
                    onChange={handleInput}
                  />
                ) : (
                  <div className={[styles.keywordsList, styles.input].join(" ")}>
                    {keywordsList.map((keyword, index) => (
                      <span key={index} style={{ position: "relative" }}>
                        <span
                          className={styles.badgeCount}
                          ref={(el) => setBadgeRef(el, index)}
                        >
                          {keyword.keywordCount}
                        </span>
                        <span
                          ref={(el) => setKeywordRef(el, index)}
                          style={
                            keywordsList[index].keywordCount > 0
                              ? { textDecoration: "line-through" }
                              : null
                          }
                        >
                          {keyword.word}
                        </span>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <Button
                  className={styles.applyBtn}
                  onClick={() => {
                    viewSavedKeywords();
                  }}
                >
                  Add Saved Keywords
                </Button>
                {!keywordsList.length ? (
                  <Button
                    disabled={!keywords.length}
                    className={styles.applyBtn}
                    onClick={() => {
                      applyKeywords();
                    }}
                  >
                    Apply
                  </Button>
                ) : (
                  <Button
                    className={styles.applyBtn}
                    onClick={() => {}}
                    disabled={!keywordsList.length}
                  >
                    Generate Listing
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* -------------------- TITLE TEXTAREA ------------------------ */}
        <div id="card" className={styles.card}>
          <div className={styles.cardData}>
            <div>
              <h3>Write your own listing or view the generated listing</h3>
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
                      onChange={(e) => {
                        setTitle(e.target.value);
                        updateKeywordCount();
                      }}
                      rows={3}
                      className="titleInput"
                    />
                  </GrammarlyEditorPlugin>
                </div>

                {/* -------------------- BULLETS TEXTAREA ------------------------ */}
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
                          onChange={(e) => {
                            bullet.setValue(e);
                            updateKeywordCount();
                          }}
                        />
                      </GrammarlyEditorPlugin>
                    </div>
                  ))}
                </Grammarly>
              </div>
            </div>

            {/* -------------------- RESULTS ------------------------ */}
            <div>
              <div className={styles.markdownBtns}>
                <Button
                  disabled={!title || !bullet1 || !bullet2 || !bullet3 || !bullet4}
                  variant="outlined"
                  color="warning"
                  className={styles.markdownBtn}
                >
                  Create Markdown
                </Button>
                <div
                  style={{
                    display: "flex",
                    gap: "1rem",
                  }}
                >
                  <div>
                    <FormControl
                      sx={{ minWidth: 120, width: "200px", marginTop: 0 }}
                      size="small"
                      className={styles.formControl}
                    >
                      <InputLabel id="demo-select-small">Langauge</InputLabel>
                      <Select
                        labelId="demo-select-small"
                        id="demo-select-small"
                        value={targetLanguage}
                        label="Language"
                        required
                        onChange={(e) => {
                          setTargetLanguage(e.target.value);
                        }}
                        sx={{ width: "100%" }}
                      >
                        <MenuItem value={"en"}>
                          <span className={styles.languageName}>English</span>
                          <ReactCountryFlag countryCode={"GB"} svg />
                        </MenuItem>
                        <MenuItem value={"nl"}>
                          <span className={styles.languageName}>Dutch</span>
                          <ReactCountryFlag
                            countryCode={getCode("Netherlands")}
                            svg
                          />
                        </MenuItem>
                        <MenuItem value={"de"}>
                          <span className={styles.languageName}>German</span>
                          <ReactCountryFlag countryCode={getCode("Germany")} svg />
                        </MenuItem>
                        <MenuItem value={"zh-cn"}>
                          <span className={styles.languageName}>Chinese</span>
                          <ReactCountryFlag countryCode={getCode("China")} svg />
                        </MenuItem>
                        <MenuItem value={"ur"}>
                          <span className={styles.languageName}>Urdu</span>
                          <ReactCountryFlag countryCode={getCode("Pakistan")} svg />
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </div>

                  <Button
                    disabled={!markdown.length}
                    variant="outlined"
                    color="success"
                    className={styles.markdownBtn}
                    onClick={() => translateListing()}
                  >
                    Translate Markdown
                  </Button>
                </div>
              </div>

              <div>
                <div className={styles.markdownOutput}>
                  <div className={[styles.copy, styles.markdownCopy].join(" ")}>
                    <CopyToClipboard text={markdown} />
                  </div>
                  <textarea
                    name="markdown"
                    className={styles.markdown}
                    id="markdown"
                    rows="21"
                    value={markdown}
                    onChange={(e) => setMarkdown(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductListing;
