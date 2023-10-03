import { ImageResponse } from "next/server";

// Route segment config
export const runtime = "edge";

// Image metadata
const size = {
  width: 1200,
  height: 630,
};

// Image generation
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const hasTitle = searchParams.has("title");
  const title = hasTitle
    ? searchParams.get("title")?.slice(0, 100)
    : "Winterlood's Blog";

  const bold = fetch(
    new URL("public/fonts/SPOQAHANSANSNEO-BOLD.TTF", import.meta.url)
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
          fontFamily: "bold",
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

        <div style={{ marginTop: 40, color: "white" }}>{title}</div>
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
      ],
    }
  );
}
