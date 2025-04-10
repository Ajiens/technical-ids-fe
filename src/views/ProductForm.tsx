'use client'

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import ProductInterface from "@/interfaces/ProductInterface"
import productService from "@/services/productService"
import { useNavigate } from "react-router-dom"


export default function ProductForm() {
  const navigate = useNavigate();

  const [product, setProduct] = useState<ProductInterface>({
    id: 0,
    productID: "",
    productName: "",
    amount: 0,
    customerName: "",
    status: "",
    transactionDate: new Date(),
    createBy: "",
    createOn: new Date(),
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProduct(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const {request} = productService.addProduct(product);

      const res = (await request).data;

      if (res.status === 200) {
        toast("Success Add Product",{
          icon: "✅",
          description: "Product has been added successfully.",
        })
        navigate(`/`)
      } else {
        const err = res.message
        toast("Error: There is an error occure",{
          icon: "❌",
          description: err,
        })
      }
    } catch (err) {
      toast("Error: There is an error occure",{
        icon: "❌",
        description: "Cannot add product. Please try again.",
      })
    }
  }

  return (
    <Card className="max-w-xl mx-auto mt-6">
      <CardHeader>
        <CardTitle>Tambah Produk</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">

          <div className="flex justify-between gap-4"> 
            <div className="grid grid-cols-1 gap-4 w-full">
              <Label htmlFor="productID">Product ID</Label>
              <Input
                id="productID"
                name="productID"
                value={product.productID}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-4 w-full">
              <Label htmlFor="productName">Product Name</Label>
              <Input
                id="productName"
                name="productName"
                value={product.productName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              name="amount"
              type="number"
              value={product.amount}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4">
            <Label htmlFor="customerName">Customer Name</Label>
            <Input
              id="customerName"
              name="customerName"
              value={product.customerName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4">
            <Label htmlFor="status">Status</Label>
            <Select
              value={product.status}
              onValueChange={(value) => setProduct(prev => ({ ...prev, status: value }))}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">SUCCESS</SelectItem>
                <SelectItem value="2">PENDING</SelectItem>
                <SelectItem value="3">FAILED</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            <Label>Transaction Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  {product.transactionDate.toLocaleDateString()}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={product.transactionDate}
                  onSelect={(date) =>
                    setProduct((prev) => ({ ...prev, transactionDate: date ?? prev.transactionDate }))
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            <Label htmlFor="createBy">Create By</Label>
            <Input
              id="createBy"
              name="createBy"
              value={product.createBy}
              onChange={handleChange}
              required
            />
          </div>

          

          <Button type="submit" variant={'link'} className="w-full">
            Simpan Produk
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
