import { signIn, signOut } from "next-auth/react";

export function signInWithGithub() {
  signIn("github")
    .then((response) => {
      console.log("GitHub Sign In Response", response);
    })
    .catch((error) => {
      console.error("GitHub Sign In Error", error);
    });
}

export function signOutFromGithub() {
  signOut({ callbackUrl: "/" });
}
