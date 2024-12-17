import DashboardLayout from "@/app/layout/index";
import OrderDetailComponent from "@/app/modules/order/detail";

export default function OrderDetail({ params }) {
  return (
    <DashboardLayout>
      <OrderDetailComponent orderId={params.id} />
    </DashboardLayout>
  );
} 