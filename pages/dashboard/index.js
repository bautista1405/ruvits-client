import React from "react";
import { signIn, signOut, useSession, getSession } from "next-auth/client";

import Dashboard from "../../components/Dashboard";
import Head from "next/head";

function DashboardPage() {
  return (
    <div>
      <Head>
        <title>Dashboard</title>
      </Head> 
      <Dashboard />
    </div>
  );
}

export async function getServerSideProps(ctx) {
  return {
    props: {
      session: await getSession(ctx)
    }
  }
}

export default DashboardPage;