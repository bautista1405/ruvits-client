import React from "react";
import { signIn, signOut, useSession, getSession } from "next-auth/client";

import Dashboard from "../../components/Dashboard";

function DashboardPage() {
  return (
    <div>
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