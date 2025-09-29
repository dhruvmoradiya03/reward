import { useUI } from "@contexts/ui.context";
// import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
// import http from "@framework/utils/http";
import Cookies from "js-cookie";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

export interface LoginInputType {
  email: string;
  password: string;
  remember_me: boolean;
}
async function login(input: LoginInputType) {
  // return http.post(API_ENDPOINTS.LOGIN, input);
  return {
    token: `${input.email}.${input.remember_me}`.split("").reverse().join(""),
  };
}

export const useLoginMutation = () => {
  const { authorize, closeModal } = useUI();
  const router = useRouter();

  return useMutation({
    mutationFn: (input: LoginInputType) => login(input),
    onSuccess: (data) => {
      Cookies.set("auth_token", data.token);
      authorize();
      closeModal();

      // Redirect to home page after successful login
      router.push("/");
    },
    onError: (data) => {
      console.log(data, "login error response");
    },
  });
};
