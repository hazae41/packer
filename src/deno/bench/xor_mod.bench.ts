import { initSyncBundledOnce, xor_mod } from "../mod.ts";

initSyncBundledOnce()

const group = "xor_mod"

const bytes = new Uint8Array(1024)
crypto.getRandomValues(bytes)

const mask = new Uint8Array(4)
crypto.getRandomValues(mask)

Deno.bench("wasm", { group, baseline: true }, () => {
  xor_mod(bytes, mask)
})

Deno.bench("js", { group }, () => {
  for (let i = 0; i < bytes.length; ++i)
    bytes[i] = bytes[i] ^ mask[i % mask.length]
})