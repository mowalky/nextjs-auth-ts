import { useState, useRef } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

function AuthForm() {
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const passwordInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  async function submitHandler(
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      email: emailInputRef?.current?.value,
      password: passwordInputRef?.current?.value,
    });
    console.log(result);

    if (!result?.error) {
      router.replace("/protected");
    } else {
      alert("Error: " + result?.error);
    }
  }

  return (
    <section>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" ref={emailInputRef} required />
        </div>
        <div>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            ref={passwordInputRef}
            required
          />
        </div>
        <div>
          <button>Login</button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
