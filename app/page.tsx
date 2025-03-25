"use client"
// import Head from "next/head";
import { redirect } from "next/navigation";
import { useEffect } from "react";
// export const metadata = {
//   title: 'Home | Cineflow',
// };

export default function LandingPageRedirect() {
  useEffect(()=>{
    document.title = 'Cineflow';
    redirect("auth/login")
  })


  return(
    <> 
    {/* <Head>
    <title>My Custom Page Title</title>
  </Head> */}
  </>
  )

}
