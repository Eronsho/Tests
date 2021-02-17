export default (type) => {
  return new Promise((success, fail) => {
    const miniDataSet =
      "http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}";
    const bigDataSet =
      "http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}";
    let url = "";

    if (type === "min") {
      url = miniDataSet;
    } else if (type === "big") {
      url = bigDataSet;
    }

    const request = new XMLHttpRequest();
    request.open("GET", url, true);

    request.addEventListener("load", () => {
      request.status >= 200 && request.status < 400
        ? success(request.responseText)
        : fail(new Error(`Request Failed: ${request.statusText}`));
    });

    request.addEventListener("error", () => {
      fail(new Error("Network Error"));
    });

    request.send();
  });
};
