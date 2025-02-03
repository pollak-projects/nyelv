// Function to get a specific cookie value
export function getCookie(access_token) {
  let cookieArr = document.cookie.split(";");

  // Loop through all cookies and find the one we need
  for (let i = 0; i < cookieArr.length; i++) {
    let cookie = cookieArr[i].trim();
    if (cookie.indexOf(access_token + "=") === 0) {
      return cookie.substring(access_token.length + 1);
    }
  }
  return "";
}
export function parseJwt(token) {
  if (!token || token === "" || token === "undefined") {
    // WHY JS WHY
    return null;
  }

  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}