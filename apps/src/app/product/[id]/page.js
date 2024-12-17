import DashboardLayout from "@/app/layout/index";
import ProductDetailComponent from "@/app/modules/product/detail";

export default function ProductDetail({ params }) {
  return (
    <DashboardLayout>
      <ProductDetailComponent productId={params.id} />
    </DashboardLayout>
  );
} 