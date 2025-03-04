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

export async function GetUserProgress(userId) {
  var requestOptions = {
    method: "GET",
  };
  return new Promise((resolve, reject) => {
    fetch(
      `http://localhost:3300/user/getProgress?userId=${userId}`,
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
      `http://localhost:3300/quiz/getImages?kapottTipus=${kapottTipus}`,
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

export async function SetProgress(userId, progress) {
  let curentProgress = await GetUserProgress(userId);
 var requestOptions = {
   method: "PUT",
 };
 return new Promise((resolve, reject) => {
   fetch(
     `http://localhost:3300/user/setProgress?userId=${userId}&progress=${curentProgress+progress}`,
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

export async function GetUserLevel(userId) {
  var requestOptions = {
   method: "GET",
 };
 return new Promise((resolve, reject) => {
   fetch(
     `http://localhost:3300/user/getUserLevel?userId=${userId}`,
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

export async function UpdateUserLevel(userId, level) {
  let newLevel = "";
  if(level=="beginner"){
    newLevel = "intermediate";
  }else if(level=="intermediate"){
    newLevel = "polyglot_master";
  }else if(level=="polyglot_master"){
    newLevel = "beginner";
  }
  else{
    alert("Valami hiba történt a szintlépés közben");
    return;
  }
  var requestOptions = {
    method: "PUT",
  };
  return new Promise((resolve, reject) => {
    fetch(
      `http://localhost:3300/user/setUserLevel?userId=${userId}&level=${newLevel}`,
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

