import { prisma } from "@/lib/prisma";

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const analysis = await prisma.analysis.findUnique({
      where: { id },
    });

    if (!analysis) {
      return Response.json({ error: "Analysis not found" }, { status: 404 });
    }

    const responses = await prisma.agentResponse.findMany({
      where: { analysisId: id },
      orderBy: { agentSlug: "asc" },
    });

    return Response.json({ analysis, responses });
  } catch (error) {
    console.error("Analysis fetch error:", error);
    return Response.json(
      { error: "Failed to fetch analysis" },
      { status: 500 }
    );
  }
}
