"use client";
import { Layout } from "antd";
import Header from "./header";
import FooterState from "./footer";

export default function DashboardLayout({ children }) {
  return (
    <Layout>
      <Header />
      <div style={{ margin: "10px auto", width: "1200px" }}>{children}</div>
      <FooterState />
    </Layout>
  );
}
