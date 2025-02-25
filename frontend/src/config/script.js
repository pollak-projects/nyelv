import { router } from "../config/routes";

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

export async function GetCurrentTask(taskId) {
  var requestOptions = {
    method: "GET",
  };
  return new Promise((resolve, reject) => {
    fetch(
      `http://localhost:3300/quiz/getAllTask?kapottTipus=${taskId}`,
      requestOptions
    )
      .then(async (result) => {
        const res = await result.text();
        const valasz = JSON.parse(res);
        resolve(valasz);
      })
      .catch((error) => console.log("error", error));
  });
}

export async function GetUserProgress(username) {
  var requestOptions = {
    method: "GET",
  };
  return new Promise((resolve, reject) => {
    fetch(
      `http://localhost:3300/self/getCurrentProgress?username=${username}`,
      requestOptions
    )
      .then(async (result) => {
        const res = await result.text();
        const valasz = JSON.parse(res);
        resolve(valasz);
      })
      .catch((error) => console.log("error", error));
  });
}

export async function GetCurrentTaskPair(taskId) {
  var requestOptions = {
    method: "GET",
  };
  return new Promise((resolve, reject) => {
    fetch(
      `http://localhost:3300/quiz/getAllPair?kapottTipus=${taskId}`,
      requestOptions
    )
      .then(async (result) => {
        const res = await result.text();
        const valasz = JSON.parse(res);
        resolve(valasz);
      })
      .catch((error) => console.log("error", error));
  });
}

export async function FileUpload(file) {
  console.log(file);
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:3300/quiz/postImages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        file: file,
      }),
    })
      .then((response) => {
        if (response.ok) {
          alert("Sikeres feltöltés");
          resolve(response);
        } else {
          alert("Sikertelen feltöltés");
        }
      })
      .catch((error) => console.error("Hiba kijelentkezés közben:", error));
  });
}

export async function GetTaskThree(kapottTipus) {
  var requestOptions = {
    method: "GET",
  };
  return new Promise((resolve, reject) => {
    fetch(
      `http://localhost:3300/quiz/getImages?kapottTipus=beginner`,
      requestOptions
    )
      .then(async (result) => {
        const res = await result.text();
        const valasz = JSON.parse(res);
        resolve(valasz);
      })
      .catch((error) => console.log("error", error));
  });
}

export async function SetProgress(username, progress) {
  let curentProgress = await GetUserProgress(username);
 var requestOptions = {
   method: "PUT",
 };
 return new Promise((resolve, reject) => {
   fetch(
     `http://localhost:3300/user/setProgress?username=${username}&progress=${curentProgress+progress}`,
     requestOptions
   )
     .then(async (result) => {
       const res = await result.text();
       const valasz = JSON.parse(res);
       resolve(valasz);
     })
     .catch((error) => console.log("error", error));
 });

}

export async function GetUserLevel(username) {
  var requestOptions = {
   method: "GET",
 };
 return new Promise((resolve, reject) => {
   fetch(
     `http://localhost:3300/user/getUserLevel?username=${username}`,
     requestOptions
   )
     .then(async (result) => {
       const res = await result.text();
       const valasz = JSON.parse(res);
       resolve(valasz);
     })
     .catch((error) => console.log("error", error));
 });

}

export async function GetDailyWord() {
  var requestOptions = {
    method: "GET",
  };
  return new Promise((resolve, reject) => {
    fetch(
      `http://localhost:3300/quiz/getDailyWord`,
      requestOptions
    )
      .then(async (result) => {
        const res = await result.text();
        const valasz = JSON.parse(res);
        resolve(valasz);
      })
      .catch((error) => console.log("error", error));
  });
 
}

export async function GetCurrentTaskListening(taskId) {
  var requestOptions = {
    method: "GET",
  };
  return new Promise((resolve, reject) => {
    fetch(
      `http://localhost:3300/quiz/getAllListening?kapottTipus=${taskId}`,
      requestOptions
    )
      .then(async (result) => {
        const res = await result.text();
        const valasz = JSON.parse(res);
        resolve(valasz);
      })
      .catch((error) => console.log("error", error));
  });
}

export async function UpdateUserLevel(username, level) {
  let newLevel = "";
  if(level=="beginner"){
    newLevel = "intermediate";
  }else if(level=="intermediate"){
    newLevel = "polyglot_master";
  }else{
    alert("Valami hiba történt a szintlépés közben");
    return;
  }
  var requestOptions = {
    method: "PUT",
  };
  return new Promise((resolve, reject) => {
    fetch(
      `http://localhost:3300/user/setUserLevel?username=${username}&level=${newLevel}`,
      requestOptions
    )
      .then(async (result) => {
        const res = await result.text();
        const valasz = JSON.parse(res);
        resolve(valasz);
      })
      .catch((error) => console.log("error", error));
  });

}

