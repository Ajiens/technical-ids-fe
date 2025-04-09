import { ColumnDef } from "@tanstack/react-table"
import ProductInterface from "@/interfaces/ProductInterface"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { File, MoreHorizontal } from "lucide-react"

export const columns: ColumnDef<ProductInterface>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "customerName",
    header: "Customer",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "transactionDate",
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("transactionDate"))
      return <span>{date.toLocaleDateString()}</span>
    },
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => {
      const product = row.original
      return (
        <Button variant="outline" onClick={() => console.log("Detail:", product)}>
          <div className="mx-2 gap-2 flex items-center">
            <File className="h-4 w-4" />
            <span>Detail</span>
          </div>
        </Button>
      )
    },
  },
]
