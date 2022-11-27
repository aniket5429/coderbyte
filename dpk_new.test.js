const crypto = require("crypto");
const { deterministicPartitionKey } = require("./dpk_new");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns the literal 'test' when partitionKey was given as test", () => {
    const trivialKey = deterministicPartitionKey({ partitionKey: "test" });
    expect(trivialKey).toBe("test");
  });

  it("Returns the literal '1032' when partitionKey was given as test", () => {
    const trivialKey = deterministicPartitionKey({ partitionKey: 1032 });
    expect(trivialKey).toBe("1032");
  });

  it("Returns the hash key when empty partition key was given", () => {
    const trivialKey = deterministicPartitionKey({});
    expect(trivialKey).toBe(
      crypto.createHash("sha3-512").update("{}").digest("hex")
    );
  });

  it("Returns the hash key when empty partition key was given", () => {
    const partitionKey = new Array(270).fill("a").join("");
    const trivialKey = deterministicPartitionKey({ partitionKey });
    expect(trivialKey).toBe(
      crypto.createHash("sha3-512").update(partitionKey).digest("hex")
    );
  });
});
