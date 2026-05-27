import { ChatAnthropic } from "@langchain/anthropic";
import { createAgent, HumanMessage, tool } from "langchain";
import { z } from "zod";
import sendMail from "./utils/sendMail.js";


const model = new ChatAnthropic({
    model:"claude-haiku-4-5-20251001",
    apiKey:process.env.CLAUDE_API_KEY
})



function meteo({ luogo }){
    return `Il meteo a ${luogo} è soleggiato e perfetto per una camminata`;
}

const sendMailTool = tool(sendMail, {
    name:"sendMail_tool",
    description:"Il tool perfetto per mandare email all'indirizzo specificato dall'utente",
    schema: z.object({
        to: z.string().describe("L'indirizzo email a cui devi mandare la mail"),
        subject: z.string().describe("L'oggetto della mail, ovvero il titolo della mail, che descrive cosa è contenuto nella mail"),
        message: z.string().describe("Il messaggio da scrivere nella mail, va tassativamente scritto in puro codice HTML con style inline")
    })
})
const meteoTool = tool(meteo,{
    name:"meteo_tool",
    description: "Il tool perfetto per quando l'utente ti chiede che tempo fa in un determinato luogo",
    schema: z.object({
        luogo: z.string().describe("Il luogo da passare al tool meteo per fargli sapere di dove ti server il meteo")
    })
})

const agent = createAgent({
    model,
    tools:[meteoTool, sendMailTool],
    systemPrompt: "Sei un agente amichevole che fa da assistente personale all'utente"
})

agent.invoke({
    messages:[
        new HumanMessage("Ciao claude, mi manderesti una mail al mio indirizzo acker.federico@gmail.com in cui mi dici che tempo fa a Formia e se è il caso di fare una passeggiata?")
    ]
}).then(response => {
    const messages = response.messages;
    console.log(messages[messages.length - 1].content);
});