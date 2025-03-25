"use client";
import "../styles/globals.css";
import { Provider } from "react-redux";
import { store } from "../redux/store";
// import { CSSProperties } from "react";
// import { useRouter } from "next/navigation";
// import useAuth from "@/hooks/useAuth";
import Navbar from "../components/Navbar";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAuthRoute = pathname.startsWith("/auth");


  // const router = useRouter();
  // const { authenticated, loading } = useAuth();

  // If the page is loading and user is authenticated, show the spinner.
  // Once loading is complete and if the user is not authenticated, redirect to login page.
  // if (loading) {
  //   return (
  //     <div className="spinner-container">
  //       <DotLoader
  //         loading={loading}
  //         cssOverride={override}
  //         size={150}
  //         aria-label="Loading Spinner"
  //         data-testid="loader"
  //         color="#e50914"
  //       />
  //     </div>
  //   );
  // }

  // Only redirect after the loading is complete and if the user is not authenticated
  // if (!authenticated) {
  //   router.push("/auth/login");
  //   return null;  // Prevent the children from rendering while redirecting
  // }

  return (
    <>
      <html lang="en">
        <body>
          {!isAuthRoute && <Navbar />}
          <Provider store={store}>{children}</Provider>
        </body>
      </html>
    </>
  );
}
