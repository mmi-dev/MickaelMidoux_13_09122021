import dataMocked from "../data/dataMocked.json";

export async function getFeatures() {
  const data = dataMocked.features;
  return data;
}
export async function getAccounts() {
  const data = dataMocked.accounts;
  return data;
}
