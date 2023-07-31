import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  stages: [
    { duration: "3s", target: 20 },
    { duration: "3s", target: 10 },
    { duration: "5s", target: 0 },
  ],
  thresholds: {
    http_req_duration: ["p(99)>1500"],
  },
};

export default function () {
  const res = http.get("https://TokoOnline.com/");
  check(res, { "status was 200": (r) => r.status == 200 });
  sleep(1);
}
