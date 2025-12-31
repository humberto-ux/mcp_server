import express from "express";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";

const app = express();
app.use(express.json());

const server = new McpServer({
  name: "Clinica MCP",
  version: "1.0.0"
});

server.tool("ping", async () => {
  return {
    status: "ok",
    message: "MCP rodando com sucesso 🚀"
  };
});

const transport = new StreamableHTTPServerTransport();
await server.connect(transport);

app.use("/mcp", transport.app);

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log("MCP Server ativo na porta", PORT);
});
