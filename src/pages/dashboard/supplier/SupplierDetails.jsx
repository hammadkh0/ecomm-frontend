import React from "react";
import ReactCountryFlag from "react-country-flag";
import { useLocation } from "react-router-dom";
import { getCode } from "country-list";
import { Rating } from "@mui/material";

const SupplierDetails = () => {
  const { state } = useLocation();
  console.log(
    "🚀 ~ file: SupplierDetails.jsx:6 ~ SupplierDetails ~ supplier:",
    state
  );
  const supplier = state.supplier;
  const data = {
    overview: [
      {
        key: "Business type",
        value: "Multispecialty supplier",
      },
      {
        key: "Country / Region",
        value: "Chongqing, China",
      },
      {
        key: "Main Products",
        value: "",
      },
      {
        key: "Total employees",
        value: "11 - 50 People",
      },
      {
        key: "Total Annual Revenue",
        value: "Confidential",
      },
      {
        key: "Year established",
        value: "2008",
      },
      {
        key: "Major Clients",
        value: "Confidential",
      },
      {
        key: "Certifications",
        value: "-",
      },
      {
        key: "Product Certifications",
        value: "-",
      },
      {
        key: "Patents(2)",
        value: "Air cooler, Portable blender",
      },
      {
        key: "Trademarks(1)",
        value: "",
      },
      {
        key: "Main Markets",
        value: "North America 60.00%South America 5.00%Eastern Europe 5.00%",
      },
    ],
    production_capacity: [
      {
        cooperate_factory_information: [
          {
            key: "Factory Name",
            value: "TAIZHOU HUANGYAN BOYUE PLASTIC & MOULD CO.,LTD.",
          },
          {
            key: "Cooperation Contract",
            value: "",
          },
          {
            key: "Years of Cooperation",
            value: ">10 Years",
          },
          {
            key: "Annual Output Value",
            value: "$100 Thousand - $300 Thousand",
          },
          {
            key: "Production Capacity",
            value:
              "(Product Name)plastic plate; (Annual Production Volume) 300000 Piece/Pieces(Product Name)null; (Annual Production Volume) null null(Product Name)null; (Annual Production Volume) null null",
          },
        ],
        title: "COOPERATE FACTORY INFORMATION",
      },
      {
        factory_information: [
          {
            key: "Factory Size",
            value: "Below 1,000 square meters",
          },
          {
            key: "Factory Country/Region",
            value:
              "Room 2816, Building 1, ARC Central Plaza, No.  88, Shinianpan Street, Shapingba District, Chongqing City, China",
          },
        ],
        title: "Factory Information",
      },
      {
        title: "Annual Production Capacity",
        annual_prod_capacity: {
          line_capacity: "Confidential",
          name: "Confidential",
          units_produced: "Confidential",
          verified: "",
        },
      },
    ],
    quality_control: [
      {
        key: "",
        value: "",
      },
    ],
    rnd_capacity: [
      {
        trademark: {
          available_date: "2019-04-26 ~ 2029-02-13",
          img: "",
          trademark_category:
            "disposable plate, paper or plastic cup, cutlery,lunch box, bread box, candle holder,trash can, toilet bush, sport bottle, vacuum flask",
          trademark_name: "WINBEST",
          trademark_number: "30326745",
          verified: "Supplier-uploaded",
        },
      },
    ],
    trade_capability: [
      {
        main_market_info: [
          {
            main_market: "North America",
            main_products:
              "Humidifier; Fan; Blender; Water Bottle; Disposable Plates",
            total_revenue: "60.00%",
            verified: "",
          },
          {
            main_market: "South America",
            main_products:
              "Humidifier; Fan; Blender; Water Bottle; Disposable Plates",
            total_revenue: "5.00%",
            verified: "",
          },
          {
            main_market: "Eastern Europe",
            main_products:
              "Humidifier; Fan; Blender; Water Bottle; Disposable Plates",
            total_revenue: "5.00%",
            verified: "",
          },
          {
            main_market: "Southeast Asia",
            main_products:
              "Humidifier; Fan; Blender; Water Bottle; Disposable Plates",
            total_revenue: "5.00%",
            verified: "",
          },
          {
            main_market: "Oceania",
            main_products:
              "Humidifier; Fan; Blender; Water Bottle; Disposable Plates",
            total_revenue: "5.00%",
            verified: "",
          },
          {
            main_market: "Eastern Asia",
            main_products:
              "Humidifier; Fan; Blender; Water Bottle; Disposable Plates",
            total_revenue: "5.00%",
            verified: "",
          },
          {
            main_market: "Western Europe",
            main_products:
              "Humidifier; Fan; Blender; Water Bottle; Disposable Plates",
            total_revenue: "5.00%",
            verified: "",
          },
          {
            main_market: "Northern Europe",
            main_products:
              "Humidifier; Fan; Blender; Water Bottle; Disposable Plates",
            total_revenue: "5.00%",
            verified: "",
          },
          {
            main_market: "Southern Europe",
            main_products:
              "Humidifier; Fan; Blender; Water Bottle; Disposable Plates",
            total_revenue: "5.00%",
            verified: "",
          },
        ],
        title: "Main Markets & Product(s)",
      },
      {
        title: "Trade Ability",
        trade_ability: [
          {
            key: "Language Spoken",
            value: "English,French,Spanish",
          },
          {
            key: "No. of Employees in Trade Department",
            value: "11-20 People",
          },
          {
            key: "Average Lead Time",
            value: "45",
          },
          {
            key: "Export License Registration NO",
            value: "00610536",
          },
          {
            key: "Total Annual Revenue",
            value: "Confidential",
          },
          {
            key: "Total Export Revenue",
            value: "Confidential",
          },
        ],
      },
      {
        business_terms: [
          {
            key: "Accepted Delivery Terms",
            value: "FOB, CFR, CIF, EXW, DDP, DDU, Express Delivery, DAF",
          },
          {
            key: "Accepted Payment Currency",
            value: "USD",
          },
          {
            key: "Accepted payment methods",
            value: "T/T, L/C, PayPal, Western Union, Cash, Escrow",
          },
          {
            key: "Nearest Port",
            value: "FUZHOU, NINGBO, SHANGHAI",
          },
        ],
        title: "Business Terms",
      },
    ],
  };
  return (
    <div style={{ width: "90%", marginLeft: "1rem" }}>
      <h1 style={{ marginTop: 10, marginBottom: 10 }}>{supplier.name}</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          fontSize: 18,
          gap: 30,
        }}
      >
        <p
          style={{
            color: "#318CE7",
            fontWeight: 400,
            fontStyle: "italic",
          }}
        >
          {supplier.isVerified ? "Verified" : ""}
        </p>

        <div>
          <ReactCountryFlag countryCode={getCode(supplier.country)} svg />
          <span style={{ marginLeft: 5 }}>{supplier.country}</span>
        </div>

        <p>Experience: {supplier.experience}</p>
        <p>Level: {supplier.level}</p>

        <p style={{ display: "flex", alignItems: "center" }}>
          <Rating
            name="simple-controlled"
            value={supplier.rating}
            precision={0.1}
            readOnly
          />
          <span>({supplier.rating})</span>
        </p>
      </div>

      <div style={{ width: "90%" }}>
        <div style={{ marginTop: 20, marginBottom: 20 }}>
          <h3
            style={{
              backgroundColor: "#f4f4f4",
              padding: 10,
              borderRadius: 5,
              marginBottom: "10px",
            }}
          >
            Overview
          </h3>
          <div>
            <CreateTable item={data.overview} />
          </div>
        </div>

        <div style={{ marginTop: 20, marginBottom: 20 }}>
          <h3
            style={{
              backgroundColor: "#f4f4f4",
              padding: 10,
              borderRadius: 5,
              marginBottom: "10px",
            }}
          >
            Product Capacity
          </h3>
          <div>
            {data?.production_capacity?.map((item, idx) => {
              if (item.title === "COOPERATE FACTORY INFORMATION") {
                return (
                  <>
                    <h4 style={{ marginTop: 15, marginBottom: 10 }}>{item.title}</h4>
                    <CreateTable item={item.cooperate_factory_information} />
                  </>
                );
              } else if (item.title === "Factory Information") {
                return (
                  <>
                    <h4 style={{ marginTop: 15, marginBottom: 10 }}>{item.title}</h4>
                    <CreateTable item={item.factory_information} />
                  </>
                );
              } else {
                return (
                  <>
                    <h4 style={{ marginTop: 15, marginBottom: 10 }}>{item.title}</h4>
                    <CreateTable2 item={item.annual_prod_capacity} />
                  </>
                );
              }
            })}
          </div>
        </div>

        <div>
          <h3
            style={{
              backgroundColor: "#f4f4f4",
              padding: 10,
              borderRadius: 5,
              // width: "65%",
              marginBottom: "10px",
            }}
          >
            R&amp;D Capacity
          </h3>
          <div>
            {data.rnd_capacity.map((item, idx) => {
              return (
                <>
                  <h4 style={{ marginTop: 15, marginBottom: 10 }}>Trademark</h4>
                  <CreateTable2 item={item.trademark} />
                </>
              );
            })}
          </div>
        </div>

        <div style={{ marginTop: 20, marginBottom: 20 }}>
          <h3
            style={{
              backgroundColor: "#f4f4f4",
              padding: 10,
              borderRadius: 5,
              // width: "65%",
              marginBottom: "10px",
            }}
          >
            Trade Capabilities
          </h3>
          <div>
            {data.trade_capability.map((item, idx) => {
              if (item.title === "Main Markets & Product(s)") {
                return (
                  <>
                    <h4 style={{ marginTop: 15, marginBottom: 10 }}>{item.title}</h4>
                    <CreateTable3 item={item.main_market_info} />
                  </>
                );
              } else if (item.title === "Trade Ability") {
                return (
                  <>
                    <h4 style={{ marginTop: 15, marginBottom: 10 }}>{item.title}</h4>
                    <CreateTable item={item.trade_ability} />
                  </>
                );
              } else if (item.title === "Business Terms") {
                return (
                  <>
                    <h4 style={{ marginTop: 15, marginBottom: 10 }}>{item.title}</h4>
                    <CreateTable item={item.business_terms} />
                  </>
                );
              } else {
                return <></>;
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const CreateTable = ({ item }) => (
  <table style={{ borderCollapse: "collapse", width: "100%" }}>
    <tbody
      style={{
        fontSize: 14,
      }}
    >
      {item.map((item, idx) => {
        return (
          <tr key={idx}>
            <td
              style={{
                border: "1px solid black",
                borderCollapse: "collapse",
                padding: 12,
              }}
            >
              {item.key}
            </td>
            <td
              style={{
                border: "1px solid black",
                borderCollapse: "collapse",
                padding: 12,
              }}
            >
              {item.value === "" ? "-" : item.value}
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

const CreateTable2 = ({ item }) => {
  const entries = Object.entries(item);

  return (
    <table style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr>
          {entries.map(([key, value]) => (
            <th
              style={{
                fontSize: 14,
                fontWeight: "100",
                textAlign: "left",
                border: "1px solid black",
                backgroundColor: "#dcdee7",
                padding: 6,
              }}
            >
              {key}
            </th>
          ))}
        </tr>
      </thead>
      <tbody
        style={{
          fontSize: 14,
        }}
      >
        <tr>
          {entries &&
            entries.map(([key, value], idx) => {
              return (
                <td
                  style={{
                    border: "1px solid black",
                    borderCollapse: "collapse",
                    padding: 12,
                    //   minWidth: 100,
                  }}
                >
                  {value === "" ? "-" : value}
                </td>
              );
            })}
        </tr>
      </tbody>
    </table>
  );
};

const CreateTable3 = ({ item }) => {
  const keys = Object.keys(item[0]);

  return (
    <table style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr>
          {keys.map((key) => {
            return (
              <th
                style={{
                  fontSize: 14,
                  fontWeight: "100",
                  textAlign: "left",
                  border: "1px solid black",
                  backgroundColor: "#dcdee7",
                  padding: 6,
                }}
              >
                {key}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody
        style={{
          fontSize: 14,
        }}
      >
        {item &&
          item.map((obj) => {
            const entries = Object.entries(obj);
            return (
              <tr>
                {entries &&
                  entries.map(([key, value]) => {
                    return (
                      <td
                        style={{
                          border: "1px solid black",
                          borderCollapse: "collapse",
                          padding: 12,
                          //   minWidth: 100,
                        }}
                      >
                        {value === "" ? "-" : value}
                      </td>
                    );
                  })}
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};
export default SupplierDetails;
