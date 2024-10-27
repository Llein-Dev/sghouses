"use client"

import { useState } from "react"
import { Search, FileText, Eye, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

export default function ContractContent() {
  const [contracts, setContracts] = useState([
    { id: 1, tenant: "David Wilson", room: "A101", startDate: "2023-06-01", endDate: "2024-05-31", status: "Active" },
    { id: 2, tenant: "Emma Thompson", room: "B205", startDate: "2023-07-01", endDate: "2024-06-30", status: "Pending" },
    { id: 3, tenant: "Frank Miller", room: "C310", startDate: "2023-05-01", endDate: "2024-04-30", status: "Expired" },
  ])

  const [searchTerm, setSearchTerm] = useState("")

  const filteredContracts = contracts.filter(contract =>
    contract.tenant.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contract.room.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusColor = (status) => {
    switch (status) {
      case "Active": return "bg-green-500"
      case "Pending": return "bg-yellow-500"
      case "Expired": return "bg-red-500"
      default: return "bg-gray-500"
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Search className="h-5 w-5 text-gray-500" />
          <Input
            placeholder="Search contracts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <Button variant="blue">
          <FileText className="mr-2 h-4 w-4" />
          New Contract
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tenant</TableHead>
            <TableHead>Room</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredContracts.map((contract) => (
            <TableRow key={contract.id}>
              <TableCell>{contract.tenant}</TableCell>
              <TableCell>{contract.room}</TableCell>
              <TableCell>{contract.startDate}</TableCell>
              <TableCell>{contract.endDate}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(contract.status)}>{contract.status}</Badge>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Contract Details</DialogTitle>
                        <DialogDescription>
                          Contract for {contract.tenant} - Room {contract.room}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <p><strong>Tenant:</strong> {contract.tenant}</p>
                        <p><strong>Room:</strong> {contract.room}</p>
                        <p><strong>Start Date:</strong> {contract.startDate}</p>
                        <p><strong>End Date:</strong> {contract.endDate}</p>
                        <p><strong>Status:</strong> {contract.status}</p>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button variant="outline" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}