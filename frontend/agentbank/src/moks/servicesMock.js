import axios from "./axiosMock";

export async function getMokedFeatures() {
  const response = await getMockedData("features");
  return response;
}

export async function getMokedAccounts() {
  const response = await getMockedData("accounts");
  return response;
}
export async function getMockedData(endPoint) {
  try {
    const response = await axios.get();
    const responseStatus = response.status;
    const responseMessage = response.statusText;
    if (response.data) {
      let data = [];
      if (endPoint === "features") {
        data = response.data.features;
      } else if (endPoint === "accounts") {
        data = response.data.accounts;
      } else {
        data = response.data;
      }
      return { responseStatus, responseMessage, data };
    }
  } catch (err) {
    const responseStatus = err.response.status;
    const responseMessage = err.response.statusText;
    return { responseStatus, responseMessage };
  }
}

export default getMockedData;
