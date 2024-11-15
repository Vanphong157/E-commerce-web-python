import DashboardLayout from '@/app/layout/index'
import ProductPage from '@/app/modules/product'

const index = () => {
  return (
    <DashboardLayout>
      <ProductPage/>
    </DashboardLayout>
  )
}

export default index