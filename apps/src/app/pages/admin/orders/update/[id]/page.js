import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import {
  Grid,
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  CardContent,
  styled
} from '@mui/material'
import Swal from 'sweetalert2'

const BASE_URL = 'http://127.0.0.1:8080/api'

const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

const UpdateOrder = () => {
  const [order, setOrder] = useState(null)
  const [orderStatus, setOrderStatus] = useState('')
  const router = useRouter()

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`${BASE_URL}/order/${router.query.id}`)
        if (!response.ok) throw new Error('Failed to fetch order')
        const data = await response.json()
        setOrder(data)
        setOrderStatus(data.orderStatus)
      } catch (error) {
        console.error('Error fetching order:', error)
      }
    }

    if (router.query.id) {
      fetchOrder()
    }
  }, [router.query.id])

  const handleStatusChange = event => {
    setOrderStatus(event.target.value)
  }

  const handleUpdate = async () => {
    const token = localStorage.getItem("token")
    try {
      const response = await fetch(`${BASE_URL}/order/${router.query.id}`, {
        method: 'PATCH',
        headers: {
          Authorization:`Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderStatus) // Sử dụng đúng tên trường
      })
      if (response.ok){
        Swal.fire('Đã cập nhật', '', 'success')
        router.back() 
      }
      
    } catch (error) {
      console.error('Error updating order status:', error)
      alert('Failed to update order status')
    }
  }

  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth>
              <InputLabel id='order-status-select-label'>Trạng thái đơn hàng</InputLabel>
              <Select
                labelId='order-status-select-label'
                id='order-status-select'
                value={orderStatus}
                onChange={handleStatusChange}
                input={<OutlinedInput label='Trạng thái đơn hàng' />}
              >
                <MenuItem value='Chưa cập nhật'>Chưa cập nhật</MenuItem>
                <MenuItem value='Đang giao'>Đang giao</MenuItem>
                <MenuItem value='Đã giao'>Đã giao</MenuItem>
                <MenuItem value='Đã hủy'>Đã hủy</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button variant='contained' sx={{ marginRight: 3.5 }} onClick={handleUpdate}>
              Cập nhật
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default UpdateOrder
