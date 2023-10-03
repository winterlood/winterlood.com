import { ImageResponse } from "next/server";
export const runtime = "edge";

export const alt = "Winterlood's Blog";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  const bold = fetch(
    new URL("public/fonts/SPOQAHANSANSNEO-BOLD.TTF", import.meta.url)
  ).then((res) => res.arrayBuffer());

  const regular = fetch(
    new URL(
      "public/fonts/SPOQAHANSANSNEO-REGULAR.TTF",
      import.meta.url
    )
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: "100px",
          backgroundColor: "rgb(28, 29, 44)",
          fontSize: 32,
          fontWeight: 600,
        }}
      >
        <div
          style={{
            display: "flex",
            borderRadius: "50%",
            overflow: "hidden",
          }}
        >
          <img
            width="150"
            height="150"
            src={`${process.env.BASE_URL}/profile_scale_up.png`}
          />
        </div>

        <div style={{ marginTop: 40, color: "white" }}>
          Winterlood's Blog
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "bold",
          data: await bold,
          style: "normal",
          weight: 400,
        },
        {
          name: "regular",
          data: await regular,
        },
      ],
    }
  );
}
