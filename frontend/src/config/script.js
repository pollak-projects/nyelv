import { router } from '../config/routes';

export function Logout() {
    fetch(`http://localhost:3300/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          router.push("/");
        } else {
          console.error("Sikertelen kijelentkezés");
        }
      })
      .catch((error) => console.error("Hiba kijelentkezés közben:", error));
}

export async function GetCurrentTask(taskNumber) {
  var requestOptions = {
    method: "GET",
  };
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:3300/quiz/getAllTask?kerdesSzama=${taskNumber}`, requestOptions)
      .then(async (result) => {
        const res = await result.text();
        const valasz = JSON.parse(res);
        resolve(valasz);
      })
      .catch((error) => console.log("error", error));
  });
}