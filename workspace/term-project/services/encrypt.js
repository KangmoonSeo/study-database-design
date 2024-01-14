import { createHash } from "crypto";

const SALT = "database";
function encrypt(input) {
  const hash = createHash("sha256")
    .update(SALT + input)
    .digest("base64");
  return hash;
}

export { encrypt };
