import Login from "@/components/auth/login";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex w-full min-h-screen flex-col items-center justify-center space-y-5
    bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-sky-800
    ">
      <div className="text-center">
        <h1 className="text-6xl font-semibold text-white drop-shadow-md">
          Auth
        </h1>
        <p className="text-white text-lg">A simple authentication service</p>
      </div>

      <div>
        <Login mode="modal" asChild>
          <Button variant={"secondary"} size={"lg"}>Sign in</Button>
        </Login>
      </div>
    </main>
  );
}
