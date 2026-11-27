import { request } from "./request";

export function loginAdmin(data) {
  return request("/api/auth/login", {
    method: "POST",
    body: data,
  });
}

export function logoutAdmin() {
  return request("/api/auth/logout", {
    method: "POST",
  });
}