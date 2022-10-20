import callToBackend from "../lib/connect/conn";

export const postFactoryPatch = async (auth, payload) => {
  const url = "/factory/audio/patch";
  const method = "POST";
  let timer = 5;

  const delay = (time) => {
    return new Promise((resolve) => {
      setTimeout(async () => {
        const response = await callToBackend(url, method, auth, payload);
        if (!response.files.mid) {
          if (timer < 120) {
            timer = timer + 15;
            const response = delay(3000);
          } else {
            resolve(null);
          }
        } else {
          resolve(response);
        }
      }, time);
    });
  };

  const responseDelay = async () => {
    const responsee = await callToBackend(url, method, auth, payload);
    if (responsee.files.mid) {
      return responsee;
    } else {
      return await delay(3000);
    }
  };
  return await responseDelay();
};

export const updateFactoryPatch = (auth, payload) => {
  const url = "/factory/audio/patch";
  const method = "PATCH";
  const response = callToBackend(url, method, auth, payload);

  return response;
}

