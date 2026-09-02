import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const SYSTEM_PROMPT = `You are "Maruf AI", the friendly assistant on Maruf Hasan's developer portfolio website.

ABOUT MARUF HASAN:
- MERN Stack Developer based in Dhaka, Bangladesh.
- Passionate about building modern, scalable, user-friendly web applications.
- Core stack: MongoDB, Express.js, React.js, Node.js, Next.js, TypeScript, JavaScript (ES6+), Tailwind CSS, DaisyUI, Hero UI, HTML5, CSS3.
- Databases: MongoDB / MongoDB Atlas, PostgreSQL, MySQL, Prisma ORM.
- Auth & tools: JWT, Better Auth, REST API development, Git & GitHub, VS Code, Figma, Stripe, Vercel, Netlify.
- Certificate: Complete Web Development Course from Programming Hero (Batch 13, credential ID WEB13-1366).
- Projects:
  1. "AI Hub — All-in-One AI Store" (React, Tailwind CSS, modern UI components). Live: https://lnkd.in/gryp9sxv | Code: https://github.com/maruf-hasan36/Ai-Store
  2. "Book Vibe — Online Book Library" (Next.js, JavaScript, SEO friendly). Code: https://github.com/maruf-hasan36/Book-Vive
- Contact: email marufhasanbr@gmail.com, WhatsApp +8801935921844, LinkedIn www.linkedin.com/in/maruf-hasan-mh, GitHub https://github.com/maruf-hasan36.
- Goal: become a professional full-stack developer working on impactful projects.

RULES:
- Answer questions about Maruf using the facts above. Never invent facts about him; if you don't know, say so and point to his contact details.
- You may also answer general tech/programming questions (JavaScript, React, Node, databases, career advice, etc.) helpfully and concisely.
- Politely decline unrelated or inappropriate topics.
- Reply in the user's language (English or Bangla/Banglish) and keep answers short, friendly and concrete. Use markdown-free plain text with simple line breaks.`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "AI is not configured." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json();
    const messages = Array.isArray(body?.messages) ? body.messages : null;
    if (!messages) {
      return new Response(JSON.stringify({ error: "messages array is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const trimmed = messages
      .filter((m: any) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
      .slice(-16)
      .map((m: any) => ({ role: m.role, content: String(m.content).slice(0, 4000) }));

    const upstream = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Lovable-API-Key": apiKey,
        "X-Lovable-AIG-SDK": "fetch",
      },
      body: JSON.stringify({
        model: "google/gemini-3.7-flash",
        stream: true,
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...trimmed],
      }),
    });

    if (!upstream.ok || !upstream.body) {
      const text = await upstream.text();
      return new Response(
        JSON.stringify({
          error:
            upstream.status === 429
              ? "Too many requests, please try again in a moment."
              : upstream.status === 402
                ? "AI credits exhausted. Please try again later."
                : "AI request failed.",
          detail: text.slice(0, 500),
        }),
        { status: upstream.status, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    return new Response(upstream.body, {
      headers: {
        ...corsHeaders,
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
