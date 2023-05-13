import React, { useContext, useEffect, useState } from "react";
import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Grammarly, GrammarlyEditorPlugin } from "@grammarly/editor-sdk-react";
import ReactCountryFlag from "react-country-flag";
import { getCode } from "country-list";

import { AuthContext } from "../../../context/auth-context";
import CopyToClipboard from "../../../Component/Inputs/CopyToClipboard";
import styles from "./productlisting.module.css";
import SavedKeywordsModal from "../../../Component/Modals/SavedKeywordsModal";
import TransitionsModal from "../../../Component/featureSection/utils/Modal/Modal";

const ProductListing = () => {
  const auth = useContext(AuthContext);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
  const [targetLanguage, setTargetLanguage] = useState("en");
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
    const words = keywords
      .replace(/\n/g, " ")
      .split(" ")
      .map((word) => ({ word, keywordCount: 0 }));
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
    setKeywordsList(updatedKeywords);
  };

  const handleGenerate = async () => {
    console.log(keywordsList.map((kwd) => kwd.word).join(" "));
    setTitle("");
    setBullet1("");
    setBullet2("");
    setBullet3("");
    setBullet4("");
    setMarkdown("");
    setOpen(true);

    const response = await fetch(
      `${import.meta.env.VITE_FLASK_URL}/ecomm/generate-listing`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `I am a seller at amazon.com and I want to sell a product. Help me in writing an eye catching information about the product so that it will grab the buyers attention. For that I want you to write an eye catching detailed and descriptive product title using the keywords provided below. Then write descriptive bullet points for the product description using the keywords below. Keywords are: '${keywordsList
            .map((kwd) => kwd.word)
            .join(" ")}'

          Format the response like Title: <your title>
          Bullet1:<first bullet point>
          Bullet2: <second bullet point> etc.
          The response must include the provided keywords because they are the most searched keywords on amazon.com. `,
        }),
      }
    );

    const stream = response.body;
    const reader = stream.getReader();
    const readStream = async () => {
      const { done, value } = await reader.read();
      if (done) return;

      // Convert the received chunk of data to a string
      const chunk = new TextDecoder().decode(value);

      // Split the chunk by newline to extract each JSON response
      const responses = chunk.split("\n");
      responses.forEach((response) => {
        if (response.trim() !== "") {
          // Parse the JSON response and process the results
          const result = JSON.parse(response);
          // Process the results as needed (e.g., update UI)
          console.log("Received batch of results:", result);

          const outputs = result.response.split("\n");
          outputs.forEach((output) => {
            output = output.trim();
            if (output.startsWith("Title")) {
              setTitle(output.split(":")[1]);
            } else if (output.startsWith("Bullet1")) {
              setBullet1(output.split(":")[1]);
            } else if (output.startsWith("Bullet2")) {
              setBullet2(output.split(":")[1]);
            } else if (output.startsWith("Bullet3")) {
              setBullet3(output.split(":")[1]);
            } else if (output.startsWith("Bullet4")) {
              setBullet4(output.split(":")[1]);
            }
          });
        }
      });
      setOpen(false);
      // Continue reading the stream
      return readStream();
    };
    // Start reading the stream
    return readStream();
  };

  const createText = () => {
    setMarkdown(
      `Title: ${title} \n\n Bullet 1: ${bullet1} \n\n Bullet 2: ${bullet2} \n\n Bullet 3: ${bullet3} \n\n Bullet 4: ${bullet4}`
    );
  };

  useEffect(() => {
    updateKeywordCount();
  }, [title, bullet1, bullet2, bullet3, bullet4]);

  return (
    <>
      <SavedKeywordsModal
        open={show}
        handleClose={() => setShow(false)}
        savedKeywords={savedKeywords}
        setKeywordsList={setKeywordsList}
        setKeywords={setKeywords}
      />
      <TransitionsModal
        open={open}
        handleClose={handleClose}
        handleOpen={handleOpen}
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
                    onClick={() => {
                      handleGenerate();
                    }}
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
                  onClick={() => createText()}
                >
                  Create Text
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
                    Translate Text
                  </Button>
                </div>
              </div>

              <div>
                <div className={styles.markdownOutput}>
                  <div className={[styles.copy, styles.markdownCopy].join(" ")}>
                    <CopyToClipboard text={markdown} />
                  </div>
                  <GrammarlyEditorPlugin
                    clientId={`${import.meta.env.VITE_GRAMMARLY_CLIENT_ID}`}
                  >
                    <textarea
                      name="markdown"
                      className={styles.markdown}
                      id="markdown"
                      rows="21"
                      value={markdown}
                      onChange={(e) => setMarkdown(e.target.value)}
                    />
                  </GrammarlyEditorPlugin>
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
