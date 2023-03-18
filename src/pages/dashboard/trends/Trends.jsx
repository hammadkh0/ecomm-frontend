import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import { Button, TextField } from "@mui/material";
import TransitionsModal from "../../../Component/featureSection/utils/Modal/Modal";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DATA = {
  related_results: {
    related_queries: {
      rising_query: {
        0: "mi tv 43 inch",
        1: "tcl 40 inch android tv",
        2: "mi tv 4a 40 inch",
        3: "oneplus 40 inch tv",
        4: "mi smart tv 40 inch",
        5: "mi smart tv",
        6: "mi 40 inch tv",
        7: "mi 40 inch tv price",
        8: "mi tv",
        9: "thomson tv",
        10: "mi led tv",
        11: "mi 40 inch led tv price",
        12: "mi 40 inch led tv",
        13: "tv 40 inch berapa cm",
        14: "mi tv 40 inch price in india",
        15: "harga tv coocaa 40 inch",
        16: "mi led tv 40 inch price in india",
        17: "43 inch in cm",
        18: "tcl 40 inch smart tv",
        19: "tcl smart tv",
        20: "tcl",
        21: "tcl tv",
        22: "tcl 40 inch tv",
        23: "sharp 40 inch smart tv tesco",
        24: "roku tv 40 inch",
      },
      rising_query_value: {
        0: 10700,
        1: 3750,
        2: 3650,
        3: 3050,
        4: 2850,
        5: 2600,
        6: 2150,
        7: 2000,
        8: 1900,
        9: 1750,
        10: 1300,
        11: 1250,
        12: 1250,
        13: 1250,
        14: 1200,
        15: 1000,
        16: 950,
        17: 500,
        18: 500,
        19: 500,
        20: 350,
        21: 350,
        22: 350,
        23: 350,
        24: 300,
      },
      top_query: {
        0: "40 smart tv",
        1: "40 inch tv smart",
        2: "smart tv",
        3: "40 inch led tv",
        4: "led tv",
        5: "40 inch tv price",
        6: "samsung 40 inch tv",
        7: "samsung tv",
        8: "samsung",
        9: "samsung 40 inch",
        10: "40 in tv",
        11: "led tv price 40 inch",
        12: "led tv price",
        13: "sony 40 inch tv",
        14: "smart tv samsung 40 inch",
        15: "32 inch tv",
        16: "samsung smart tv",
        17: "40 inch samsung smart tv",
        18: "samsung tv 40 inch smart tv",
        19: "sony tv",
        20: "sony",
        21: "40 inch smart tv price",
        22: "best 40 inch tv",
        23: "40 inch tv 4k",
        24: "4k tv",
      },
      top_query_value: {
        0: 100,
        1: 98,
        2: 90,
        3: 63,
        4: 62,
        5: 55,
        6: 49,
        7: 48,
        8: 47,
        9: 47,
        10: 40,
        11: 26,
        12: 26,
        13: 23,
        14: 22,
        15: 22,
        16: 22,
        17: 21,
        18: 21,
        19: 21,
        20: 21,
        21: 19,
        22: 18,
        23: 18,
        24: 18,
      },
    },
    related_topics: {
      rising_query_value: {
        0: 24650,
        1: 9900,
        2: 4550,
        3: 2900,
        4: 2300,
        5: 2100,
        6: 2000,
        7: 1550,
        8: 1300,
        9: 500,
        10: 350,
        11: 350,
        12: 350,
        13: 250,
        14: 250,
        15: 250,
        16: 250,
        17: 250,
        18: 250,
        19: 200,
        20: 200,
        21: 180,
        22: 170,
        23: 160,
        24: 160,
      },
      rising_topic_title: {
        0: "Realme",
        1: "onn.",
        2: "Xiaomi Mi TV 4A",
        3: "OnePlus",
        4: "Xiaomi Mi",
        5: "THOMSON",
        6: "Xiaomi Mi TV",
        7: "Xiaomi",
        8: "COOCAA",
        9: "Quantum dot display",
        10: "Android TV",
        11: "Smart device",
        12: "TCL",
        13: "FireTV",
        14: "Android",
        15: "Measure",
        16: "3.6 ft",
        17: "Roku",
        18: "specification",
        19: "75 in",
        20: "VIZIO D-Series",
        21: "BIG W",
        22: "Polytron",
        23: "Pricing strategies",
        24: "Motherboard",
      },
      rising_topic_type: {
        0: "Consumer electronics company",
        1: "Topic",
        2: "Smart TV",
        3: "Topic",
        4: "Mobile phone",
        5: "Topic",
        6: "Television set",
        7: "Consumer electronics company",
        8: "Topic",
        9: "Topic",
        10: "Operating system",
        11: "Topic",
        12: "Topic",
        13: "Digital media player",
        14: "Operating system",
        15: "Mathematics",
        16: "Topic",
        17: "Operating system",
        18: "Topic",
        19: "Topic",
        20: "Television set",
        21: "Discount store company",
        22: "Company",
        23: "Topic",
        24: "Topic",
      },
      top_query_value: {
        0: 100.0,
        1: 32.0,
        2: 23.0,
        3: 21.0,
        4: 21.0,
        5: 18.0,
        6: 15.0,
        7: 10.0,
        8: 8.0,
        9: 7.0,
        10: 7.0,
        11: 6.0,
        12: 5.0,
        13: 4.0,
        14: 3.0,
        15: 3.0,
        16: 3.0,
        17: 3.0,
        18: 3.0,
        19: 3.0,
        20: 3.0,
        21: 2.0,
        22: 2.0,
        23: 2.0,
        24: NaN,
      },
      top_topic_title: {
        0: "Television set",
        1: "Smart TV",
        2: "Price",
        3: "Television",
        4: "Light-emitting diode",
        5: "Samsung",
        6: "Inch",
        7: "LED-backlit LCD",
        8: "4K resolution",
        9: "2.67 ft",
        10: "Sony",
        11: "LG",
        12: "3.6 ft",
        13: "TCL",
        14: "Sharp",
        15: "Pricing strategies",
        16: "Walmart",
        17: "1080p",
        18: "Xiaomi Mi",
        19: "Hisense",
        20: "Centimeter",
        21: "Panasonic",
        22: "Android",
        23: "Computer monitor",
        24: NaN,
      },
      top_topic_type: {
        0: "Topic",
        1: "Topic",
        2: "Topic",
        3: "Topic",
        4: "Topic",
        5: "Topic",
        6: "Unit of length",
        7: "Topic",
        8: "Topic",
        9: "Topic",
        10: "Topic",
        11: "Topic",
        12: "Topic",
        13: "Topic",
        14: "Topic",
        15: "Topic",
        16: "Retailer corporation",
        17: "Topic",
        18: "Mobile phone",
        19: "Topic",
        20: "Unit of length",
        21: "Brand",
        22: "Operating system",
        23: "Topic",
        24: NaN,
      },
    },
    suggestions: [
      {
        mid: "/g/11hymjkp81",
        title: "Changhong Electric CHiQ UXXE6000",
        type: "Smart TV",
      },
      {
        mid: "/g/11hdbvn9ft",
        title:
          "kourstore Monoprice Above Fireplace Pull-Down Full-Motion Tv Wall Mount 15618",
        type: "TV mount",
      },
    ],
  },
  trending_regions: {
    inch_tv: {
      Australia: 62,
      Bangladesh: 53,
      Belgium: 21,
      Brazil: 1,
      Canada: 30,
      Egypt: 7,
      France: 1,
      Germany: 2,
      Ghana: 82,
      Greece: 10,
      "Hong Kong": 11,
      India: 89,
      Indonesia: 66,
      Ireland: 54,
      Italy: 1,
      Kenya: 91,
      Kuwait: 65,
      Malaysia: 37,
      Mexico: 2,
      Nepal: 41,
      Netherlands: 63,
      "New Zealand": 40,
      Nigeria: 28,
      Oman: 53,
      Pakistan: 65,
      Philippines: 29,
      Qatar: 69,
      Romania: 7,
      Russia: 1,
      "Saudi Arabia": 19,
      Singapore: 32,
      "South Africa": 94,
      Spain: 2,
      "Sri Lanka": 35,
      Thailand: 4,
      Turkey: 10,
      Uganda: 62,
      "United Arab Emirates": 72,
      "United Kingdom": 100,
      "United States": 39,
      Vietnam: 12,
    },
  },
};

const Trends = () => {
  const [keywords, setKeywords] = React.useState("");
  const [data, setData] = React.useState();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function getTrends(e) {
    e.preventDefault();
    setOpen(true);
    fetch(`${import.meta.env.VITE_FLASK_URL}/ecomm/trends`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        keywords: keywords,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const formattedData = Object.entries(
          data.trending_regions.smart_watches
        ).map(([key, value]) => ({
          region: key,
          count: value,
        }));

        setData(formattedData);
        setOpen(false);
      })

      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div
      style={{
        width: "90%",
        margin: "1rem",
      }}
    >
      <h1>Find different Trends</h1>
      <div
        id="card"
        style={{
          marginTop: 24,
          border: "1px solid rgb(217, 224, 232)",
          borderRadius: "6px",
          padding: "24px",
        }}
      >
        <h3 style={{ marginBottom: 10 }}>Search Using Keywords</h3>
        <form style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <TextField
            label="keywords"
            id="outlined-size-small"
            size="small"
            name="asin"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
          />
          <div>
            <Button
              variant="outlined"
              color="warning"
              sx={{ height: 40 }}
              type="submit"
              disabled={keywords.length === 0}
              //   onClick={getTrends}
              onClick={(e) => {
                e.preventDefault();
                const formattedData = Object.entries(
                  DATA.trending_regions.inch_tv
                ).map(([key, value]) => ({
                  region: key,
                  count: isNaN(value) ? "" : value,
                }));
                setData(formattedData);
              }}
            >
              Find Trends
            </Button>
          </div>
        </form>
      </div>
      {data && (
        <>
          <h4
            style={{
              marginTop: "1rem",
              marginLeft: "5px",
            }}
          >
            Interest in keywords shown by regions
          </h4>
          <div
            style={{
              height: "500px",
              margin: "auto",
              textAlign: "center",
            }}
          >
            <Bar
              datasetIdKey="id"
              data={{
                labels: data.map((item) => item.region),
                datasets: [
                  {
                    label: "Trending Regions",
                    data: data.map((item) => item.count),
                    backgroundColor: "#29c0d7",
                    borderColor: "#29c0d7",
                    borderWidth: 1,
                  },
                ],
              }}
            />
          </div>
        </>
      )}

      <div>
        <h4
          style={{
            marginLeft: "1rem",
            marginBottom: "1rem",
          }}
        >
          Top queries related to the keywords
        </h4>
        <div>
          {Object.values(DATA.related_results.related_queries.top_query).map(
            (item) => {
              return (
                <p
                  style={{
                    display: "inline-block",
                    padding: 8,
                    border: "2px solid #1c8090",
                    borderRadius: 50,
                    margin: "5px 10px",
                    cursor: "pointer",
                    fontSize: 14,
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = "#1c8090";
                    e.target.style.color = "white";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = "white";
                    e.target.style.color = "#1c8090";
                  }}
                >
                  {item}
                </p>
              );
            }
          )}
        </div>
      </div>

      <TransitionsModal
        open={open}
        handleClose={handleClose}
        handleOpen={handleOpen}
      />
    </div>
  );
};

export default Trends;
