import React from "react";
import { useLocation } from "react-router-dom";
import { CreateTable } from "./SupplierDetails";

const SupplierProductDetails = () => {
  const data = {
    essential_info: [
      {
        key: "Printing Methods",
        value: "Digital printing",
      },
      {
        key: "Place of Origin",
        value: "Pakistan",
      },
      {
        key: "Brand Name",
        value: "Custom",
      },
      {
        key: "Model Number",
        value: "GI-1680",
      },
      {
        key: "Feature",
        value:
          "Anti-wrinkle, QUICK DRY, Compressed, Anti-pilling, Breathable, Sustainable, Anti-Shrink",
      },
      {
        key: "Collar",
        value: "O-Neck",
      },
      {
        key: "Fabric Weight",
        value: "180 Grams",
      },
      {
        key: "Available Quantity",
        value: "10000",
      },
      {
        key: "Material",
        value: "Polyester / Cotton",
      },
      {
        key: "Technics",
        value: "Printed",
      },
      {
        key: "Sleeve Style",
        value: "Short sleeve",
      },
      {
        key: "Gender",
        value: "Men",
      },
      {
        key: "Design",
        value: "With Pattern",
      },
      {
        key: "Pattern Type",
        value: "Animal",
      },
      {
        key: "Style",
        value: "PUNK STYLE",
      },
      {
        key: "Fabric Type",
        value: "Jersey",
      },
      {
        key: "7 days sample order lead time",
        value: "Support",
      },
      {
        key: "Weaving method",
        value: "knitted",
      },
      {
        key: "Product Type",
        value: "Sportswear",
      },
      {
        key: "Sportswear Type",
        value: "Fitness & Yoga Wear",
      },
      {
        key: "Logo",
        value: "Customized",
      },
      {
        key: "Size",
        value: "Customzied Size",
      },
      {
        key: "Packing",
        value: "Custom Packing",
      },
      {
        key: "Printing",
        value: "Customized",
      },
      {
        key: "Type",
        value: "Gym Clothing/Street Fashion/Casual",
      },
      {
        key: "Keywords",
        value: "custom printing t shirt",
      },
      {
        key: "Sample",
        value: "Accept Customize Sample",
      },
      {
        key: "Delivery time",
        value: "15-25 Days",
      },
    ],
    lead_time: [
      {
        price: "6",
        quantity: "1 - 50",
      },
      {
        price: "15",
        quantity: "51 - 1000",
      },
      {
        price: "To be negotiated",
        quantity: "> 1000",
      },
    ],
    package_delivery: [
      {
        key: "Packaging Details",
        value:
          "- Each piece will be pack in the polybag.- Customize packaging is available as per our customer demand.",
      },
      {
        key: "Port",
        value: "SIALKOT,LAHORE,KARACHI,ISLAMABAD",
      },
    ],
    prices: [
      {
        price: "$6.16",
        quality: "20 - 99 pieces",
      },
      {
        price: "$5.87",
        quality: "100 - 499 pieces",
      },
      {
        price: "$5.05",
        quality: "500 - 999 pieces",
      },
      {
        price: "$3.97",
        quality: ">= 1000 pieces",
      },
    ],
    supply_ability: [
      {
        key: "Supply Ability",
        value: "10000 Piece/Pieces per   Month",
      },
    ],
    title:
      "animal print Cotton T-Shirt for Men and Women. aisdjas daso dasoid aodi uasod uasod asudoi s",
  };

  const { state } = useLocation();
  const product = state.product;
  return (
    <div style={{ width: "80%", marginLeft: "1rem" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <img src={product.image} alt={product.title} width={150} height={150} />
        <h2
          style={{
            marginTop: 10,
            marginBottom: 20,
            fontWeight: 500,
            maxWidth: "50%",
          }}
        >
          {data.title}
        </h2>
      </div>
      <hr />
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <p>Prices:</p>
        {data.prices.map((priceItem, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              flexDirection: "column",
              minWidth: "200px",
              padding: 10,
            }}
          >
            <p style={{ fontSize: 14 }}>{priceItem.quality}</p>
            <p style={{ fontSize: 18, fontWeight: "bold", color: "#135863" }}>
              {priceItem.price}
            </p>
          </div>
        ))}
      </div>
      <hr />
      <div>
        <h4>Lead Time</h4>
        <table style={{ borderCollapse: "collapse", width: "80%" }}>
          <tbody
            style={{
              fontSize: 14,
            }}
          >
            <tr>
              <td
                style={{
                  border: "1px solid black",
                  borderCollapse: "collapse",
                  padding: 12,
                  backgroundColor: "#dcdee7",
                }}
              >
                Quantity (Pieces)
              </td>
              {data.lead_time.map((leadTimeItem, idx) => (
                <td
                  style={{
                    border: "1px solid black",
                    borderCollapse: "collapse",
                    padding: 12,
                  }}
                >
                  {leadTimeItem.price}
                </td>
              ))}
            </tr>
            <tr>
              <td
                style={{
                  border: "1px solid black",
                  borderCollapse: "collapse",
                  padding: 12,
                  width: 150,
                  backgroundColor: "#dcdee7",
                }}
              >
                Lead Time (Days)
              </td>
              {data.lead_time.map((leadTimeItem, idx) => (
                <td
                  style={{
                    border: "1px solid black",
                    borderCollapse: "collapse",
                    padding: 12,
                  }}
                >
                  {leadTimeItem.quantity}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{ width: "80%", marginTop: 16 }}>
        <h4 style={{ marginBottom: 10 }}>Essential Information</h4>
        <CreateTable item={data.essential_info} />
      </div>
      <div style={{ width: "80%", marginTop: 16 }}>
        <h4 style={{ marginBottom: 10 }}>Package Delivery</h4>
        <CreateTable item={data.package_delivery} />
      </div>
      <div style={{ width: "80%", marginTop: 16, marginBottom: 16 }}>
        <h4 style={{ marginBottom: 10 }}>Supply Ability</h4>
        <CreateTable item={data.supply_ability} />
      </div>
    </div>
  );
};

export default SupplierProductDetails;
