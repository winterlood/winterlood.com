import { notFound } from "next/navigation";
import { BetaAnalyticsDataClient } from "@google-analytics/data";

export async function GET(
  request: Request
): Promise<Response | void> {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get("path");

  try {
    const analyticsDataClient = new BetaAnalyticsDataClient({
      projectId: process.env.GOOGLE_PROJECT_ID,
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env
          .GOOGLE_PRIVATE_KEY!.split(String.raw`\n`)
          .join("\n"),
      },
    });

    const [response] = await analyticsDataClient.runReport({
      property: `properties/${process.env.GOOGLE_PROJECT_ID}`,
      dateRanges: [
        {
          startDate: "2022-01-07",
          endDate: "today",
        },
      ],
      dimensions: [
        {
          name: "pagePath",
        },
      ],
      dimensionFilter: path
        ? {
            filter: {
              fieldName: "pagePath",
              stringFilter: {
                matchType: "EXACT",
                value: path,
              },
            },
          }
        : undefined,
      metrics: [
        {
          name: "screenPageViews",
        },
      ],
    });

    const res = response.rows?.map((row) => ({
      path: row.dimensionValues![0].value,
      pageView: row.metricValues![0].value,
    }));

    return new Response(JSON.stringify(res), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
  }
}
