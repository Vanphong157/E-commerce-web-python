import DashboardLayout from "@/app/layout/index";
import OrderComponents from "@/app/modules/order";
import PersonalPage from "@/app/modules/personal";

export default function OrderPage() {
  return (
    <DashboardLayout>
      <PersonalPage />
    </DashboardLayout>
  );
}
