import { config } from "dotenv";

export function setupConfig(): void {
  const path = `${__dirname}/../../setup/.env.test`;

  config({ path });
  process.env["npm_package_version"] = "1.0.0";
}
