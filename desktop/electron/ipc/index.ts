import { registerWindowHandlers } from "./window";
import { registerFsHandlers } from "./fs";
import { registerGitHandlers } from "./git";
import { registerTerminalHandlers } from "./terminal";
import { registerStoreHandlers } from "./store";

export { destroyAllTerminals } from "./terminal";

export function registerIpcHandlers(): void {
  registerWindowHandlers();
  registerFsHandlers();
  registerGitHandlers();
  registerTerminalHandlers();
  registerStoreHandlers();
}
