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
          backgroundImage: `url(${process.env.BASE_URL}/og_back.png)`,
          fontSize: 32,
          fontWeight: 600,
          fontFamily: "bold",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            margin: "80px 60px",
            justifyContent: "space-between",
          }}
        >
          <div style={{ color: "rgb(200,200,200)", fontSize: "30" }}>
            이정환 | Winterlood
          </div>

          <div
            style={{
              color: "white",
              fontSize: "65",
              wordBreak: "keep-all",
            }}
          >
            {title}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <div
              style={{
                display: "flex",
                overflow: "hidden",
                borderRadius: "50%",
              }}
            >
              <img
                width="200"
                height="200"
                src={`${process.env.BASE_URL}/profile_scale_up.png`}
              />
            </div>
          </div>
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
      ],
    }
  );
}
