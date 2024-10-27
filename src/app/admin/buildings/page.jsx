"use client"

import { useState } from "react"
import { Search, PlusCircle, Pencil, Trash2 } from "lucide-react"
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

export default function BuildingContent() {
  const [Buildings, setBuildings] = useState([
    { id: 1, number: "A101", type: "Single", price: 500, status: "Available" },
    { id: 2, number: "B205", type: "Double", price: 750, status: "Occupied" },
    { id: 3, number: "C310", type: "Suite", price: 1000, status: "Maintenance" },
  ])

  const [newBuilding, setNewBuilding] = useState({ number: "", type: "", price: "", status: "Available" })
  const [searchTerm, setSearchTerm] = useState("")

  const handleAddBuilding = () => {
    setBuildings([...Buildings, { id: Buildings.length + 1, ...newBuilding }])
    setNewBuilding({ number: "", type: "", price: "", status: "Available" })
  }

  const filteredBuildings = Buildings.filter(Building =>
    Building.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    Building.type.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusColor = (status) => {
    switch (status) {
      case "Available": return "bg-green-500"
      case "Occupied": return "bg-blue-500"
      case "Maintenance": return "bg-yellow-500"
      default: return "bg-gray-500"
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Search className="h-5 w-5 text-gray-500" />
          <Input
            placeholder="Search Buildings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Building
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Building</DialogTitle>
              <DialogDescription>
                Create a new Building in the system.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="number" className="text-right">
                  Building Number
                </Label>
                <Input
                  id="number"
                  value={newBuilding.number}
                  onChange={(e) => setNewBuilding({ ...newBuilding, number: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Type
                </Label>
                <Input
                  id="type"
                  value={newBuilding.type}
                  onChange={(e) => setNewBuilding({ ...newBuilding, type: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Price
                </Label>
                <Input
                  id="price"
                  type="number"
                  value={newBuilding.price}
                  onChange={(e) => setNewBuilding({ ...newBuilding, price: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddBuilding}>Add Building</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Building Number</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="">
          {filteredBuildings.map((Building) => (
            <TableRow key={Building.id}>
              <TableCell>{Building.number}</TableCell>
              <TableCell>{Building.type}</TableCell>
              <TableCell>${Building.price}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(Building.status)}>{Building.status}</Badge>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Trash2 className="h-4 w-4" />
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