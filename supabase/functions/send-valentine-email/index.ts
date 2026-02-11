import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to } = await req.json();
    if (!to) throw new Error("Missing 'to' email address");

    const emailResponse = await resend.emails.send({
      from: "Hogwarts Owl Post <onboarding@resend.dev>",
      to: [to],
      subject: "🦉 You've Received an Owl! - A Valentine's Message",
      html: `
        <div style="max-width:500px;margin:0 auto;font-family:Georgia,serif;background:#fdf6e3;padding:40px;border-radius:12px;border:2px solid #b8860b;">
          <div style="text-align:center;margin-bottom:24px;">
            <span style="font-size:48px;">🦉</span>
            <h1 style="color:#8b0000;margin:12px 0 4px;font-size:24px;">Hogwarts Owl Post</h1>
            <p style="color:#b8860b;font-size:12px;margin:0;letter-spacing:2px;">MINISTRY APPROVED CORRESPONDENCE</p>
          </div>
          <div style="border-top:1px solid #b8860b;border-bottom:1px solid #b8860b;padding:24px 0;margin:16px 0;">
            <p style="color:#333;font-size:16px;line-height:1.8;text-align:center;">
              Dearest Witch or Wizard,<br/><br/>
              By the magic of Dumbledore's beard and the enchantment of a thousand love potions...
              <br/><br/>
              <strong style="color:#8b0000;font-size:20px;">Will you be my Valentine? ⚡🪄</strong>
              <br/><br/>
              <em>"After all this time?" ... "Always."</em>
            </p>
          </div>
          <p style="text-align:center;color:#b8860b;font-size:14px;margin-top:16px;">
            ✨ This owl will self-destruct in your heart forever ✨
          </p>
          <div style="text-align:center;margin-top:24px;">
            <span style="font-size:24px;">⚡💕🪄</span>
          </div>
        </div>
      `,
    });

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);
