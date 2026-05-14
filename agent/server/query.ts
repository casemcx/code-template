import { query } from "@anthropic-ai/claude-agent-sdk";
import type { HookJSONOutput } from "@anthropic-ai/claude-agent-sdk";
import * as path from "path";

export const aiQuery = async (onData: (value: any) => void) => {
  return new Promise(async (res, rej) => {
    const q = query({
        prompt: "使用中文，帮我分析一下这个项目",
        options: {
          maxTurns: 100,
          cwd: "/Users/casemo/code/casemo/agent/opencode",
          model: "opus",
          executable: "node", // JavaScript runtime (node/bun/deno)
          allowedTools: [
            "Task",
            "Bash",
            "Glob",
            "Grep",
            "LS",
            "ExitPlanMode",
            "Read",
            "Edit",
            "MultiEdit",
            "Write",
            "NotebookEdit",
            "WebFetch",
            "TodoWrite",
            "WebSearch",
            "BashOutput",
            "KillBash",
          ],
          env: {
            ...process.env,
            ANTHROPIC_AUTH_TOKEN: "sk-2a90be84f86b4352a636623d7d9a0703",
            ANTHROPIC_BASE_URL: "https://api.deepseek.com/anthropic",
            ANTHROPIC_DEFAULT_HAIKU_MODEL: "deepseek-v4-flash[1m]",
            ANTHROPIC_DEFAULT_OPUS_MODEL: "deepseek-v4-pro",
            ANTHROPIC_DEFAULT_SONNET_MODEL: "deepseek-v4-pro[1m]",
            ANTHROPIC_MODEL: "deepseek-v4-pro[1m]",
            ANTHROPIC_REASONING_MODEL: "deepseek-v4-pro",
          },
          hooks: {
            PreToolUse: [
              {
                matcher: "Write|Edit|MultiEdit",
                hooks: [
                  async (input: any): Promise<HookJSONOutput> => {
                    const toolName = input.tool_name;
                    const toolInput = input.tool_input;
    
                    if (!["Write", "Edit", "MultiEdit"].includes(toolName)) {
                      return { continue: true };
                    }
    
                    let filePath = "";
                    if (toolName === "Write" || toolName === "Edit") {
                      filePath = toolInput.file_path || "";
                    } else if (toolName === "MultiEdit") {
                      filePath = toolInput.file_path || "";
                    }
    
                    const ext = path.extname(filePath).toLowerCase();
                    if (ext === ".js" || ext === ".ts") {
                      const customScriptsPath = path.join(
                        process.cwd(),
                        "agent",
                        "custom_scripts",
                      );
    
                      if (!filePath.startsWith(customScriptsPath)) {
                        return {
                          decision: "block",
                          stopReason: `Script files (.js and .ts) must be written to the custom_scripts directory. Please use the path: ${customScriptsPath}/${path.basename(filePath)}`,
                          continue: false,
                        };
                      }
                    }
    
                    return { continue: true };
                  },
                ],
              },
            ],
          },
        },
      });
    
      for await (const message of q) {
        onData(message)
        if (message.type === "assistant" && message.message) {
          const textContent = message.message.content.find(
            (c: any) => c.type === "text",
          );
          if (textContent && "text" in textContent) {
            const text = textContent.text;
            console.log("Claude says:", text);
          }
        }
      }

      res(1)
  })
};
