const crypto = require("crypto");

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

export const getCryptoGeneratedHash = (event) => {
  if (!event) return null;
  let candidate = event?.partitionKey;
  if (!candidate) {
    const data = JSON.stringify(event);
    candidate = crypto.createHash("sha3-512").update(data).digest("hex");
  }
  return typeof candidate === "string" ? candidate : JSON.stringify(candidate);
};

exports.deterministicPartitionKey = (event) => {
  let candidate = getCryptoGeneratedHash(event) || TRIVIAL_PARTITION_KEY;

  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
  }

  return candidate;
};
