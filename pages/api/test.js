import { setup } from "../../lib/api/site";
export default async function (req, res) {
  await setup();
  return res.send("hello world");
}
