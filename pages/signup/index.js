import Link from "next/link";
import Layout from "../../interface/components/layout";
import ErrorMessage from "../../interface/components/ErrorMessage";
import LoadingSpin from "../../interface/components/LoadingSpin";
import { useRef, useState } from "react";
import { useRouter } from "next/router";

export default function SignUp() {
  const router = useRouter();

  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  function clearErrors() {
    setError(null);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);
    setError(null);

    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      });

      const responseBody = await response.json();

      if (response.status === 201) {
        router.push("/");
        return;
      }

      if (response.status === 400) {
        setError(responseBody);
        setIsLoading(false);
        return;
      }
    } catch (error) {
      setError("It is not possible to create a user, please try again.");
      console.error("Error while creating user.", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Layout>
      <section className="flex flex-col items-center justify-center mt-16 mx-auto">
        {error ? <ErrorMessage message={error.message} /> : null}
        <div className="w-full max-w-lg bg-gray-900 border-gray-700 rounded-lg">
          <div className="py-8 px-6">
            <div className="my-4">
              <h1 className="te wxt-slate-50 font-semibold text-2xl">
                Sign up
              </h1>
            </div>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="username"
                  className="block text-slate-50 text-sm mb-2"
                >
                  Username
                </label>
                <input
                  ref={usernameRef}
                  id="username"
                  name="username"
                  type="text"
                  onChange={clearErrors}
                  required
                  autoComplete="off"
                  className="w-full bg-gray-700 rounded-lg p-2.5 block border border-gray-600 text-slate-200"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-slate-50 mb-2 text-sm"
                >
                  Your email
                </label>
                <input
                  ref={emailRef}
                  type="email"
                  id="email"
                  name="email"
                  onChange={clearErrors}
                  className="w-full bg-gray-700 rounded-lg p-2.5 block border border-gray-600 text-slate-200"
                  placeholder="name@email.com"
                  required
                  autoComplete="on"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-slate-50 mb-2 text-sm"
                >
                  Password
                </label>
                <input
                  ref={passwordRef}
                  type="password"
                  id="password"
                  name="password"
                  onChange={clearErrors}
                  className="w-full bg-gray-700 rounded-lg p-2.5 block border border-gray-600 text-slate-200"
                  placeholder="••••••••"
                  required
                  autoComplete="on"
                />
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 rounded border border-gray-600 accent-blue cursor-pointer bg-gray-700"
                    required
                  />
                  <label
                    htmlFor="terms"
                    className="ml-2 text-sm font-medium text-slate-50"
                  >
                    I agree with the{" "}
                    <Link className="text-blue-500 font-semibold" href="#">
                      terms and conditions
                    </Link>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full my-4 rounded-lg p-2.5 bg-blue-700 text-base font-medium text-slate-50"
              >
                {isLoading ? <LoadingSpin /> : "Register new account"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}
